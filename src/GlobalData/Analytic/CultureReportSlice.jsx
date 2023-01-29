import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CultureReports: [],
};

export const CultureReportSlice = createSlice({
  name: "CultureReport",
  initialState,
  reducers: {
    addAllCultureReport: (state, action) => {
      state.CultureReports = action.payload;
    },
    addToCultureReport: (state, action) => {
      state.CultureReports = [
        ...state.CultureReports,
        action.payload,
      ];
    },

    removeFromCultureReport: (state, action) => {
      const index = state.CultureReports.findIndex(
        (CultureReportItem) => CultureReportItem.id === action.payload.id
      );

      let newCultureReport = [...state.CultureReports];

      if (index >= 0) {
        newCultureReport.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the CultureReport`
        );
      }

      state.CultureReports = newCultureReport;
    },
  },
});

export const {
  addAllCultureReport,
  addToCultureReport,
  removeFromCultureReport,
} = CultureReportSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectCultureReports = (state) =>
  state.CultureReport.CultureReports;

export default CultureReportSlice.reducer;
