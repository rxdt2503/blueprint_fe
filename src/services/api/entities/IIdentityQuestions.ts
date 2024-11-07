export interface IIdentityQuestions {
  id: number;
  section: string;
  type: string;
  questions: IQuestions[];
}

export interface IQuestions {
  id: number;
  ques_stmt: string;
  transcript_text?: string;
  audio_path?: string;
  stmt_id?: number;
}
