import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryDeleteService {

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {

    }

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    showModalDelete(categoryId: number) {
        this._categoryListComponent.categoryId = categoryId;
        this._categoryListComponent.categoryDeleteModal.showModal();
    }


    onDeleteSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Categoria excluída com sucesso.`);
        this._categoryListComponent.getCategories();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
        // if($event.status == 400) {
        //   this.notifyMessage.error('ERROR')
        // }
        this.notifyMessage.error(`Não foi possível excluir a categoria, verifique se a mesma não está vinculada com produtos.`);
    }
}
