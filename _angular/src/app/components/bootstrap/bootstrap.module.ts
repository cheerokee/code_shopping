import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared.module";

import { AlertErrorComponent } from "./alert-error/alert-error.component";
import { CardErrorComponent } from "./card-error/card-error.component";
import { FieldErrorComponent } from "./field-error/field-error.component";
import { HeaderTopComponent } from "./header-top/header-top.component";
import { ListErrorComponent } from "./list-error/list-error.component";
import { ModalComponent } from "./modal/modal.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    declarations: [
        AlertErrorComponent,
        CardErrorComponent,
        FieldErrorComponent,
        HeaderTopComponent,
        ListErrorComponent,
        ModalComponent,
        NavbarComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        AlertErrorComponent,
        CardErrorComponent,
        FieldErrorComponent,
        HeaderTopComponent,
        ListErrorComponent,
        ModalComponent,
        NavbarComponent,
        PaginationComponent
    ]
})
export class BootstrapModule {
}
