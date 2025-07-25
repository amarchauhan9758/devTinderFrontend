import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    initialState: null,
    name: "feed",
    reducers: {
        addFeeds: (state, action) => {
            return action.payload;
        },
        removedFeeds: (state, action) => null
    }

})

export const { addFeeds, removedFeeds } = feedSlice.actions
export default feedSlice.reducer