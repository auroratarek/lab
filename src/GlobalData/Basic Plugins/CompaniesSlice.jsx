import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Companies: [],
};

export const CompaniesSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addAllCompany: (state, action) => {
      state.Companies = action.payload;
    },
    addToCompany: (state, action) => {
      state.Companies = [...state.Companies, action.payload];
    },

    removeFromCompany: (state, action) => {
      const index = state.Companies.findIndex(
        (companyItem) => companyItem.id === action.payload.id
      );

      let newCompany = [...state.Companies];

      if (index >= 0) {
        newCompany.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the Company`
        );
      }

      state.Companies = newCompany;
    },
  },
});

export const { addAllCompany, addToCompany, removeFromCompany } =
  CompaniesSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectCompanies = (state) => state.company.Companies;

export default CompaniesSlice.reducer;
