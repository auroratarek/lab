import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analaytics: {},
};
const AnalayticSlice = createSlice({
  name: "analaytics",
  initialState,
  reducers: {
    getAnalaytics: (state, action) => {
      state.analaytics = action.payload;
    },
  },
});
export const selectAnalytics = (state) => state.analaytics.analaytics;

export default AnalayticSlice.reducer;
export const { getAnalaytics } = AnalayticSlice.actions;