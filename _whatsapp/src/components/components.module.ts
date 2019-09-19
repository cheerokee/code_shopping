import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { MoreOptionsComponent } from './more-options/more-options';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [MoreOptionsComponent],
  imports: [
    FormsModule,
    IonicModule
  ],
	exports: [MoreOptionsComponent]
})
export class ComponentsModule {}
