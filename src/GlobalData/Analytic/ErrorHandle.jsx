import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: [],
};
const ErrorHandle = createSlice({
  name: "error",
  initialState,
  reducers: {
    getError: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const selectErrors = (state) => state.error.errors;
export const { getError } = ErrorHandle.actions;
export default ErrorHandle.reducer;
