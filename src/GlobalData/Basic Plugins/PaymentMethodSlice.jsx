import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PaymentMethods: [],
};

export const PaymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    addAllPaymentMethod: (state, action) => {
      state.PaymentMethods = action.payload;
    },
    addToPaymentMethod: (state, action) => {
      state.PaymentMethods = [...state.PaymentMethods, action.payload];
    },

    removeFromPaymentMethod: (state, action) => {
      const index = state.PaymentMethods.findIndex(
        (PaymentMethodItem) => PaymentMethodItem.id === action.payload.id
      );

      let newPaymentMethod = [...state.PaymentMethods];

      if (index >= 0) {
        newPaymentMethod.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the PaymentMethod`
        );
      }

      state.PaymentMethods = newPaymentMethod;
    },
  },
});

export const {
  addAllPaymentMethod,
  addToPaymentMethod,
  removeFromPaymentMethod,
} = PaymentMethodSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectPaymentMethods = (state) =>
  state.paymentMethod.PaymentMethods;

export default PaymentMethodSlice.reducer;
