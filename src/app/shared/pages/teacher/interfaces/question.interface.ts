export interface Options {
  label: string;
  value: string;
}

export interface Question {
  type: string;
  text: string;
  label: string;
  options?: Options[];
  correctAnswers?: string[] | number[];
}
