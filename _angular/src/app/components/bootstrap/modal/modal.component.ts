import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

declare const $;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() //EVENTO
  onHide: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private element: ElementRef) {

  }

  ngOnInit() {
    const jqueryElement = this.getJQueryElement();

    jqueryElement.find('[modal-title]').addClass('modal-title');
    jqueryElement.find('[modal-body]').addClass('modal-body');
    jqueryElement.find('[modal-footer]').addClass('modal-footer');

    jqueryElement.on('hidden.bs.modal',(e) => {
      console.log(e);
      this.onHide.emit(e); //EMISSÃO DO EVENTO
    });
  }

  show() {
    this.getJQueryElement().modal('show');
  }

  hide() {
    this.getJQueryElement().modal('hide');
  }

  private getJQueryElement() {
    const nativeElement = this.element.nativeElement;

    return $(nativeElement.firstChild);
  }
}
