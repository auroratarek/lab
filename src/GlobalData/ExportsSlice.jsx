import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Exports: [],
};

export const ExportsSlice = createSlice({
  name: "export",
  initialState,
  reducers: {
    addAllExport: (state, action) => {
      state.Exports = action.payload;
    },
    addToExport: (state, action) => {
      state.Exports = [...state.Exports, action.payload];
    },
    sortExport: (state, action) => {
      {
        console.log(state.Exports.data);
      }
      state.Exports.data = action.payload;
    },

    removeFromExport: (state, action) => {
      const index = state.Exports.findIndex(
        (ExportItem) => ExportItem.id === action.payload.id
      );

      let newExport = [...state.Exports];

      if (index >= 0) {
        newExport.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Export`
        );
      }

      state.Exports = newExport;
    },
  },
});

export const { addAllExport, sortExport, addToExport, removeFromExport } =
  ExportsSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectExports = (state) => state.export.Exports;

export default ExportsSlice.reducer;
