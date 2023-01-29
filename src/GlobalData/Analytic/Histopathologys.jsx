import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  histopathologys: {},
};
const Histopathologys = createSlice({
  name: "histopathologys",
  initialState,
  reducers: {
    getHistopathologys: (state, action) => {
      state.histopathologys = action.payload;
    },
  },
});

export default Histopathologys.reducer;
export const { getHistopathologys } = Histopathologys.actions;
