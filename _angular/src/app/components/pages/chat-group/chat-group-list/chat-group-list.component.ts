import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ChatGroupNewModalComponent } from "../chat-group-new-modal/chat-group-new-modal.component";
import { ChatGroupEditModalComponent } from "../chat-group-edit-modal/chat-group-edit-modal.component";
import { ChatGroupDeleteModalComponent } from "../chat-group-delete-modal/chat-group-delete-modal.component";
import { ChatGroupHttpService } from "../../../../services/http/chat-group-http.service";
import { ChatGroup } from "../../../../model";
import { ChatGroupInsertService } from "./chat-group-insert.service";
import { ChatGroupEditService } from "./chat-group-edit.service";
import { ChatGroupDeleteService } from "./chat-group-delete.service";

declare let $;

@Component({
    selector: 'chat-group-list',
    templateUrl: './chat-group-list.component.html',
    styleUrls: ['./chat-group-list.component.css']
})
export class ChatGroupListComponent implements OnInit {

    // @ts-ignore
    chatGroups: Array<ChatGroup> = [];

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 5
    };

    sortCollumn = { column: 'created_at', sort: 'desc' };

    @ViewChild(ChatGroupNewModalComponent)
    chatGroupNewModal: ChatGroupNewModalComponent;

    @ViewChild(ChatGroupEditModalComponent)
    chatGroupEditModal: ChatGroupEditModalComponent;

    @ViewChild(ChatGroupDeleteModalComponent)
    chatGroupDeleteModal: ChatGroupDeleteModalComponent;

    chatGroupId: number;
    searchText: string;
    constructor(private chatGroupHttp: ChatGroupHttpService,
                protected chatGroupInsertService: ChatGroupInsertService,
                protected chatGroupEditService: ChatGroupEditService,
                protected chatGroupDeleteService: ChatGroupDeleteService) {

        this.chatGroupInsertService.chatGroupListComponent = this;
        this.chatGroupEditService.chatGroupListComponent = this;
        this.chatGroupDeleteService.chatGroupListComponent = this;
    }

    ngOnInit() {
        this.getChatGroups();
    }

    getChatGroups() {
        this.chatGroupHttp.list({
            page: this.pagination.page,
            sort: this.sortCollumn.column === '' ? null : this.sortCollumn,
            search: this.searchText
        }).subscribe(response => {
            this.chatGroups = response.data;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
    }

    pageChanged(page){
        this.pagination.page = page;
        this.getChatGroups();
    }

    sort(sortColumn){
        this.getChatGroups();
    }

    search(search) {
        this.searchText = search;
        this.getChatGroups();
    }
}
