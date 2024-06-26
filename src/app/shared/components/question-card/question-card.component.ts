import { NgFor, NgIf } from '@angular/common';
import { Component,EventEmitter,OnInit, Output } from '@angular/core';
interface Question {
  id: number;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
  correctAnswers: number[];
}
@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent implements OnInit {
  @Output() onSendAnswers = new EventEmitter();
  @Output() isSubmitActive = new EventEmitter<boolean>();
  ngOnInit() {
    this.currentQuestion = this.questions[0];
  }
  currentQuestion!: Question;
  currentQuestionIndex: number = 0;
  selectedAnswers: { [questionId: number]: number[] } = {};

  sendAnswers(){
    if(this.selectedAnswers[this.currentQuestion.id]?.length > 0){
      this.isSubmitActive.emit(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
       this.onSendAnswers.emit(this.selectedAnswers);

    }


  }

  questions: Question[] = [
    {
      id: 1,
      text: 'What is the capital of France?',
      type: 'single',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswers: [2]
    },
    {
      id: 2,
      text: 'Which of the following are primary colors?',
      type: 'multiple',
      options: ['Red', 'Green', 'Blue', 'Yellow'],
      correctAnswers: [0, 2, 3]
    },
    {
      id: 3,
      text: 'Who wrote "Romeo and Juliet"?',
      type: 'single',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correctAnswers: [1]
    },
    {
      id: 4,
      text: 'Which of these elements are noble gases?',
      type: 'multiple',
      options: ['Helium', 'Oxygen', 'Neon', 'Chlorine'],
      correctAnswers: [0, 2]
    },
    {
      id: 5,
      text: 'What is the largest planet in our solar system?',
      type: 'single',
      options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
      correctAnswers: [1]
    },
    {
      id: 6,
      text: 'Which of these countries are in South America?',
      type: 'multiple',
      options: ['Brazil', 'Spain', 'Peru', 'Mexico'],
      correctAnswers: [0, 2]
    },
    {
      id: 7,
      text: 'What is the chemical symbol for gold?',
      type: 'single',
      options: ['Ag', 'Au', 'Fe', 'Cu'],
      correctAnswers: [1]
    },
    {
      id: 8,
      text: 'Which of these are programming languages?',
      type: 'multiple',
      options: ['Python', 'Cobra', 'Java', 'Leopard'],
      correctAnswers: [0, 2]
    },
    {
      id: 9,
      text: 'Who painted the Mona Lisa?',
      type: 'single',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correctAnswers: [2]
    },
    {
      id: 10,
      text: 'Which of these are types of renewable energy?',
      type: 'multiple',
      options: ['Solar', 'Coal', 'Wind', 'Nuclear'],
      correctAnswers: [0, 2]
    },
    {
      id: 11,
      text: 'What is the largest ocean on Earth?',
      type: 'single',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswers: [3]
    },
    {
      id: 12,
      text: 'Which of these animals are mammals?',
      type: 'multiple',
      options: ['Dolphin', 'Shark', 'Bat', 'Eagle'],
      correctAnswers: [0, 2]
    }
  ];



  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onOptionChange(questionId: number, optionIndex: number) {
    if (!this.selectedAnswers[questionId]) {
      this.selectedAnswers[questionId] = [];
    }

    if (this.currentQuestion.type === 'single') {
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

  isOptionSelected(questionId: number, optionIndex: number): boolean {
    return this.selectedAnswers[questionId]?.includes(optionIndex) || false;
  }
}
