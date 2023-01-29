import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PaidBills: [],
};

export const getSupplierPaidBillsSlice = createSlice({
  name: "paidBill",
  initialState,
  reducers: {
    addAllPaidBill: (state, action) => {
      state.PaidBills = action.payload;
    },
    addToPaidBill: (state, action) => {
      state.PaidBills = [...state.PaidBills, action.payload];
    },

    removeFromPaidBill: (state, action) => {
      const index = state.PaidBills.findIndex(
        (PaidBillItem) => PaidBillItem.id === action.payload.id
      );

      let newPaidBill = [...state.PaidBills];

      if (index >= 0) {
        newPaidBill.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the PaidBill`
        );
      }

      state.PaidBills = newPaidBill;
    },
  },
});

export const { addAllPaidBill, addToPaidBill, removeFromPaidBill } =
  getSupplierPaidBillsSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectPaidBills = (state) => state.paidBill.PaidBills;

export default getSupplierPaidBillsSlice.reducer;
