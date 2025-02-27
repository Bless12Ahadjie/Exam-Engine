export interface Options {
  label: string;
  value: string;
}

export interface Question {
  text: string;
  type: 'multiple-choice' | 'short-answer' | 'boolean' | 'checkboxes';
  label: string;
  options: Options[];
  correctAnswers: string[];
  score: number;
}

export interface ExamQuestion {
  questionTitle: string;
  questionInstruction: string;
  passMark: number;
  questionStartTime: string;
  questionEndTime: string;
  question: Question[];
  questionReceivers: string[];
}


export interface BackendQuestions {
  questionTitle: string;
  questionInstruction: string;
  passMark: number;
  questionStartTime: string;
  questionEndTime: string;
  question: {
    id: number;
    text: string;
    type: 'SINGLE' | 'MULTIPLE';
    options: string[];
    correctAnswers: string[] | number[];
  }[];
  questionReceivers: string[];
}


export interface ExamSettings {
  questionTitle: string;
  questionInstruction: string;
  passMark: number;
  questionStartTime: string;
  questionEndTime: string;
  questionReceivers: string;
}