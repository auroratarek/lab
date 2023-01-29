import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DBManeReports: [],
};

export const ManeReportSDBSlice = createSlice({
  name: "DBManeReport",
  initialState,
  reducers: {
    addAllDBManeReport: (state, action) => {
      state.DBManeReports = action.payload;
    },
    addToDBManeReport: (state, action) => {
      state.DBManeReports = [...state.DBManeReports, action.payload];
    },

    removeFromDBManeReport: (state, action) => {
      const index = state.DBManeReports.findIndex(
        (dbManeReportItem) => dbManeReportItem.id === action.payload.id
      );

      let newDBManeReport = [...state.DBManeReports];

      if (index >= 0) {
        newDBManeReport.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the DBManeReport`
        );
      }

      state.DBManeReports = newDBManeReport;
    },
  },
});

export const { addAllDBManeReport, addToDBManeReport, removeFromDBManeReport } =
  ManeReportSDBSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectDBManeReports = (state) => state.DBManeReport.DBManeReports;

export default ManeReportSDBSlice.reducer;
