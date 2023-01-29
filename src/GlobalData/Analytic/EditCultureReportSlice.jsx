import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EditCultureReports: [],
};

export const EditCultureReportSlice = createSlice({
  name: "EditCultureReport",
  initialState,
  reducers: {
    addAllEditCultureReport: (state, action) => {
      state.EditCultureReports = action.payload;
    },
    addToEditCultureReport: (state, action) => {
      state.EditCultureReports = [...state.EditCultureReports, action.payload];
    },

    removeFromEditCultureReport: (state, action) => {
      const index = state.EditCultureReports.findIndex(
        (CultureReportItem) => CultureReportItem.id === action.payload.id
      );

      let newEditCultureReport = [...state.EditCultureReports];

      if (index >= 0) {
        newEditCultureReport.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the CultureReport`
        );
      }

      state.EditCultureReports = newEditCultureReport;
    },
  },
});

export const {
  addAllEditCultureReport,
  addToEditCultureReport,
  removeFromEditCultureReport,
} = EditCultureReportSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectEditCultureReports = (state) =>
  state.EditCultureReport.EditCultureReports;

export default EditCultureReportSlice.reducer;
