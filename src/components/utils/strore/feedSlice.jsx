import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  initialState: null,
  name: "feed",
  reducers: {
    addFeeds: (state, action) => {
      return action.payload;
    },
    removedFeeds: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeeds, removedFeeds } = feedSlice.actions;
export default feedSlice.reducer;
