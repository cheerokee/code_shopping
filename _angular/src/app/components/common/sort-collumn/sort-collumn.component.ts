import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: '[sortCollumn]',
  templateUrl: './sort-collumn.component.html',
  styleUrls: ['./sort-collumn.component.css']
})
export class SortCollumnComponent implements OnInit {

  @Input()
  sortCollumn: { column: string, sort: string };
  @Input()
  columnName: string;

  @Output()
  onSort: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click')
  changeSort(){
    this.sortCollumn.column = this.columnName;
    this.sortCollumn.sort = this.sortCollumn.sort === 'desc' ? 'asc' : 'desc';
    this.onSort.emit(this.sortCollumn);
  }

  showArrowDown()
  {
    return this.columnName === this.sortCollumn.column && this.sortCollumn.sort === 'desc';
  }

  showArrowUp()
  {
    return this.columnName === this.sortCollumn.column && this.sortCollumn.sort === 'asc';
  }
}
