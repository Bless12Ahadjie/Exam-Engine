import {Component} from '@angular/core';
import {TitleCasePipe, UpperCasePipe} from "@angular/common";
import {StartMosalComponent} from "../start-mosal/start-mosal.component";

@Component({
  selector: 'app-upcoming-exam-table',
  standalone: true,
  imports: [
    UpperCasePipe,
    TitleCasePipe,
    StartMosalComponent
  ],
  templateUrl: './upcoming-exam-table.component.html',
  styleUrl: './upcoming-exam-table.component.scss'
})
export class UpcomingExamTableComponent {

  isModalOpen = false;

  tableHead = [
    {
      name: 'test',
      id: 'id',
      time: 'time',
      expire: 'expire',
      update: 'Action'
    }
  ]

  tablebody = [
    {
      test: 'Mathematical prediction',
      id: '085236850',
      time: '1hrs 30min',
      expire: 'May 31, 2024',
      update: 'update'
    },
    {
      test: 'Mathematical prediction',
      id: '085236850',
      time: '1hrs 30min',
      expire: 'May 31, 2024',
      update: 'update'
    }
  ]

  closeModal($event: Event){
    console.log($event)
    this.isModalOpen = false

  }

  showModal(){
    this.isModalOpen = true;

  }


}
