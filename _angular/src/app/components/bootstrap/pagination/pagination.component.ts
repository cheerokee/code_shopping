import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Input() id: string;
    @Input() maxSize: number;
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
    page: number = 1;

    constructor() { }

    ngOnInit() {
    }


}
