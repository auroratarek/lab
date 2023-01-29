import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analaytic: JSON.parse( localStorage.getItem('analaytic')) || {},
};
const analaytics = createSlice({
  name: "analaytic",
  initialState,
  reducers: {
    getAnalaytic: (state, action) => {
      state.analaytic = action.payload;
    },
  },
});

export default analaytics.reducer;
export const { getAnalaytic } = analaytics.actions;