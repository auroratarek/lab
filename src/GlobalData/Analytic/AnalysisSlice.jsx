import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analysis: [],
};

export const AnalysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    addAllAnalysis: (state, action) => {
      state.analysis = action.payload;
    },
    addToAnalysis: (state, action) => {
      state.analysis.data = [...state.analysis.data, action.payload];
    },

    removeFromAnalysis: (state, action) => {
      const index = state.analysis.findIndex(
        (analysisItem) => analysisItem.id === action.payload.id
      );

      let newAnalysis = [...state.analysis];

      if (index >= 0) {
        newAnalysis.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the DBanalysis`
        );
      }

      state.analysis = newAnalysis;
    },
  },
});

export const { addAllAnalysis, addToAnalysis, removeFromAnalysis } =
  AnalysisSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectAnalysis = (state) => state.analysis.analysis;

export default AnalysisSlice.reducer;
