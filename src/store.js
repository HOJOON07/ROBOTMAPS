import { configureStore } from "@reduxjs/toolkit";
import { mapsReducer } from "./slice";

export const store = configureStore({
  reducer: {
    maps: mapsReducer,
  },
});
