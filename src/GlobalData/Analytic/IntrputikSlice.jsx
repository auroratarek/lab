import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    IntrputikSlices: [],
};

export const IntrputikSDBSlice = createSlice({
  name: "Intrputik",
  initialState,
  reducers: {
    addAllIntrputik: (state, action) => {
      state.IntrputikSlices = action.payload;
    },
    addToIntrputik: (state, action) => {
      state.IntrputikSlices = [...state.IntrputikSlices, action.payload];
    },

    removeFromIntrputik: (state, action) => {
      const index = state.IntrputikSlices.findIndex(
        (IntrputikItem) => IntrputikItem.id === action.payload.id
      );

      let newIntrputik = [...state.IntrputikSlices];

      if (index >= 0) {
        newIntrputik.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Intrputik`
        );
      }

      state.IntrputikSlices = newIntrputik;
    },
  },
});

export const { addAllIntrputik, addToIntrputik, removeFromIntrputik } =
  IntrputikSDBSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectIntrputiks = (state) => state.Intrputik.IntrputikSlices;

export default IntrputikSDBSlice.reducer;
