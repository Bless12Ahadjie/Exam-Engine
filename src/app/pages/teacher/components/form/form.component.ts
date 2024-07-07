import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../../interfaces/question.interface';
import {
  persistedGet,
  persistedSave,
} from '../../../../shared/helpers/constants.utile';

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
  showTypePanelFor: number | null = null;
  private dragSrcIndex: number | null = null;

  private elementRef!: ElementRef;

  ngOnInit() {
    this.loadFromStorage();

    if (this.questions.length === 0) {
      this.initializeQuestion();
    }
  }

  emitQuestions() {
    this.outputQuestions.emit(this.questions);
    this.saveToStorage();
  }

  saveToStorage() {
    persistedSave('exam_engine_questions', JSON.stringify(this.questions));
  }

  loadFromStorage() {
    const savedQuestions = persistedGet('exam_engine_questions');
    if (savedQuestions) {
      this.questions = JSON.parse(savedQuestions);
    }
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

  toggleTypePanel(index: number) {
    if (this.showTypePanelFor === index) {
      this.showTypePanelFor = null;
    } else {
      this.showTypePanelFor = index;
    }
  }

  changeQuestionType(index: number, newType: Event) {
    const value = (newType.target as HTMLSelectElement).value as
      | 'multiple-choice'
      | 'short-answer'
      | 'boolean'
      | 'checkboxes';
    this.questions[index].type = value;
    this.emitQuestions();
    this.showTypePanelFor = null;
  }

  addOption(question: Question) {
    if (!question.options) {
      question.options = [];
    }
    question.options.push({
      label: `Option ${question.options.length + 1}`,
      value: '',
    });
    this.emitQuestions();
  }

  deleteOption(question: Question, index: number) {
    if (question.options) {
      question.options.splice(index, 1);
    }
    this.emitQuestions();
  }

  addCorrectAnswer(question: Question, answer: string) {
    if (question.type === 'checkboxes') {
      if (!question.correctAnswers.includes(answer)) {
        question.correctAnswers.push(answer);
      }
      this.emitQuestions();
    } else {
      question.correctAnswers = [answer];
      this.emitQuestions();
    }
  }

  setCorrectAnswer(question: Question, event: Event) {
    const answer = (event.target as HTMLInputElement).value;
    if (question.type === 'short-answer' || question.type === 'boolean') {
      question.correctAnswers = [answer];
    }
    this.emitQuestions();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (
      this.showTypePanelFor !== null &&
      !this.elementRef.nativeElement.contains(targetElement)
    ) {
      this.showTypePanelFor = null;
    }
  }

  onDragStart(event: DragEvent, index: number): void {
    this.dragSrcIndex = index;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', index.toString());
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent): void {
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent, index: number): void {
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    const dragSrcIndex = this.dragSrcIndex;
    if (dragSrcIndex !== null && dragSrcIndex !== index) {
      /**
       * Swap the elements in the questions array
       */

      [this.questions[dragSrcIndex], this.questions[index]] = [
        this.questions[index],
        this.questions[dragSrcIndex],
      ];
    }
    this.dragSrcIndex = null;
  }

  onDragEnd(): void {
    this.dragSrcIndex = null;
  }
}
