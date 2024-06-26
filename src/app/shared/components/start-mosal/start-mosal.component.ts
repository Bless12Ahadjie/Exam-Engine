import {Component, EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-start-mosal',
  standalone: true,
  imports: [],
  templateUrl: './start-mosal.component.html',
  styleUrl: './start-mosal.component.scss'
})
export class StartMosalComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();


  closeModal(){
    this.closeModalEvent.emit(false);
  }

}
