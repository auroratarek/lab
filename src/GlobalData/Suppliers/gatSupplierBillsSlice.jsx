import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SupplierBills: [],
};

export const gatSupplierBillsSlice = createSlice({
  name: "supplierBill",
  initialState,
  reducers: {
    addAllSupplierBill: (state, action) => {
      state.SupplierBills = action.payload;
    },
    addToSupplierBill: (state, action) => {
      state.SupplierBills = [...state.SupplierBills, action.payload];
    },

    removeFromSupplierBill: (state, action) => {
      const index = state.SupplierBills.findIndex(
        (SupplierBillItem) => SupplierBillItem.id === action.payload.id
      );

      let newSupplierBill = [...state.SupplierBills];

      if (index >= 0) {
        newSupplierBill.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the SupplierBill`
        );
      }

      state.SupplierBills = newSupplierBill;
    },
  },
});

export const { addAllSupplierBill, addToSupplierBill, removeFromSupplierBill } =
  gatSupplierBillsSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectSupplierBills = (state) => state.supplierBill.SupplierBills;

export default gatSupplierBillsSlice.reducer;
