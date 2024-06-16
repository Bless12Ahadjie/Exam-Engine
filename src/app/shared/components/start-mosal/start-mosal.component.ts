import {Component, EventEmitter, HostListener,Output} from '@angular/core';

@Component({
  selector: 'app-start-mosal',
  standalone: true,
  imports: [],
  templateUrl: './start-mosal.component.html',
  styleUrl: './start-mosal.component.scss'
})
export class StartMosalComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>(false)

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const isClickedInsideModal = clickedElement.closest('.modal-content');
    const isClickedInsideButton = clickedElement.closest('.cursor-pointer');

    if (!isClickedInsideModal || !isClickedInsideButton) {
      this.closeModalEvent.emit(false);
    }
  }

}
