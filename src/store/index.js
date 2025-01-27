import { configureStore } from "@reduxjs/toolkit";

// Slices
import authReducer from "./authSlice";
import alertReducer from "./alertSlice";
import { eventsApi } from "./eventsApiSlice";

const cacheInvalidationMiddleware = (store) => (next) => (action) => {
  if (action.type === "auth/removeUser") {
    store.dispatch(eventsApi.util.resetApiState());
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      eventsApi.middleware,
      cacheInvalidationMiddleware,
    ),
});

export default store;
