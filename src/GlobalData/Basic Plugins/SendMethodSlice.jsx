import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SendMethods: [],
};

export const SendMethodSlice = createSlice({
  name: "sendMethod",
  initialState,
  reducers: {
    addAllSendMethod: (state, action) => {
      state.SendMethods = action.payload;
    },
    addToSendMethod: (state, action) => {
      state.SendMethods = [...state.SendMethods, action.payload];
    },

    removeFromSendMethod: (state, action) => {
      const index = state.SendMethods.findIndex(
        (SendMethodItem) => SendMethodItem.id === action.payload.id
      );

      let newSendMethod = [...state.SendMethods];

      if (index >= 0) {
        newSendMethod.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the SendMethod`
        );
      }

      state.SendMethods = newSendMethod;
    },
  },
});

export const { addAllSendMethod, addToSendMethod, removeFromSendMethod } =
  SendMethodSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectSendMethods = (state) => state.sendMethod.SendMethods;

export default SendMethodSlice.reducer;
