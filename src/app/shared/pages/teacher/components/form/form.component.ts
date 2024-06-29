import { Component, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [QuestionComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  questionsEmitter = output<Question[]>();
  questions: Question[] = [];

  ngOnInit() {
    this.addQuestion();
  }

  addQuestion() {
    const newQuestion: Question = {
      type: 'multiple-choice',
      text: 'Untitled Question',
      label: `Question ${this.questions.length + 1}`,
      options: [],
      correctAnswers: [],
    };
    this.questions.push(newQuestion);
  }

  editQuestion(question: Question) {
    // Implement logic to edit the question
    console.log('Editing:', question);
  }

  deleteQuestion(question: Question) {
    this.questions = this.questions.filter((q) => q !== question);
  }

  duplicateQuestion(question: Question) {
    const duplicatedQuestion = {
      ...question,
      label: question.label + ' (Copy)',
    };
    this.questions.push(duplicatedQuestion);
  }

  sendQuestions() {
    this.questionsEmitter.emit(this.questions);
  }
}
