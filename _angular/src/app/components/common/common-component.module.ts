import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PhoneNumberAuthModalComponent} from "./phone-number-auth-modal/phone-number-auth-modal.component";
import {SortCollumnComponent} from "./sort-collumn/sort-collumn.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BootstrapModule} from "../bootstrap/bootstrap.module";
import {SharedModule} from "../../shared.module";

@NgModule({
    declarations: [
        PhoneNumberAuthModalComponent,
        SortCollumnComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule
    ],
    exports: [
        PhoneNumberAuthModalComponent,
        SortCollumnComponent
    ]
})
export class CommonComponentModule { }
