import { combineReducers } from "@reduxjs/toolkit";
import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { LoginReducer, ReducerApi } from "./redux/slices";
import { createSelectorHook, useDispatch } from "react-redux";
import {
} from "./redux/slices";

const AppReducer = combineReducers({
  api: ReducerApi,
  login:LoginReducer,
});

const AppResetActionType = "App/ResetAllState";
export const ActionAppReset = (): { type: string } => ({
  type: AppResetActionType,
});

const RootReducer: (
  ...param: Parameters<typeof AppReducer>
) => ReturnType<typeof AppReducer> = (state, action) => {
  if (action.type === AppResetActionType) {
    state = undefined;
  }
  return AppReducer(state, action);
};

export const ReduxStore = configureStore({
  reducer: RootReducer as typeof AppReducer,
  // middleware: customMiddleware,
  // Enalbe Dev Tools only on development environment
  devTools: process.env.NODE_ENV === "development",
});

// Application State of the Redux Store
export type AppState = ReturnType<typeof AppReducer>;

// Type declaration for the dispatch funciton of created the Redux Store.
// This will support all actions including the Thunk Async actions.
export type AppDispatch = typeof ReduxStore.dispatch;

// Type declaration for the Thunk Actions.
export type AppThunk = ThunkAction<
  void,
  AppState,
  null,
  Action<string>
>;

// Type declaration for the Thunk API.
// EXTR - Type of the extra argument passed to the thunk
// REJECT - Type of the value thet is passed to the RejectWithValue function
export type AppThunkApi<EXTR = unknown, REJECT = unknown> = {
  dispatch: AppDispatch;
  getState: () => AppState;
  requestId: string;
  extra: EXTR;
  signal: AbortSignal;
  rejectWithValue: (value: REJECT) => void;
};

export const useSelectorTyped = createSelectorHook<AppState>();
export function useDispatchTyped(
  ...param: Parameters<typeof useDispatch>
): AppDispatch {
  return useDispatch<AppDispatch>(...param);
}
