export interface Options {
  label: string;
  value: string;
}

export interface Question {
  type: 'multiple-choice' | 'text' | 'boolean' | 'checkboxes';
  text: string;
  label: string;
  options?: Options[];
  correctAnswers: string[] | number[];
}
