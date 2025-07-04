import React, { useState, useEffect } from "react";
import "./ProductList.css";
import CartItem from "./CartItem"; // This import is correct for the cart page display logic
import { useDispatch, useSelector } from "react-redux"; // Make sure useSelector is imported
import { addItem } from "./CartSlice"; // Ensure this path is correct: './CartSlice'

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  // showPlants state is not directly used for AboutUs visibility here, but kept if you had other plans
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({}); // State to manage 'Added to Cart' button text/disabled state

  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Add this line to get the total quantity from the cart state
  const cartQuantity = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Add this useEffect right after your state and useSelector declarations
  useEffect(() => {
    const updatedAddedToCart = {};
    cartItems.forEach((item) => {
      updatedAddedToCart[item.name] = true;
    });
    setAddedToCart(updatedAddedToCart);
  }, [cartItems]); // Dependency array: run whenever cartItems changes

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies air.",
          cost: "$18",
        },
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2021/08/13/22/35/plant-6544088_1280.jpg",
          description: "Soothes skin irritations and purifies air.",
          cost: "$20",
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Peppermint",
          image:
            "https://cdn.pixabay.com/photo/2015/10/13/19/17/mint-986662_1280.jpg",
          description: "Aids digestion and freshens breath.",
          cost: "$10",
        },
        {
          name: "Lavender",
          image:
            "https://cdn.pixabay.com/photo/2016/08/15/14/35/lavender-1595581_1280.jpg",
          description: "Promotes relaxation and improves sleep.",
          cost: "$14",
        },
        {
          name: "Chamomile",
          image:
            "https://cdn.pixabay.com/photo/2016/11/19/12/56/tea-1839140_640.jpg",
          description: "Reduces anxiety and aids sleep.",
          cost: "$11",
        },
        {
          name: "Echinacea",
          image:
            "https://cdn.pixabay.com/photo/2022/08/17/08/58/sun-has-7391959_1280.jpg",
          description: "Boosts immune system and fights infections.",
          cost: "$16",
        },
      ],
    },
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Rosemary",
          image:
            "https://cdn.pixabay.com/photo/2016/01/14/20/56/rosemary-1140763_960_720.jpg",
          description: "Fragrant herb used in cooking and aromatherapy.",
          cost: "$9",
        },
        {
          name: "Jasmine",
          image:
            "https://cdn.pixabay.com/photo/2018/09/18/22/10/jasmine-blue-3687453_1280.jpg",
          description: "Sweet-scented flowers used in perfumes and teas.",
          cost: "$25",
        },
        {
          name: "Eucalyptus",
          image:
            "https://cdn.pixabay.com/photo/2014/07/05/00/16/leaves-384363_1280.jpg",
          description: "Invigorating aroma, often used in essential oils.",
          cost: "$17",
        },
        {
          name: "Gardenia",
          image:
            "https://cdn.pixabay.com/photo/2019/11/07/12/43/gardenia-supachoke-4608767_1280.jpg",
          description: "Large, fragrant white flowers.",
          cost: "$22",
        },
      ],
    },
  ];

  const styleObj = {
    backgroundColor: "#4CAF50", // green
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    margin: "0 10px",
    fontWeight: "bold",
  };

  const styleObjUl = {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333", // Dark background for navbar
    height: "60px",
  };

  const styleA = {
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    transition: "background-color 0.3s",
    display: "block",
  };

  const handleHomeClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowCart(false); // Ensure cart is hidden
    onHomeClick(); // Callback to App.jsx to show landing page
  };

  const handleCartClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowCart(true); // Show the cart
  };

  const handlePlantsClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowCart(false); // Ensure cart is hidden
    // If you had an AboutUs or separate plants list, you'd handle it here
    // For now, it just ensures the product list is shown and not the cart
  };

  // New function to handle adding items to cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant)); // Dispatch the addItem action with the plant object
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true, // Mark this specific plant as added
    }));
  };

  const handleContinueShopping = () => {
    setShowCart(false);
    //onHomeClick();
  };

  return (
    <div>
      {/* Navbar */}
      <div style={styleObjUl} className="navbar">
        <div
          style={{ marginRight: "auto", display: "flex", alignItems: "center" }}
        >
          <a href="/" onClick={(e) => handleHomeClick(e)}>
            <div>
              <h3 style={{ color: "white" }}>Paradise Nursery</h3>
              <i style={{ color: "white" }}>Where Green Meets Serenity</i>
            </div>
          </a>
        </div>
        <div style={styleObjUl}>
          <div>
            {" "}
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            {" "}
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              {/* Cart Icon - will later show quantity */}
              <h1 className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                </svg>
                {/* Placeholder for cart quantity - will be updated later */}
                <span className="cart-quantity">{cartQuantity}</span>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {/* Conditional Rendering for Product List or Cart */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryData, index) => (
            <div key={index} className="plant-category">
              <h2>{categoryData.category}</h2>
              <div className="plants-in-category">
                {categoryData.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="plant-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-image"
                    />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]} // Disable button if already added
                    >
                      {addedToCart[plant.name]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // This will render the CartItem component when showCart is true
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
