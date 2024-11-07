export type IQuestionStatement = {
  framework_id: number | undefined;
  question_id: number | undefined;
  user_id: number | undefined;
  transcript_text: string;
  audio_path: string | undefined;
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
  deletedAt: null;
}

export type IUpdateStatementBody = {
  statementId: number;
  transcriptText: string;
  audioPath: string | null | undefined;
};
