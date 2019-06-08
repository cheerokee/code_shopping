import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupListComponent} from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupDeleteService {

    private _chatGroupListComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService) {

    }

    set chatGroupListComponent(value: ChatGroupListComponent){
        this._chatGroupListComponent = value;
    }

    showModalDelete(chatGroupId: number) {
        this._chatGroupListComponent.chatGroupId = chatGroupId;
        this._chatGroupListComponent.chatGroupDeleteModal.showModal();
    }


    onDeleteSuccess($event: any) {
        this.notifyMessage.success(`Grupo excluído com sucesso.`);
        this._chatGroupListComponent.getChatGroups();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível excluir o grupo.`);
    }
}
