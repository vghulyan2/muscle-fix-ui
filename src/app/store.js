import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import globalReducer from "./state";
import { globalApi } from "./api/apiQuery";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [globalApi.reducerPath]: globalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(globalApi.middleware),
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

setupListeners(store.dispatch);
