import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Suppliers: [],
};

export const getSuppliersSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    addAllSupplier: (state, action) => {
      state.Suppliers = action.payload;
    },
    addToSupplier: (state, action) => {
      state.Suppliers = [...state.Suppliers, action.payload];
    },

    removeFromSupplier: (state, action) => {
      const index = state.Suppliers.findIndex(
        (SupplierItem) => SupplierItem.id === action.payload.id
      );

      let newSupplier = [...state.Suppliers];

      if (index >= 0) {
        newSupplier.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Supplier`
        );
      }

      state.Suppliers = newSupplier;
    },
  },
});

export const { addAllSupplier, addToSupplier, removeFromSupplier } =
  getSuppliersSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectSuppliers = (state) => state.supplier.Suppliers;

export default getSuppliersSlice.reducer;
