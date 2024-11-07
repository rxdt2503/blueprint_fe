/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import Request from "./apiRequester";
import { BASE_URL, ENDPOINTS } from "./Constants";
import {
  IQuestionStatement,
  IUpdateStatementBody,
} from "../../types/Statement";

class Api {
  request: Request;

  constructor() {
    this.request = Request?.Instance;
  }

  resetPassword = async (body: any): Promise<any> => {
    return await this.request.send({
      endpoint: ENDPOINTS.checkUsername,
      body: body,
      method: "post",
    });
  };

  getTranscriptFromAudio = async (formData: FormData): Promise<any> => {
    const response = await axios.post(
      `${BASE_URL}statement-frm/upload-audio-file`,
      formData
    );
    console.log("response:: ", response);
    return response.data;
  };

  submitQuestionStatement = async (body: IQuestionStatement): Promise<any> => {
    return await this.request.send({
      endpoint: ENDPOINTS.submitQuestionStatement,
      body: body,
      method: "post",
    });
  };

  updateQuestionStatement = async (
    body: IUpdateStatementBody
  ): Promise<any> => {
    return await this.request.send({
      endpoint: ENDPOINTS.updateQuestionStatement,
      body: body,
      method: "patch",
    });
  };

  getSubmitedQuestions = async (
    framework_id: number,
    user_id: number
  ): Promise<any> => {
    return await this.request.send({
      endpoint: ENDPOINTS.getSubmitedQuestions,
      method: "get",
      body: null,
      headers: {
        "ngrok-skip-browser-warning": true,
      },
      params: {
        framework_id: framework_id.toString(),
        user_id: user_id.toString(),
      },
    });
  };
}

export const api = new Api();
