import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EditIntrputikSlices: [],
};

export const EditIntrputikSlice = createSlice({
  name: "EditIntrputik",
  initialState,
  reducers: {
    addAllEditIntrputik: (state, action) => {
      state.EditIntrputikSlices = action.payload;
    },
    addToEditIntrputik: (state, action) => {
      state.EditIntrputikSlices = [
        ...state.EditIntrputikSlices,
        action.payload,
      ];
    },

    removeFromEditIntrputik: (state, action) => {
      const index = state.EditIntrputikSlices.findIndex(
        (IntrputikItem) => IntrputikItem.id === action.payload.id
      );

      let newEditIntrputik = [...state.EditIntrputikSlices];

      if (index >= 0) {
        newEditIntrputik.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Intrputik`
        );
      }

      state.EditIntrputikSlices = newEditIntrputik;
    },
  },
});

export const {
  addAllEditIntrputik,
  addToEditIntrputik,
  removeFromEditIntrputik,
} = EditIntrputikSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectEditIntrputiks = (state) =>
  state.EditIntrputik.EditIntrputikSlices;

export default EditIntrputikSlice.reducer;
