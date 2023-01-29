import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Specializations: [],
};

export const SpecializationSlice = createSlice({
  name: "specializations",
  initialState,
  reducers: {
    addAllSpecialization: (state, action) => {
      state.Specializations = action.payload;
    },
    addToSpecialization: (state, action) => {
      state.Specializations = [...state.Specializations, action.payload];
    },

    removeFromSpecialization: (state, action) => {
      const index = state.Specializations.findIndex(
        (SpecializationItem) => SpecializationItem.id === action.payload.id
      );

      let newSpecialization = [...state.Specializations];

      if (index >= 0) {
        newSpecialization.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Specialization`
        );
      }

      state.Specializations = newSpecialization;
    },
  },
});

export const {
  addAllSpecialization,
  addToSpecialization,
  removeFromSpecialization,
} = SpecializationSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectSpecializations = (state) =>
  state.specializations.Specializations;

export default SpecializationSlice.reducer;
