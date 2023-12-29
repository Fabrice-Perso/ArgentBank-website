// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajoutez d'autres reducers si nécessaire
  },
});

export default store;
