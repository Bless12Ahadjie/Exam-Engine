import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {StartMosalComponent} from "../start-mosal/start-mosal.component";
import {Questions} from "../../../interfaces/response.interface";
import {StudentService} from "../../../services/student/student.service";
import {DurationPipe} from "./duration.pipe";


@Component({
  selector: 'app-upcoming-exam-table',
  standalone: true,
  imports: [
    UpperCasePipe,
    TitleCasePipe,
    StartMosalComponent,
    DatePipe,
    DurationPipe,
    NgIf
  ],
  templateUrl: './upcoming-exam-table.component.html',
  styleUrl: './upcoming-exam-table.component.scss',
  providers: []
})
export class UpcomingExamTableComponent implements OnInit{
  studentService = inject(StudentService)

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

  tablebody: Questions[] = []

  ngOnInit() {
    this.studentService.getPendingQuestions().subscribe(
      {
        next:(data)=>{
          console.log(data)
          this.tablebody = data.questions.filter(
            (question) => question.questionStatus === "PENDING"
          );

        },
        error:(err)=>{
          console.log(err)
        }
      }
    )

  }

  closeModal(event: boolean){
    this.isModalOpen = event

  }

  showModal(Question_id: string){
    this.isModalOpen = true;
    localStorage.setItem('idQ',Question_id)
  }


}
