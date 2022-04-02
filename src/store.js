import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import routeReducer from "./features/routeSlice";
import photoReducer from "./features/photoSlice";
import inputReducer from "./features/inputSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
    photo: photoReducer,
    input: inputReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
