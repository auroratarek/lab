import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AnalysisChilds: [],
};

export const AnalysisChildSlice = createSlice({
  name: "AnalysisChild",
  initialState,
  reducers: {
    addAllAnalysisChild: (state, action) => {
      state.AnalysisChilds = action.payload;
    },
    addToAnalysisChild: (state, action) => {
      state.AnalysisChilds.data = [
        ...state.AnalysisChilds.data,
        action.payload,
      ];
    },

    removeFromAnalysisChild: (state, action) => {
      const index = state.AnalysisChilds.findIndex(
        (AnalysisChildItem) => AnalysisChildItem.id === action.payload.id
      );

      let newAnalysisChild = [...state.AnalysisChilds];

      if (index >= 0) {
        newAnalysisChild.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the AnalysisChild`
        );
      }

      state.AnalysisChilds = newAnalysisChild;
    },
  },
});

export const {
  addAllAnalysisChild,
  addToAnalysisChild,
  removeFromAnalysisChild,
} = AnalysisChildSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectAnalysisChild = (state) =>
  state.AnalysisChild.AnalysisChilds;

export default AnalysisChildSlice.reducer;
