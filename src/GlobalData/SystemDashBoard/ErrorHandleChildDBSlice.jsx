import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorDBChilds: {},
};
const ErrorHandleChildDBSlice = createSlice({
  name: "errorDBChild",
  initialState,
  reducers: {
    getErrorDBChild: (state, action) => {
      state.errorDBChilds = action.payload;
    },
  },
});

export const selectErrorDBChilds = (state) => state.errorDBChild.errorDBChilds;
export const { getErrorDBChild } = ErrorHandleChildDBSlice.actions;
export default ErrorHandleChildDBSlice.reducer;
