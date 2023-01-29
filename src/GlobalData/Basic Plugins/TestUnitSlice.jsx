import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TestUnits: [],
};

export const TestUnitSlice = createSlice({
  name: "testUnit",
  initialState,
  reducers: {
    addAllTestUnit: (state, action) => {
      state.TestUnits = action.payload;
    },
    addToTestUnit: (state, action) => {
      state.TestUnits = [...state.TestUnits, action.payload];
    },

    removeFromTestUnit: (state, action) => {
      const index = state.TestUnits.findIndex(
        (TestUnitItem) => TestUnitItem.id === action.payload.id
      );

      let newTestUnit = [...state.TestUnits];

      if (index >= 0) {
        newTestUnit.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the TestUnit`
        );
      }

      state.TestUnits = newTestUnit;
    },
  },
});

export const { addAllTestUnit, addToTestUnit, removeFromTestUnit } =
  TestUnitSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectTestUnits = (state) => state.testUnit.TestUnits;

export default TestUnitSlice.reducer;
