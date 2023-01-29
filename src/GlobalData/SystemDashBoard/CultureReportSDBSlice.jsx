import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DBCultureReports: [],
};

export const CultureReportSDBSlice = createSlice({
  name: "DBCultureReport",
  initialState,
  reducers: {
    addAllDBCultureReport: (state, action) => {
      state.DBCultureReports = action.payload;
    },
    addToDBCultureReport: (state, action) => {
      state.DBCultureReports = [
        ...state.DBCultureReports,
        action.payload,
      ];
    },

    removeFromDBCultureReport: (state, action) => {
      const index = state.DBCultureReports.findIndex(
        (DBCultureReportItem) => DBCultureReportItem.id === action.payload.id
      );

      let newDBCultureReport = [...state.DBCultureReports];

      if (index >= 0) {
        newDBCultureReport.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the DBCultureReport`
        );
      }

      state.DBCultureReports = newDBCultureReport;
    },
  },
});

export const {
  addAllDBCultureReport,
  addToDBCultureReport,
  removeFromDBCultureReport,
} = CultureReportSDBSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectDBCultureReports = (state) =>
  state.DBCultureReport.DBCultureReports;

export default CultureReportSDBSlice.reducer;
