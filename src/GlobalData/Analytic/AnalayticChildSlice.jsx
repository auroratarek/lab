import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analayticChilds: {},
};
const AnalayticChildSlice = createSlice({
  name: "analayticChilds",
  initialState,
  reducers: {
    getAnalayticChilds: (state, action) => {
      state.analayticChilds = action.payload;
    },
  },
});
export const selectAnalayticChilds= (state) => state.analayticChilds.analayticChilds;

export default AnalayticChildSlice.reducer;
export const { getAnalayticChilds } = AnalayticChildSlice.actions;