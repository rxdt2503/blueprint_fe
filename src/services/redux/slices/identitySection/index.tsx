import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT, ERROR, LOADING, SUCCESS } from "../../../api/Constants";
import {
  getIdentityQuestions,
  submitQuestionStatement,
  getSubmitedQuestions,
  updateQuestionStatement,
} from "./helper";
import {
  IIdentityQuestions,
  IQuestions,
} from "../../../api/entities/IIdentityQuestions";

const IDENTITY_DATA_SLICE_NAME = "indentityData";

export interface IIndentityDataType {
  identityData: IIdentityQuestions | undefined;
  identityDataStatus: string;
  identityStatement: IQuestions[];
  currentIndex: number;
  currentQuestion: IQuestions | undefined;
}

const initialState: IIndentityDataType = {
  identityData: undefined,
  identityDataStatus: DEFAULT,
  identityStatement: [],
  currentIndex: -1,
  currentQuestion: undefined,
};

const indentityDataSlice = createSlice({
  name: IDENTITY_DATA_SLICE_NAME,
  initialState: initialState,
  reducers: {
    updateQuesion(state: IIndentityDataType, action) {
      if (action.payload) {
        state.identityData = action.payload.questions;
      }
      return state;
    },

    setAnswer(state: IIndentityDataType, action) {
      if (action.payload) {
        console.log("action.payload.id:: ", action.payload.id);
        state.identityStatement = state.identityStatement.map((data) => {
          if (action.payload.id === data.id) {
            return {
              ...data,
              ...action.payload,
            };
          }
          return data;
        });
      }
      return state;
    },

    setCurrentQuestion(state: IIndentityDataType, action) {
      state.currentQuestion = action.payload;
      return state;
    },

    pushQuestion(state: IIndentityDataType, action) {
      if (action.payload) {
        if (state.identityData) {
          const index = state.currentIndex + 1;
          state.currentQuestion = state.identityData?.questions[index];
          state.identityStatement = [
            ...state.identityStatement,
            state.identityData.questions[index],
          ];
          state.currentIndex = index;
        }
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIdentityQuestions.pending, (state) => {
        state.identityDataStatus = LOADING;
        return state;
      })
      .addCase(
        getIdentityQuestions.fulfilled,
        (state: IIndentityDataType, action) => {
          if (action.payload) {
            state.identityData = action.payload;
            state.identityStatement = [action.payload.questions[0]];
            state.currentQuestion = action.payload.questions[0];
            state.currentIndex = 0;
          } else {
            state.identityDataStatus = SUCCESS;
          }
          return state;
        }
      )
      .addCase(getIdentityQuestions.rejected, (state) => {
        state.identityDataStatus = ERROR;
        return state;
      })
      .addCase(submitQuestionStatement.pending, (state) => {
        state.identityDataStatus = LOADING;
        return state;
      })
      .addCase(
        submitQuestionStatement.fulfilled,
        (state: IIndentityDataType, action) => {
          if (action.payload) {
            state.identityStatement = state.identityStatement.map((data) => {
              if (action.payload?.result.question_id === data.id) {
                return {
                  ...data,
                  ...action.payload.result,
                  stmt_id: action.payload.result.id,
                };
              }
              return data;
            });
            state.identityDataStatus = SUCCESS;
          } else {
            state.identityDataStatus = ERROR;
          }
          return state;
        }
      )
      .addCase(submitQuestionStatement.rejected, (state) => {
        state.identityDataStatus = ERROR;
        return state;
      })
      .addCase(updateQuestionStatement.pending, (state) => {
        state.identityDataStatus = LOADING;
        return state;
      })
      .addCase(
        updateQuestionStatement.fulfilled,
        (state: IIndentityDataType, action) => {
          if (action.payload && action.payload.body) {
            state.identityStatement = state.identityStatement.map((data) => {
              if (action.payload?.body.statementId === data.stmt_id) {
                return {
                  ...data,
                  transcript_text: action.payload?.body?.transcriptText,
                  audio_path: action.payload?.body?.audioPath || "",
                };
              }
              return data;
            });
            state.identityDataStatus = SUCCESS;
          } else {
            state.identityDataStatus = ERROR;
          }
          return state;
        }
      )
      .addCase(updateQuestionStatement.rejected, (state) => {
        state.identityDataStatus = ERROR;
        return state;
      })
      .addCase(getSubmitedQuestions.pending, (state) => {
        state.identityDataStatus = LOADING;
        return state;
      })
      .addCase(
        getSubmitedQuestions.fulfilled,
        (state: IIndentityDataType, action) => {
          if (action.payload) {
            if (action.payload.result?.length) {
              let dataArr: IQuestions[] = [];
              let isLastQuestionAdded = false;
              state.identityData?.questions.map((question, index) => {
                const stmtData = action.payload?.result.find(
                  (data) => data.question_id === question.id
                );
                if (stmtData || !isLastQuestionAdded) {
                  dataArr.push({
                    ...(stmtData && stmtData),
                    ques_stmt: question.ques_stmt,
                    id: question.id,
                    stmt_id: stmtData?.id,
                  });
                  state.currentIndex = index;
                  state.currentQuestion = question;

                  if (!stmtData) isLastQuestionAdded = true;
                }
              });
              // action.payload.result.map((value, index) => {
              //   const questionData = state.identityData?.questions.find(
              //     (question) => question.id === value.question_id
              //   );
              //   if (questionData) {
              //     dataArr.push({
              //       ...value,
              //       ques_stmt: questionData.ques_stmt,
              //       id: questionData.id,
              //     });
              //   }
              //   return value;
              // });
              state.identityStatement = dataArr;
            }
            state.identityDataStatus = SUCCESS;
          } else {
            state.identityDataStatus = ERROR;
          }
          return state;
        }
      )
      .addCase(getSubmitedQuestions.rejected, (state) => {
        state.identityDataStatus = ERROR;
        return state;
      });
  },
});

export const { updateQuesion, setAnswer, pushQuestion, setCurrentQuestion } =
  indentityDataSlice.actions;
export const identityDataReducer = indentityDataSlice.reducer;
