import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  IIndentityDataType,
  identityDataReducer,
} from "./slices/identitySection";
import { IQuestions } from "../api/entities/IIdentityQuestions";

// Update Store item interface here
export interface IStore {
  identityData: IIndentityDataType;
}
// Add new reducers here
const Reducers = combineReducers({
  identityData: identityDataReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, Reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(logger),
});
