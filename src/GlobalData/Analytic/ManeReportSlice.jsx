import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ManeReports: [],
};

export const ManeReportSlice = createSlice({
  name: "ManeReport",
  initialState,
  reducers: {
    addAllManeReport: (state, action) => {
      state.ManeReports = action.payload;
    },
    addToManeReport: (state, action) => {
      state.ManeReports = [...state.ManeReports, action.payload];
    },

    removeFromManeReport: (state, action) => {
      const index = state.ManeReports.findIndex(
        (ManeReportItem) => ManeReportItem.id === action.payload.id
      );

      let newManeReport = [...state.ManeReports];

      if (index >= 0) {
        newManeReport.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the ManeReport`
        );
      }

      state.ManeReports = newManeReport;
    },
  },
});

export const { addAllManeReport, addToManeReport, removeFromManeReport } =
  ManeReportSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectManeReports = (state) => state.ManeReport.ManeReports;

export default ManeReportSlice.reducer;
