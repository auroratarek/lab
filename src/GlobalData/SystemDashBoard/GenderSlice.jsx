import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genders: [],
};

export const GenderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    addAllGender: (state, action) => {
      state.genders = action.payload;
    },
    addToGender: (state, action) => {
      state.genders = [...state.genders, action.payload];
    },

    removeFromGender: (state, action) => {
      const index = state.genders.findIndex(
        (genderItem) => genderItem.id === action.payload.id
      );

      let newGender = [...state.genders];

      if (index >= 0) {
        newGender.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Gender`
        );
      }

      state.genders = newGender;
    },
  },
});

export const { addAllGender, addToGender, removeFromGender } =
  GenderSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectGenders = (state) => state.gender.genders;

export default GenderSlice.reducer;
