import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analayticChild: {},
};
const analayticChild = createSlice({
  name: "analayticChild",
  initialState,
  reducers: {
    getAnalayticChild: (state, action) => {
      state.analayticChild = action.payload;
    },
  },
});

export const selectAnalayticChild = (state) =>
  state.analayticChild.analayticChild;
export default analayticChild.reducer;
export const { getAnalayticChild } = analayticChild.actions;
