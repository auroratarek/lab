import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DBLabs: [],
};

export const LabSDBSlice = createSlice({
  name: "DBLab",
  initialState,
  reducers: {
    addAllDBLab: (state, action) => {
      state.DBLabs = action.payload;
    },
    addToDBLab: (state, action) => {
      state.DBLabs.data = [...state.DBLabs.data, action.payload];
    },

    removeFromDBLab: (state, action) => {
      const index = state.DBLabs.findIndex(
        (dbLabItem) => dbLabItem.id === action.payload.id
      );

      let newDBLab = [...state.DBLabs];

      if (index >= 0) {
        newDBLab.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the DBLab`
        );
      }

      state.DBLabs = newDBLab;
    },
  },
});

export const { addAllDBLab, addToDBLab, removeFromDBLab } = LabSDBSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectDBLabs = (state) => state.DBLab.DBLabs;

export default LabSDBSlice.reducer;
