// update this flag for testing and prod server
const isProd = false;

export const TEST_HOST = "7a43-180-211-112-179.ngrok-free.app";
export const PROD_HOST = "api.grublr.com";

export let HOST = isProd ? PROD_HOST : TEST_HOST;

const ENDPOINT_PATH = "/api/";

export const BASE_URL = "https://" + HOST + ENDPOINT_PATH;

export const ENDPOINTS = {
  signup: "users/signup",
  login: "users/login",
  checkUsername: "users/check/",
  updateUser: "users",
  submitQuestionStatement: "statement-frm/create-stmt-log",
  updateQuestionStatement: "statement-frm/update-stmt-log",
  getSubmitedQuestions: "statement-frm/get-stmt-log",
};

export const DEFAULT = "default";
export const LOADING = "loading";
export const SUCCESS = "success";
export const ERROR = "error";

export const STATUS_FOLLOW = "follow";
export const STATUS_UN_FOLLOW = "unFollow";

export const SOCIAL_FEED_PAGE_LIMIT = 20;
