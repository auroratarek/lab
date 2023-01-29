import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TestMethods: [],
};

export const TestMethodWSlice = createSlice({
  name: "testMethod",
  initialState,
  reducers: {
    addAllTestMethod: (state, action) => {
      state.TestMethods = action.payload;
    },
    addToTestMethod: (state, action) => {
      state.TestMethods = [...state.TestMethods, action.payload];
    },

    removeFromTestMethod: (state, action) => {
      const index = state.TestMethods.findIndex(
        (TestMethodItem) => TestMethodItem.id === action.payload.id
      );

      let newTestMethod = [...state.TestMethods];

      if (index >= 0) {
        newTestMethod.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the TestMethod`
        );
      }

      state.TestMethods = newTestMethod;
    },
  },
});

export const { addAllTestMethod, addToTestMethod, removeFromTestMethod } =
  TestMethodWSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectTestMethods = (state) => state.testMethod.TestMethods;

export default TestMethodWSlice.reducer;
