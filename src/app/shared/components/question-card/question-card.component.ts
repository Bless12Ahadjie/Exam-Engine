import {NgClass, NgFor, NgIf} from '@angular/common';
import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {answerFromStudent, AnswersPayload, Test} from "../../../interfaces/response.interface";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent implements OnInit {

  authService = inject(AuthService);
  @Output() isSubmitActive = new EventEmitter<boolean>();
  @Output() onSendAnswers = new EventEmitter<answerFromStudent[]>();
  @Input() Questions: Test[] = [];
  @Input() answeredQuestions!:AnswersPayload;
  @Input() isfromScoresPage!: boolean;


  currentQuestion!: Test[];
  selectedAnswers: { [questionId: number]: number[] } = {};

  ngOnInit() {
    this.authService.checkAuthStatus();
    this.currentQuestion = this.Questions;
    if (this.isfromScoresPage){
      this.Questions = this.answeredQuestions.answers
    }
  }

  onOptionChange(questionId: number, optionIndex: number) {
    if (!this.selectedAnswers[questionId]) {
      this.selectedAnswers[questionId] = [];
    }

    const question = this.Questions.find(q => q.id === questionId);
    if (question && question.type === 'SINGLE') {
      this.selectedAnswers[questionId] = [optionIndex];
    } else {
      const index = this.selectedAnswers[questionId].indexOf(optionIndex);
      if (index > -1) {
        this.selectedAnswers[questionId].splice(index, 1);
      } else {
        this.selectedAnswers[questionId].push(optionIndex);
      }
    }

  }

  checkAllQuestionsAnswered() {
    const allAnswered = this.Questions.every(q => this.selectedAnswers[q.id]?.length > 0);
    this.isSubmitActive.emit(allAnswered);
  }

  formatAndSendAnswers() {
    const formattedAnswers:answerFromStudent[] = Object.entries(this.selectedAnswers).map(([questionId, selectedIndexes]) => ({
      id: parseInt(questionId),
      answer: this.getAnswerString(parseInt(questionId), selectedIndexes)
    }));

    this.onSendAnswers.emit(formattedAnswers);
    this.checkAllQuestionsAnswered()

  }

  private getAnswerString(questionId: number, selectedIndexes: number[]): string {
    const question = this.Questions.find(q => q.id === questionId);
    if (!question) return '';

    if (question.type === 'SINGLE') {
      return question.options[selectedIndexes[0]] || '';
    } else {
      return selectedIndexes.map(index => question.options[index]).join(', ');
    }
  }

  isOptionSelected(questionId: number, optionIndex: number): boolean {
    return this.selectedAnswers[questionId]?.includes(optionIndex) || false;
  }


  isCorrectAnswer(question: Test, option: string): boolean {
    return question.correctAnswers.includes(option);
  }



  trackById(index: number, question: Test): number {
    return question.id;
  }
}
