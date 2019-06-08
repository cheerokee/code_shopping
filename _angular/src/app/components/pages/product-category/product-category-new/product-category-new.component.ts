import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, ProductCategory} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {

  categories: Category[] = [];
  categoriesId: number[] = [];

  @Input() productId: number;
  @Input() productCategory: ProductCategory = null;

  @Output() onSuccess:  EventEmitter<any> = new EventEmitter<any>();
  @Output() onError:    EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService,
              private productCategoryHttp: ProductCategoryHttpService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp.list({ all: true}).subscribe(response => {
      this.categories = response.data;
    });
  }

  submit() {
    const categoriesId = this.mergeCategories();
    this.productCategoryHttp
        .create(this.productId,categoriesId)
        .subscribe(productCategory => this.onSuccess.emit(productCategory),error => this.onError.emit(error));
    return false;
  }

  private mergeCategories(): number[] {
    //[ {}, {}, {} ]
    //[ 1, 4, 5 ]
    const categoriesId = this.productCategory.categories.map((category) => category.id); //para cada categoria dentro do array de categories
    const newCategoriesId = this.categoriesId.filter((category) => { // [2,3] -> Para evitar duplicação
      //IndexOf vai retornar o indice caso esteja dentro do array senão retorna -1
      return categoriesId.indexOf(category) == -1;
    });

    return categoriesId.concat(newCategoriesId);
  }


}
