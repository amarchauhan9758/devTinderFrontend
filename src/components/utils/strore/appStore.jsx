import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import useReducer from './feedSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: useReducer
    }
})

export default appStore