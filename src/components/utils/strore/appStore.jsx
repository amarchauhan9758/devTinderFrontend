import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import useReducer from "./feedSlice";
import pendingRequest from "./requestReceivedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: useReducer,
    pendingRequest: pendingRequest,
  },
});

export default appStore;
