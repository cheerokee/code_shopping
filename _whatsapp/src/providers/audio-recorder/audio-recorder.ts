import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Media, MediaObject} from "@ionic-native/media";
import { File } from "@ionic-native/file";
import {AlertController, Platform} from "ionic-angular";
import {StoragePermissionProvider} from "../storage-permission/storage-permission";
import {Diagnostic} from "@ionic-native/diagnostic";

const CAN_ACCESS_MICROPHONE = 'can_access_microphone';

export interface AudioPlatformConfig{
  basePath: string;
  name: string;
  mimeType: string;
  fullPath: string;
}

@Injectable()
export class AudioRecorderProvider {
  private recorder: MediaObject;
  private audioPlatformConfig: AudioPlatformConfig;

  constructor(public media: Media,
              private file: File,
              public platform: Platform,
              private storagePermission: StoragePermissionProvider,
              private diagnostic: Diagnostic,
              private alertCtrl: AlertController) {

  }

  async requestPermission(): Promise<boolean>{
    if(!this.storagePermission.canWriteInStorage){
      await this.storagePermission.requestPermission();
    }

    if(!this.canAccessMicrophone){
      await this.platform.ready();
      const resultMicrophoneAuth = await this.diagnostic.requestMicrophoneAuthorization();
      this.canAccessMicrophone = resultMicrophoneAuth === 'GRANTED';
    }

    return this.storagePermission.canWriteInStorage && this.canAccessMicrophone;
  };

  get hasPermission() {
    return this.storagePermission.canWriteInStorage && this.canAccessMicrophone;
  }

  private get canAccessMicrophone(): boolean {
    const canAccessMicrophone = window.localStorage.getItem(CAN_ACCESS_MICROPHONE);
    return canAccessMicrophone === 'true';
  };

  private set canAccessMicrophone(value) {
    window.localStorage.setItem(CAN_ACCESS_MICROPHONE,value? 'true' : 'false');
  };

  startRecord() {
    const platform = this.platform.is('android')? 'android' : 'ios';
    this.audioPlatformConfig = this.getAudioPlatformConfig(platform);
    const fullPath = this.audioPlatformConfig.fullPath.replace(/^file:\/\//,'');
    this.recorder = this.media.create(fullPath);
    this.recorder.startRecord();
  }

  stopRecord(): Promise<Blob>{
    return new Promise((resolve,reject) => {
      this.recorder.onError.subscribe((error) => console.log(error));
      this.recorder.stopRecord();
      const mimeType = this.audioPlatformConfig.mimeType;
      this.file.readAsArrayBuffer(this.audioPlatformConfig.basePath,this.audioPlatformConfig.name)
          .then(result => {
            const blob = new Blob([new Uint8Array(result)],{type: mimeType});//mimetype identificação do tipo do arquivo audio/wav
            resolve(blob);
          }, error => reject(error));
    });
  }

  private getAudioPlatformConfig(platform: 'android' | 'ios'): AudioPlatformConfig{
    const android: AudioPlatformConfig = {
      basePath: this.file.externalDataDirectory,
        name: 'recording.aac',
        mimeType: 'audio/x-hx-aac-adts',
        get fullPath(){
          return `${this.basePath}${this.name}`
        }
    };

    const ios: AudioPlatformConfig = {
        basePath: this.file.externalDataDirectory,
        name: 'recording.wav',
        mimeType: 'audio/wav',
        get fullPath(){
            return `${this.basePath}${this.name}`
        }
    };

    return platform == 'android' ? android : ios;
  }

  showAlertToCloseApp() {
    const alert = this.alertCtrl.create({
      title: "Aviso",
      message: "Permissões concedidas. É necessário reabrir o app para continuar. Deseja fazer isso agora?",
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.startRecord();
            this.stopRecord().then(() => {
              this.platform.exitApp();
            });
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.startRecord();
            this.stopRecord();
          }
        }
      ]
    });
    alert.present();
  }
}
