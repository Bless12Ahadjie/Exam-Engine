import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() control!: AbstractControl<any, any> | null;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() duplicate = new EventEmitter<void>();

  addOption() {
    if (!this.question.options) {
      this.question.options = [];
    }
    this.question.options.push({ label: `Option ${this.question.options.length + 1}`, value: '' });
  }

  deleteOption(index: number) {
    if (this.question.options) {
      this.question.options.splice(index, 1);
    }
  }
}
