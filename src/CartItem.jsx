import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  // Select cart items from the Redux store
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ***** ADD THESE CONSOLE LOGS *****
  console.log("CartItem component rendering.");
  console.log("Current cart state in CartItem:", cart);
  // ***** END CONSOLE LOGS *****

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // Add a check for empty cart to prevent reduce errors on initial render if cart is empty
    if (!cart || cart.length === 0) {
      console.log(
        "calculateTotalAmount: Cart is empty or undefined, returning 0."
      );
      return 0;
    }

    return cart
      .reduce((total, item) => {
        // ***** ADD THESE CHECKS AND CONSOLE LOGS *****
        if (!item) {
          console.error(
            "calculateTotalAmount: Found an undefined item in cart array!",
            item
          );
          return total; // Skip this item
        }
        if (typeof item.cost !== "string" || item.cost === undefined) {
          console.error(
            `calculateTotalAmount: item.cost is not a string or is undefined for item:`,
            item
          );
          // If item.cost is not a string or undefined, return current total without adding this item's cost
          // This is the direct cause of your "replace" error.
          return total;
        }
        // ***** END CONSOLE LOGS *****

        const itemCost = parseFloat(item.cost.replace("$", ""));
        return total + itemCost * item.quantity;
      }, 0)
      .toFixed(2); // Format to 2 decimal places
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    // ***** ADD THESE CHECKS AND CONSOLE LOGS *****
    if (!item || typeof item.cost !== "string" || item.cost === undefined) {
      console.error(
        `calculateTotalCost: item or item.cost is invalid for item:`,
        item
      );
      return 0; // Return 0 if data is bad
    }
    // ***** END CONSOLE LOGS *****
    const itemCost = parseFloat(item.cost.replace("$", ""));
    return (itemCost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      {cart.length === 0 ? (
        <p style={{ color: "black", fontSize: "1.2em" }}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(
            (item) =>
              // ***** ADD THIS CHECK BEFORE MAPPING AN ITEM *****
              // Ensure item and item.name exist before rendering to prevent errors in key or content
              item && item.name ? (
                <div className="cart-item" key={item.name}>
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-cost">Unit Cost: {item.cost}</div>
                    <div className="cart-item-quantity">
                      <button
                        className="cart-item-button cart-item-button-dec"
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </button>
                      <span className="cart-item-quantity-value">
                        {item.quantity}
                      </span>
                      <button
                        className="cart-item-button cart-item-button-inc"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      Total for item: ${calculateTotalCost(item)}
                    </div>
                    <button
                      className="cart-item-delete"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                // This block will render if an item in the cart array is malformed (e.g., null, undefined, or missing name)
                <div
                  key={`malformed-${Math.random()}`}
                  style={{
                    color: "red",
                    border: "1px solid red",
                    padding: "10px",
                    margin: "5px",
                  }}
                >
                  Error: Malformed item in cart. Please clear cart.
                </div>
              )
            // ***** END MAPPING CHECK *****
          )}
        </div>
      )}

      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() =>
            alert("Proceeding to Checkout! (This is a placeholder)")
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
