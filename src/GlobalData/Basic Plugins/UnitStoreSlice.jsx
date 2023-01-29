import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UnitStores: [],
};

export const UnitStoreSlice = createSlice({
  name: "unitStore",
  initialState,
  reducers: {
    addAllUnitStore: (state, action) => {
      state.UnitStores = action.payload;
    },
    addToUnitStore: (state, action) => {
      state.UnitStores = [...state.UnitStores, action.payload];
    },

    removeFromUnitStore: (state, action) => {
      const index = state.UnitStores.findIndex(
        (UnitStoreItem) => UnitStoreItem.id === action.payload.id
      );

      let newUnitStore = [...state.UnitStores];

      if (index >= 0) {
        newUnitStore.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the UnitStore`
        );
      }

      state.UnitStores = newUnitStore;
    },
  },
});

export const { addAllUnitStore, addToUnitStore, removeFromUnitStore } =
  UnitStoreSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUnitStores = (state) => state.unitStore.UnitStores;

export default UnitStoreSlice.reducer;
