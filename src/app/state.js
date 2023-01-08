import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: "63ae241054d3c7977665ad07",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
