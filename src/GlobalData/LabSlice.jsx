import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Labs: [],
};

export const LabSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {
    addAllLab: (state, action) => {
      state.Labs = action.payload;
    },
    addToLab: (state, action) => {
      state.Labs = [...state.Labs, action.payload];
    },
    sortLab: (state, action) => {
      {
        console.log(state.Labs.data);
      }
      state.Labs.data = action.payload;
    },

    removeFromLab: (state, action) => {
      const index = state.Labs.findIndex(
        (LabItem) => LabItem.id === action.payload.id
      );

      let newLab = [...state.Labs];

      if (index >= 0) {
        newLab.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Lab`
        );
      }

      state.Labs = newLab;
    },
  },
});

export const { addAllLab, sortLab, addToLab, removeFromLab } = LabSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectLabs = (state) => state.lab.Labs;

export default LabSlice.reducer;
