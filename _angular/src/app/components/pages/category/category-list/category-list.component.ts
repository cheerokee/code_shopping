import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { CategoryNewModalComponent } from "../category-new-modal/category-new-modal.component";
import { CategoryEditModalComponent } from "../category-edit-modal/category-edit-modal.component";
import { CategoryDeleteModalComponent } from "../category-delete-modal/category-delete-modal.component";
import { CategoryHttpService } from "../../../../services/http/category-http.service";
import { Category } from "../../../../model";
import { CategoryInsertService } from "./category-insert.service";
import { CategoryEditService } from "./category-edit.service";
import { CategoryDeleteService } from "./category-delete.service";

import { BaseListComponent } from "../../base/base-list/base-list.component";

declare let $;

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // @ts-ignore
  categories: Array<Category> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortCollumn = { column: 'created_at', sort: 'desc' };

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;

  categoryId: number;
  searchText: string;
  constructor(private categoryHttp: CategoryHttpService,
              protected categoryInsertService: CategoryInsertService,
              protected categoryEditService: CategoryEditService,
              protected categoryDeleteService: CategoryDeleteService) {

    this.categoryInsertService.categoryListComponent = this;
    this.categoryEditService.categoryListComponent = this;
    this.categoryDeleteService.categoryListComponent = this;
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp.list({
      page: this.pagination.page,
      sort: this.sortCollumn.column === '' ? null : this.sortCollumn,
      search: this.searchText
    }).subscribe(response => {
      this.categories = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getCategories();
  }

  sort(sortColumn){
    this.getCategories();
  }

  search(search) {
    this.searchText = search;
    this.getCategories();
  }
}
