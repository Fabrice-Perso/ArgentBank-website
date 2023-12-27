import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
// import someReducer from './features/someReducer';

const store = configureStore({
  reducer: {
    // your reducers will be added here
    // someFeature: someReducer,
  },
});

export default store;
