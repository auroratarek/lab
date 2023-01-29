import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  units: [],
};

export const UnitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    addAllUnit: (state, action) => {
      state.units = action.payload;
    },
    addToUnit: (state, action) => {
      state.units = [...state.units, action.payload];
    },

    removeFromUnit: (state, action) => {
      const index = state.units.findIndex(
        (unitItem) => unitItem.id === action.payload.id
      );

      let newUnit = [...state.units];

      if (index >= 0) {
        newUnit.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Unit`
        );
      }

      state.units = newUnit;
    },
  },
});

export const { addAllUnit, addToUnit, removeFromUnit } = UnitSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUnits = (state) => state.unit.units;

export default UnitSlice.reducer;
