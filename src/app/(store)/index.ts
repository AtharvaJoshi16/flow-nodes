import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "../(slice)/nodeSlice";
import edgeReducer from "../(slice)/edgeSlice";
import optionsReducer from "../(slice)/optionsSlice";
export const store = configureStore({
  reducer: {
    nodes: nodeReducer,
    edges: edgeReducer,
    options: optionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
