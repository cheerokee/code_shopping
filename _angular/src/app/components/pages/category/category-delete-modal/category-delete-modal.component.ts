import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {

  category: Category = null;

  _categoryId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private categoryHttp: CategoryHttpService) {

  }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value;

    if(this._categoryId)
    {
      this.categoryHttp.get(this._categoryId).subscribe(category => this.category = category);
    }
  }

  destroy() {
    this.categoryHttp.destroy(this._categoryId).subscribe((category) => {
      this.onSuccess.emit(category);
      this.modal.hide();
    },error => this.onError.emit(error));
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: Event) {
    //Fazer algo quando o modal foi fechado
    console.log($event);
  }
}
