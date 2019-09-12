import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {environment} from "@app/env";

@Injectable()
export class ChatMessageHttpProvider {

    constructor(public http: HttpClient) {

    }

    create(chatGroupId: number, data: {content: string | Blob,type: string}): Observable<any>{

        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('type',data.type);

        return this.http
            .post(`${environment.api.url}/chat_groups/${chatGroupId}/messages`,
            formData);
    }
}
