import {Component, inject, OnInit} from '@angular/core';
import {NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {Questions} from "../../../interfaces/response.interface";
import {Router, RouterLink} from "@angular/router";
import {StudentService} from "../../../services/student/student.service";

@Component({
  selector: 'app-recent-test-result',
  standalone: true,
  imports: [
    TitleCasePipe,
    UpperCasePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './recent-test-result.component.html',
  styleUrl: './recent-test-result.component.scss'
})
export class RecentTestResultComponent implements OnInit{
  studentService = inject(StudentService)
  route = inject(Router)
  tablebody: Questions[] = []
  tableHead = [
    {
      name: 'test',
      id: 'id',
      time: 'Question status',
      expire: 'Action',
    }
  ]

  ngOnInit() {
    this.studentService.getPendingQuestions().subscribe(
      {
        next:(data)=>{
          this.tablebody = data.questions.filter(
            (question) => question.questionStatus === "DONE"
          );

        },
        error:(err)=>{
          console.log(err)
        }
      }
    )

  }

  GoToViewMore(id:string,title: string) {
    localStorage.setItem('RidQ',id)
    localStorage.setItem('RQ',title)
    this.route.navigate(['/student/exam-result'])
  }
}
