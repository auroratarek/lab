import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EditManeReportSlices: [],
};

export const EditManeReportSlice = createSlice({
  name: "EditManeReport",
  initialState,
  reducers: {
    addAllEditManeReport: (state, action) => {
      state.EditManeReportSlices = action.payload;
    },
    addToEditManeReport: (state, action) => {
      state.EditManeReportSlices = [
        ...state.EditManeReportSlices,
        action.payload,
      ];
    },

    removeFromEditManeReport: (state, action) => {
      const index = state.EditManeReportSlices.findIndex(
        (ManeReportItem) => ManeReportItem.id === action.payload.id
      );

      let newManeReport = [...state.EditManeReportSlices];

      if (index >= 0) {
        newManeReport.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the ManeReport`
        );
      }

      state.EditManeReportSlices = newManeReport;
    },
  },
});

export const {
  addAllEditManeReport,
  addToEditManeReport,
  removeFromEditManeReport,
} = EditManeReportSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectEditManeReportSlices = (state) =>
  state.EditManeReport.EditManeReportSlices;

export default EditManeReportSlice.reducer;
