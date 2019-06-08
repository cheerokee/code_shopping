import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute }     from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ChatGroupUserHttpService } from "../../../../services/http/chat-group-user-http.service";
import { ChatGroup,User } from "../../../../model";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupUserDeleteModalComponent} from "../chat-group-user-delete-modal/chat-group-user-delete-modal.component";

@Component({
    selector: 'app-chat-group-user-list',
    templateUrl: './chat-group-user-list.component.html',
    styleUrls: ['./chat-group-user-list.component.css']
})
export class ChatGroupUserListComponent implements OnInit {

    chatGroupId: number;
    chatGroup: ChatGroup;
    users: Array<User> = [];
    userIdToDelete;
    pagination = {
      page: 1,
      totalItems: 0,
      itemsPerPage: 10
    };
    errors = [];

    @ViewChild(ChatGroupUserDeleteModalComponent)
    chatGroupUserDeleteModal: ChatGroupUserDeleteModalComponent;

    constructor( private route: ActivatedRoute,
                 private chatGroupUserHttp: ChatGroupUserHttpService,
                 private notifyMessage: NotifyMessageService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.chatGroupId = params.chat_group;
            this.getUsers();
        });
    }

    getUsers() {
        this.chatGroupUserHttp.list(this.chatGroupId,{page: this.pagination.page})
            .subscribe(response => {
              this.chatGroup = response.data.chat_group;
              this.users = response.data.users;
              this.pagination.totalItems = response.meta.total;
              this.pagination.itemsPerPage = response.meta.per_page;
            });
    }

    pageChanged(page){
      this.pagination.page = page;
      this.getUsers();
    }

    openModalDelete(userId){
        this.userIdToDelete = userId;
        this.chatGroupUserDeleteModal.showModal();
    }

    onInsertSuccess($event){
      this.getUsers();
        this.errors = [];
    }

    onInsertError($event){
        this.notifyMessage.error('Houve um erro ao inserir os usuários, certifique-se de que eles já não estejam incluídos no grupo')
    }
}
