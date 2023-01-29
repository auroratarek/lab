import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tupes: [],
};

export const TupeSlice = createSlice({
  name: "tupe",
  initialState,
  reducers: {
    addAllTupe: (state, action) => {
      state.tupes = action.payload;
    },
    addToTupe: (state, action) => {
      state.tupes = [...state.tupes, action.payload];
    },

    removeFromTupe: (state, action) => {
      const index = state.tupes.findIndex(
        (tupeItem) => tupeItem.id === action.payload.id
      );

      let newTupe = [...state.tupes];

      if (index >= 0) {
        newTupe.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Tupe`
        );
      }

      state.tupes = newTupe;
    },
  },
});

export const { addAllTupe, addToTupe, removeFromTupe } = TupeSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectTubes = (state) => state.tupe.tupes;

export default TupeSlice.reducer;
