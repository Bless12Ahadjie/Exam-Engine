export interface Options {
  label: string;
  value: string;
}

export interface Question {
  text: string;
  type: 'multiple-choice' | 'short-answer' | 'boolean' | 'checkboxes';
  label: string;
  options: Options[];
  correctAnswers: string[] | number[];
}

export interface ExamQuestion {
  questionTitle: string;
  questionInstruction: string;
  questionStartTime: string;
  questionEndTime: string;
  question: Question[];
  questionReceivers: string[];
}


export interface BackendQuestions {
  questionTitle: string;
  questionInstruction: string;
  questionStartTime: string;
  questionEndTime: string;
  question: {
    id: number;
    text: string;
    type: string;
    options: string[];
    correctAnswers: string[] | number[];
  }[];
  questionReceivers: string[];
}
