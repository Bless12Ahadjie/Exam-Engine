export interface IResponse {
  status: number;
  message: string;
}
export interface  QuestionsResponse{
  answers:Answers[]
  "status": number,
  "message": string,
  "questions": Questions[]
}


export interface Answers{
  answerId:string
  answers: AnsweredChoice[]
  questionId:string
  studentId:string
  totalMarks:number
}

export interface AnsweredChoice{
  correctAnswers:string[]
  id:number
  options:string[]
  text:string
  type:string
  userChoice:string[]
}

export interface  GetQuestionsResponse{
  "status": number,
  "message": string,
  "questions": GetQuestions[]
}
export interface GetQuestions{
  dateCreated:string
  questionEndTime:string
  questionId:string
  questionStartTime:string
  questionStatus:string
  questionTitle:string
  studentQuestions: Test[]
}

export interface Questions{
  dateCreated: string
  questionEndTime: string
  questionId: string
  questionInstructions: string
  questionStartTime: string
  questionStatus:string
  questionTitle:string
  questions:Test[]
  receivers: []
}

export interface  Test{
  "id": number,
  "text": string,
  "type": string,
  "options": string[],
  "correctAnswers": string[],
  score: string
}

export interface AnswerSubmission {
  questionId: string | null;
  studentAnswers: answerFromStudent[];
}

export interface SubmitPhoto{
  "studentId": string,
  "screenshot": string | null
}

export interface answerFromStudent{
  id: number;
  answer: string;
}

export  interface  AnswersPayload {
  status: number
  message: string
  answers: Test[]
  questionId: string
}


export interface IExamState {
  currentExam?: AnswersPayload;
  examHistory: AnswersPayload[];
}
