import { api } from "..";
import { IResponse } from "../../../types/Response";
import {
  IQuestionStatement,
  IQuestionStatementResponse,
  IUpdateStatementBody,
} from "../../../types/Statement";
import { logError } from "../../../utils/logger";
import Request from "../apiRequester";

export const callGetTranscriptFromAudio = async (
  fromData: FormData
): Promise<any> => {
  try {
    Request.Instance.setLoader(false);
    const output = await api.getTranscriptFromAudio(fromData);
    return output;
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const callSubmitQuestionStatement = async (
  body: IQuestionStatement
): Promise<IQuestionStatementResponse> => {
  try {
    Request.Instance.setLoader(false);
    const output = await api.submitQuestionStatement(body);
    Request.Instance.setLoader(true);
    return output?.data;
  } catch (error: any) {
    Request.Instance.setLoader(true);
    logError(error, "API ERROR");
    return error;
  }
};

export const callUpdateQuestionStatement = async (
  body: IUpdateStatementBody
): Promise<IResponse> => {
  try {
    Request.Instance.setLoader(false);
    const output = await api.updateQuestionStatement(body);
    Request.Instance.setLoader(true);
    return output;
  } catch (error: any) {
    Request.Instance.setLoader(true);
    logError(error, "API ERROR");
    return error;
  }
};

export const callGetSubmitedQuestions = async (
  framework_id: number,
  user_id: number
): Promise<IQuestionStatementResponse[]> => {
  try {
    Request.Instance.setLoader(false);
    const output = await api.getSubmitedQuestions(framework_id, user_id);
    Request.Instance.setLoader(true);
    console.log("output?.data:: ", output?.data);
    return output?.data;
  } catch (error: any) {
    Request.Instance.setLoader(true);
    logError(error, "API ERROR");
    return error;
  }
};
