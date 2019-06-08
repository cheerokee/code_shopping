import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductOutput } from "../../../../model";
import { ProductOutputNewModalComponent } from "../product-output-new-modal/product-output-new-modal.component";
import { ProductOutputInsertService } from "./product-output-insert.service";
import { ProductOutputHttpService } from "../../../../services/http/product-output-http.service";

@Component({
  selector: 'app-product-output-list',
  templateUrl: './product-output-list.component.html',
  styleUrls: ['./product-output-list.component.css']
})
export class ProductOutputListComponent implements OnInit {

  outputs: Array<ProductOutput> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  sortCollumn = { column: 'created_at', sort: 'desc' };

  @ViewChild(ProductOutputNewModalComponent)
  outputNewModal: ProductOutputNewModalComponent;

  searchText: string;

  constructor(private outputHttp: ProductOutputHttpService,
              protected outputInsertService: ProductOutputInsertService) {
    this.outputInsertService.outputListComponent = this;
  }

  ngOnInit() {
    this.getOutputs();
  }

  getOutputs() {
    this.outputHttp.list({
      page: this.pagination.page,
      sort: this.sortCollumn.column === '' ? null : this.sortCollumn,
      search: this.searchText
    }).subscribe(response => {
      this.outputs = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getOutputs();
  }

  sort(sortColumn){
    this.getOutputs();
  }

  search(search) {
    this.searchText = search;
    this.getOutputs();
  }
}
