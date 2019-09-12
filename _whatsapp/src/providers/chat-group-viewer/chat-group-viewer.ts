import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ChatGroup} from "../../app/model";
import {Observable} from "rxjs";
import {IsCurrentUserPipe} from "../../pipes/is-current-user/is-current-user";

const CHAT_GROUPS_VIEWED_KEY = 'chat_groups_viewd';

@Injectable()
export class ChatGroupViewerProvider {

  constructor(public isCurrentUser: IsCurrentUserPipe) {

  }

  viewed(group: ChatGroup){
      group.viewed = true;
      this.setChatGroup(group);
  }

  unViewed(group: ChatGroup){
      group.viewed = false;
      this.setChatGroup(group);
  }

  loadViewed(group: ChatGroup){
    this.hasViewed(group).subscribe((hasViewed) => {
      group.viewed = hasViewed;
      this.setChatGroup(group);
    });
  }

  private hasViewed(group: ChatGroup): Observable<boolean> { //Foi visto
    return Observable.create(observer => {
      let collection = this.collection;

      if(collection.hasOwnProperty(group.id) && collection[group.id].viewed === true){
          group.last_message.subscribe(message => {
              collection = this.collection;
              const hasViewed = this.isCurrentUser.transform(message.user_id) ||
                  group.updated_at === collection[group.id].updated_at;
              observer.next(hasViewed);
          });

        return;
      }

      observer.next(false);
    });
  }

  private setChatGroup(group: ChatGroup){
    const collection = this.collection;
    collection[group.id] = {viewed: group.viewed, updated_at: group.updated_at };
    this.collection = collection;
  }

  private get collection(){
    const collection = window.localStorage.getItem(CHAT_GROUPS_VIEWED_KEY);
    return collection ? JSON.parse(collection) : {};
  }

  private set collection(value){
    window.localStorage.setItem(CHAT_GROUPS_VIEWED_KEY, JSON.stringify(value));
  }
}
