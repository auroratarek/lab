import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ChildDBanalysis: [],
};

export const AnalysisChildSBDSlice = createSlice({
  name: "ChildDBanalysis",
  initialState,
  reducers: {
    addAllChildDBanalysis: (state, action) => {
      state.ChildDBanalysis = action.payload;
    },
    addToChildDBanalysis: (state, action) => {
      state.ChildDBanalysis.data = [
        ...state.ChildDBanalysis.data,
        action.payload,
      ];
    },

    removeFromChildDBanalysis: (state, action) => {
      const index = state.ChildDBanalysis.findIndex(
        (ChildDBanalysisItem) => ChildDBanalysisItem.id === action.payload.id
      );

      let newChildDBanalysis = [...state.ChildDBanalysis];

      if (index >= 0) {
        newChildDBanalysis.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the ChildDBanalysis`
        );
      }

      state.ChildDBanalysis = newChildDBanalysis;
    },
  },
});

export const {
  addAllChildDBanalysis,
  addToChildDBanalysis,
  removeFromChildDBanalysis,
} = AnalysisChildSBDSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectChildDBanalysis = (state) =>
  state.ChildDBanalysis.ChildDBanalysis;

export default AnalysisChildSBDSlice.reducer;
