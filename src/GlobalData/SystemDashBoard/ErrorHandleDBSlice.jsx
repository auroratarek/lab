import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DBerrors: {},
};
const ErrorHandleDBSlice = createSlice({
  name: "errorDB",
  initialState,
  reducers: {
    getDBError: (state, action) => {
      state.DBerrors = action.payload;
    },
  },
});

export const selectDBErrors = (state) => state.errorDB.DBerrors;
export const { getDBError } = ErrorHandleDBSlice.actions;
export default ErrorHandleDBSlice.reducer;
