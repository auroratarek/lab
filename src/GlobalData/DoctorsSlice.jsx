import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Doctors: [],
};

export const DoctorsSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    addAllDoctor: (state, action) => {
      state.Doctors = action.payload;
    },
    addToDoctor: (state, action) => {
      state.Doctors = [...state.Doctors, action.payload];
    },

    removeFromDoctor: (state, action) => {
      const index = state.Doctors.findIndex(
        (DoctorItem) => DoctorItem.id === action.payload.id
      );

      let newDoctor = [...state.Doctors];

      if (index >= 0) {
        newDoctor.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Doctor`
        );
      }

      state.Doctors = newDoctor;
    },
  },
});

export const { addAllDoctor, addToDoctor, removeFromDoctor } =
  DoctorsSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectDoctors = (state) => state.doctor.Doctors;

export default DoctorsSlice.reducer;
