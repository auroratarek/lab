import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
};

export const TestMethodSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    addAllTestMethod: (state, action) => {
      state.tests = action.payload;
    },
    addToTestMethod: (state, action) => {
      state.tests = [...state.tests, action.payload];
    },

    removeFromTestMethod: (state, action) => {
      const index = state.tests.findIndex(
        (testItem) => testItem.id === action.payload.id
      );

      let newTest = [...state.tests];

      if (index >= 0) {
        newTest.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Test`
        );
      }

      state.tests = newTest;
    },
  },
});

export const { addAllTestMethod, addToTestMethod, removeFromTestMethod } =
  TestMethodSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectTestMethods = (state) => state.test.tests;

export default TestMethodSlice.reducer;
