import { Component, OnInit, output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [QuestionComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  outputQuestions = output<Question[]>();
  questions: Question[] = [];

  ngOnInit() {
    this.initializeQuestion();
  }

  emitQuestions() {
    this.outputQuestions.emit(this.questions);
  }

  initializeQuestion() {
    const newQuestion: Question = {
      label: `Question ${this.questions.length + 1}`,
      type: 'multiple-choice',
      text: 'Untitled Question',
      options: [{ label: 'Option 1', value: 'option 1' }],
      correctAnswers: [],
    };
    this.questions.push(newQuestion);
    this.emitQuestions(); 
  }

  addQuestion() {
    const newQuestion: Question = {
      label: `Question ${this.questions.length + 1}`,
      type: 'multiple-choice',
      text: '',
      options: [],
      correctAnswers: [],
    };
    this.questions.push(newQuestion);
    this.emitQuestions(); 
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  duplicateQuestion(index: number) {
    const question = this.questions[index];
    const duplicatedQuestion = {
      ...question,
      label: question.label + ' (Copy)',
    };
    this.questions.push(duplicatedQuestion);
    this.emitQuestions(); 
  }

  addOption(question: Question) {
    if (!question.options) {
      question.options = [];
    }
    question.options.push({ label: `Option ${question.options.length + 1}`, value: '' });
    this.emitQuestions(); 
  }

  deleteOption(question: Question, index: number) {
    if (question.options) {
      question.options.splice(index, 1);
    }
    this.emitQuestions(); 
  }

  getAllValues() {
    console.log(this.questions);
  }
}
