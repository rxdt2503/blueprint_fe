export type IQuestionStatement = {
  framework_id: number | undefined;
  question_id: number | undefined;
  user_id: number | undefined;
  transcript_text: string;
  audio_path: string | undefined;
  question_text?: string;
};

export interface IQuestionStatementResponse {
  framework_id: number;
  question_id: number;
  user_id: number;
  transcript_text: string;
  audio_path: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  question_text?: string;
}

export type IUpdateStatementBody = {
  statementId: number;
  transcriptText: string;
  audioPath: string | null | undefined;
  questionText: string;
};
