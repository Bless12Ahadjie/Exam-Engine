import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {QuestionCardComponent} from '../question-card/question-card.component';
import {interval, Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';
import {answerFromStudent, GetQuestions, Test} from "../../../interfaces/response.interface";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {StudentService} from "../../../services/student/student.service";
import {ExamStore} from "../../../store/exam/exam.store";


@Component({
  selector: 'app-exam-page',
  standalone: true,
  imports: [QuestionCardComponent,CommonModule],
  templateUrl: './exam-page.component.html',
  styleUrl: './exam-page.component.scss'
})
export class ExamPageComponent implements OnInit,OnDestroy {
  studentService = inject(StudentService)
  authService = inject(AuthService);
  route = inject(Router)
  examStore = inject(ExamStore);
  private visibilityHandler!: () => void;
  constructor(private router: Router) {
  }
  isLoading: boolean = false;
  ExamName = '';
  Instructions = '';
  totalTime: string = "5400";
  newTotalTime = Number(this.totalTime);
  timeLeft: number = this.newTotalTime;
  timerSubscription: Subscription | undefined
  isSubmit = false;
  isDisabled = true;
  Question_Id: string | null = '';
  Questions: Test[] = []
  formattedAnswers!: answerFromStudent [];

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  ngOnInit() {
    this.visibilityHandler = this.handleVisibilityChange.bind(this);
    document.addEventListener('visibilitychange', this.visibilityHandler);
    this.authService.checkAuthStatus();
    this.Question_Id = localStorage.getItem('idQ');

    this.studentService.getQuestions().subscribe({
      next: (data) => {
        data.questions.filter((question: GetQuestions) => {
          if (question.questionId == this.Question_Id) {
            this.ExamName = question.questionTitle;
            this.totalTime = this.transform(question.questionEndTime);
            // Shuffle the questions here
            this.Questions = this.shuffleArray(question.studentQuestions);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.startTimer();
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.submitAnswer();
    }
  }

  transform(value: string | Date, format: 'full' | 'short' = 'full'): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    if (format === 'full') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } else {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    }
  }

  ngOnDestroy() {
    document.removeEventListener('visibilitychange', this.visibilityHandler);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timerSubscription?.unsubscribe();
        this.submitAnswer();
      }
    });
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  isSubmitActive(event: boolean){
    if(event){
      this.isSubmit = event
      this.isDisabled = false
    }


  }

  onAnswersReceived(answers: answerFromStudent[]) {
    this.formattedAnswers = answers;
  }

  isSubmitted = false;
  submitAnswer() {
    if (this.formattedAnswers && this.Question_Id) {
      this.isLoading = true;
      const submission = this.formattedAnswers;

      this.studentService.submitAnswers(this.Question_Id, submission).subscribe({
        next: (response) => {
          if (response) {
            this.examStore.setCurrentExamResults(response);
            this.examStore.addToExamHistory(response);
            this.router.navigate(['student/exam-done']); // Use 'router' instead of 'route'
          }
          console.log("Answers submitted successfully", response);
        },
        error: (error) => {
          console.error("Error submitting answers", error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      console.error("No answers to submit or missing Question ID");
    }
  }


}
