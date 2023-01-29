import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorChilds: {},
};
const ErrorHandleChild = createSlice({
  name: "errorChild",
  initialState,
  reducers: {
    getErrorChild: (state, action) => {
      state.errorChilds = action.payload;
    },
  },
});

export const selectErrorChilds = (state) => state.errorChild.errorChilds;
export const { getErrorChild } = ErrorHandleChild.actions;
export default ErrorHandleChild.reducer;
