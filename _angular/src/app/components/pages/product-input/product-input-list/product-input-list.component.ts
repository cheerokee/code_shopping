import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductInput } from "../../../../model";
import { ProductInputNewModalComponent } from "../product-input-new-modal/product-input-new-modal.component";
import { ProductInputInsertService } from "./product-input-insert.service";
import { ProductInputHttpService } from "../../../../services/http/product-input-http.service";

@Component({
  selector: 'app-product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

  inputs: Array<ProductInput> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  sortCollumn = { column: 'created_at', sort: 'desc' };

  @ViewChild(ProductInputNewModalComponent)
  inputNewModal: ProductInputNewModalComponent;

  searchText: string;

  constructor(private inputHttp: ProductInputHttpService,
              protected inputInsertService: ProductInputInsertService) {
    this.inputInsertService.inputListComponent = this;
  }

  ngOnInit() {
    this.getInputs();
  }

  getInputs() {
    this.inputHttp.list({
      page: this.pagination.page,
      sort: this.sortCollumn.column === '' ? null : this.sortCollumn,
      search: this.searchText
    }).subscribe(response => {
      this.inputs = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getInputs();
  }

  sort(sortColumn){
    this.getInputs();
  }

  search(search) {
    this.searchText = search;
    this.getInputs();
  }
}
