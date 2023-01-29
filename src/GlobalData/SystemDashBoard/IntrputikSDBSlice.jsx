import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DBIntrputiks: [],
};

export const IntrputikSDBSlice = createSlice({
  name: "DBIntrputik",
  initialState,
  reducers: {
    addAllDBIntrputik: (state, action) => {
      state.DBIntrputiks = action.payload;
    },
    addToDBIntrputik: (state, action) => {
      state.DBIntrputiks = [...state.DBIntrputiks, action.payload];
    },

    removeFromDBIntrputik: (state, action) => {
      const index = state.DBIntrputiks.findIndex(
        (DBIntrputikItem) => DBIntrputikItem.id === action.payload.id
      );

      let newDBIntrputik = [...state.DBIntrputiks];

      if (index >= 0) {
        newDBIntrputik.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the DBIntrputik`
        );
      }

      state.DBIntrputiks = newDBIntrputik;
    },
  },
});

export const { addAllDBIntrputik, addToDBIntrputik, removeFromDBIntrputik } =
  IntrputikSDBSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectDBIntrputiks = (state) => state.DBIntrputik.DBIntrputiks;

export default IntrputikSDBSlice.reducer;
