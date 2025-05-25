import { combineReducers } from "@reduxjs/toolkit";
import { feedReducer } from "./feedReducer";
import { userReducer } from "./userReducer";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    feed: feedReducer,
    app: appReducer,
})
