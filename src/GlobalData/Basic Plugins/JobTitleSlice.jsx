import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  JobTitles: [],
};

export const JobTitleSlice = createSlice({
  name: "jobTitle",
  initialState,
  reducers: {
    addAllJobTitle: (state, action) => {
      state.JobTitles = action.payload;
    },
    addToJobTitle: (state, action) => {
      state.JobTitles = [...state.JobTitles, action.payload];
    },

    removeFromJobTitle: (state, action) => {
      const index = state.JobTitles.findIndex(
        (JobTitleItem) => JobTitleItem.id === action.payload.id
      );

      let newJobTitle = [...state.JobTitles];

      if (index >= 0) {
        newJobTitle.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the JobTitle`
        );
      }

      state.JobTitles = newJobTitle;
    },
  },
});

export const { addAllJobTitle, addToJobTitle, removeFromJobTitle } =
  JobTitleSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectJobTitles = (state) => state.jobTitle.JobTitles;

export default JobTitleSlice.reducer;
