import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  histopathology: {},
};
const HistopathologySlice = createSlice({
  name: "histopathology",
  initialState,
  reducers: {
    getHistopathology: (state, action) => {
      state.histopathology = action.payload;
    },
  },
});

export default HistopathologySlice.reducer;
export const { getHistopathology } = HistopathologySlice.actions;
