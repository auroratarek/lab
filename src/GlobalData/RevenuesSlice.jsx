import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Revenues: [],
};

export const RevenuesSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {
    addAllRevenue: (state, action) => {
      state.Revenues = action.payload;
    },
    addToRevenue: (state, action) => {
      state.Revenues = [...state.Revenues, action.payload];
    },
    sortRevenue: (state, action) => {
      {
        console.log(state.Revenues.data);
      }
      state.Revenues.data = action.payload;
    },

    removeFromRevenue: (state, action) => {
      const index = state.Revenues.findIndex(
        (RevenueItem) => RevenueItem.id === action.payload.id
      );

      let newRevenue = [...state.Revenues];

      if (index >= 0) {
        newRevenue.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Revenue`
        );
      }

      state.Revenues = newRevenue;
    },
  },
});

export const { addAllRevenue, sortRevenue, addToRevenue, removeFromRevenue } =
  RevenuesSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectRevenues = (state) => state.revenue.Revenues;

export default RevenuesSlice.reducer;
