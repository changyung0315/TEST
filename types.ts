
export interface Question {
  id: string;
  text: string;
  answer: string;
  explanation: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface Section {
  name: string;
  questions: Question[];
}

export interface ExamPaper {
  id: string;
  title: string;
  sections: Section[];
}

export enum AppMode {
  PRACTICE = 'PRACTICE',
  AI_GENERATE = 'AI_GENERATE',
  SCORE_REPORT = 'SCORE_REPORT'
}
