import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DBanalysis: [],
};

export const AnalysisSBDSlice = createSlice({
  name: "DBanalysis",
  initialState,
  reducers: {
    addAllDBAnalysis: (state, action) => {
      state.DBanalysis = action.payload;
    },
    addToDBAnalysis: (state, action) => {
      state.DBanalysis.data = [...state.DBanalysis.data, action.payload];
    },

    removeFromDBAnalysis: (state, action) => {
      const index = state.DBanalysis.findIndex(
        (DBanalysisItem) => DBanalysisItem.id === action.payload.id
      );

      let newDBanalysis = [...state.DBanalysis];

      if (index >= 0) {
        newDBanalysis.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the DBanalysis`
        );
      }

      state.DBanalysis = newDBanalysis;
    },
  },
});

export const { addAllDBAnalysis, addToDBAnalysis, removeFromDBAnalysis } =
  AnalysisSBDSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectDBanalysis = (state) => state.DBanalysis.DBanalysis;

export default AnalysisSBDSlice.reducer;
