import { createSlice } from "@reduxjs/toolkit";

const requestReceivedSlice = createSlice({
  initialState: null,
  name: "reqestRecived",
  reducers: {
    pendingRequest: (state, action) => {
      console.log(state, action.payload, "line no 8");
      return action.payload;
    },
    pendingRequestRemove: (state, action) => {
      const pendingRequest = state.filter(
        (user) => user._id !== action.payload
      );
      return pendingRequest;
    },
  },
});

export const { pendingRequest, pendingRequestRemove } =
  requestReceivedSlice.actions;
export default requestReceivedSlice.reducer;
