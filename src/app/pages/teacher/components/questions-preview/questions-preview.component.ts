import { Component, OnInit, signal } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { persistedGet } from '../../../../shared/helpers/constants.utile';

@Component({
  selector: 'app-questions-preview',
  standalone: true,
  imports: [],
  templateUrl: './questions-preview.component.html',
  styleUrl: './questions-preview.component.scss',
})
export class QuestionsPreviewComponent implements OnInit {
  questions = signal<Question[]>([]);

  ngOnInit(): void {
    const questionsData = persistedGet('exam_engine_questions');
    if (questionsData) {
      const questions = JSON.parse(questionsData);
      this.questions.set(questions);
    }
  }
}
