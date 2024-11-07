import {
  callGetSubmitedQuestions,
  callGetTranscriptFromAudio,
  callSubmitQuestionStatement,
  callUpdateQuestionStatement,
} from "./IdentityStatement";

export const ApiCall = {
  callGetTranscriptFromAudio: callGetTranscriptFromAudio,
  callSubmitQuestionStatement: callSubmitQuestionStatement,
  callUpdateQuestionStatement: callUpdateQuestionStatement,
  callGetSubmitedQuestions: callGetSubmitedQuestions,
};
