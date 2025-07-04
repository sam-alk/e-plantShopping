import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"; // Ensure this path is correct: './CartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Assign the cartReducer to the 'cart' slice of the state
  },
});

export default store;
