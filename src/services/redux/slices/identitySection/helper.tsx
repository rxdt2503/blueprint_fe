import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCall } from "../../../api/call";
import { AppApiException } from "../../../api/error/AppApiException";

import questions from "../../../../utils/dummyQuestions.json";
import { IIdentityQuestions } from "../../../api/entities/IIdentityQuestions";
import {
  IQuestionStatement,
  IUpdateStatementBody,
} from "../../../../types/Statement";

// const FETCH_USER_PREFERENCE = "fetchUserPreferences";
const GET_IDENTITY_QUESTIONS = "getIdentityQuestions";
const SUBMIT_QUESTION_STATEMENT = "submitQuestionStatement";
const GET_SUBMITED_QUESTIONS = "getSubmitedQuestions";
const UPDATE_QUESTION_STATEMENT = "updateQuestionStatement";

export const getIdentityQuestions = createAsyncThunk(
  GET_IDENTITY_QUESTIONS,
  async () => {
    return questions as IIdentityQuestions;
  }
);

export const submitQuestionStatement = createAsyncThunk(
  SUBMIT_QUESTION_STATEMENT,
  async (body: IQuestionStatement) => {
    const result = await ApiCall.callSubmitQuestionStatement(body);

    if (!(result instanceof AppApiException)) {
      return {
        result,
      };
    }
  }
);

export const updateQuestionStatement = createAsyncThunk(
  UPDATE_QUESTION_STATEMENT,
  async (body: IUpdateStatementBody) => {
    const result = await ApiCall.callUpdateQuestionStatement(body);
    if (!(result instanceof AppApiException)) {
      return {
        result,
        body,
      };
    } else {
      return undefined;
    }
  }
);

export const getSubmitedQuestions = createAsyncThunk(
  GET_SUBMITED_QUESTIONS,
  async ({
    framework_id,
    user_id,
  }: {
    framework_id: number;
    user_id: number;
  }) => {
    const result = await ApiCall.callGetSubmitedQuestions(
      framework_id,
      user_id
    );

    if (!(result instanceof AppApiException)) {
      return {
        result,
      };
    }
  }
);
