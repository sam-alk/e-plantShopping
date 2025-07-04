import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === newItem.name
      );

      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If item is new, add it to the cart with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.name !== itemToRemove.name
      );
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity = quantity;
        // Optionally remove item if quantity drops to 0 or less
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    },
  },
});

// Export the actions for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be combined in the store
export default CartSlice.reducer;
