import { configureStore } from "@reduxjs/toolkit";

import routingReducer from "./routingSlice";

export default configureStore({
  reducer: {
    routing: routingReducer,
  },
});
