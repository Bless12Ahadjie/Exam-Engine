import { Component , OnDestroy,OnInit} from '@angular/core';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-page',
  standalone: true,
  imports: [QuestionCardComponent,CommonModule],
  templateUrl: './exam-page.component.html',
  styleUrl: './exam-page.component.scss'
})
export class ExamPageComponent implements OnInit,OnDestroy {

  totalTime: number = 5400; // 1:30:00 in seconds
  timeLeft: number = this.totalTime;
  timerSubscription: Subscription | undefined
  isSubmit = false;
  isDisabled = true;
  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
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
        // Handle exam completion here
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

  submitAnswer(){
    console.log("Submit Answer");

  }

}
