import React, {
  createContext,
  useEffect,
  useState
} from "react";

import axios from "axios";


export const StoreContext = createContext();


const StoreContextProvider = ({ children }) => {

  // =====================================
  // BACKEND URL
  // =====================================

  const url = "http://localhost:4000";


  // =====================================
  // CART ITEMS
  // =====================================

  // Cart format:
  // {
  //   "shoeId-size": quantity
  // }

  const [cartItems, setCartItems] = useState({});


  // =====================================
  // AUTH TOKEN
  // =====================================

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );


  // =====================================
  // ADD TO CART
  // =====================================

  const addToCart = async (
    shoe,
    size
  ) => {

    // Check login
    if (!token) {

      alert("Please login first");

      return;

    }


    try {

      const response = await axios.post(

        `${url}/api/cart/add`,

        {
          // Your current shoe data
          // uses "id"
          shoeId: shoe.id,

          // Selected shoe size
          size: size
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );


      if (
        response.data.success
      ) {

        // Update cart from backend
        setCartItems(
          response.data.cart
        );

      }


    } catch (error) {

      console.log(
        "Add to cart error:",
        error
      );


      if (
        error.response?.status === 401
      ) {

        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem(
          "token"
        );

        setToken("");

      } else {

        alert(
          error.response?.data?.message ||
          "Error adding item to cart"
        );

      }

    }

  };


  // =====================================
  // GET CART FROM MONGODB
  // =====================================

  const getCart = async () => {

    if (!token) {

      setCartItems({});

      return;

    }


    try {

      const response = await axios.get(

        `${url}/api/cart/get`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );


      if (
        response.data.success
      ) {

        setCartItems(
          response.data.cartData
        );

      }


    } catch (error) {

      console.log(
        "Get cart error:",
        error
      );


      if (
        error.response?.status === 401
      ) {

        localStorage.removeItem(
          "token"
        );

        setToken("");

        setCartItems({});

      }

    }

  };


  // =====================================
  // REMOVE ONE QUANTITY
  // =====================================

  const removeFromCart = async (
    shoeId,
    size
  ) => {

    if (!token) {

      alert(
        "Please login first"
      );

      return;

    }


    try {

      const response = await axios.post(

        `${url}/api/cart/remove`,

        {
          shoeId: shoeId,
          size: size
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );


      if (
        response.data.success
      ) {

        setCartItems(
          response.data.cart
        );

      }


    } catch (error) {

      console.log(
        "Remove from cart error:",
        error
      );

    }

  };


  // =====================================
  // REMOVE ITEM COMPLETELY
  // =====================================

  const deleteFromCart = async (
    shoeId,
    size
  ) => {

    if (!token) {

      alert(
        "Please login first"
      );

      return;

    }


    try {

      // First get current quantity
      const currentKey =
        `${shoeId}-${size}`;


      const currentQuantity =
        cartItems[currentKey] || 0;


      // Remove item quantity
      // until quantity becomes zero
      for (
        let i = 0;
        i < currentQuantity;
        i++
      ) {

        await axios.post(

          `${url}/api/cart/remove`,

          {
            shoeId: shoeId,
            size: size
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

      }


      // Get updated cart
      await getCart();


    } catch (error) {

      console.log(
        "Delete cart item error:",
        error
      );

    }

  };


  // =====================================
  // CLEAR ENTIRE CART
  // =====================================

  const clearCart = async () => {

    if (!token) {

      setCartItems({});

      return;

    }


    try {

      const response =
        await axios.delete(

          `${url}/api/cart/clear`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );


      if (
        response.data.success
      ) {

        setCartItems({});

      }


    } catch (error) {

      console.log(
        "Clear cart error:",
        error
      );

    }

  };


  // =====================================
  // LOAD CART WHEN USER LOGS IN
  // =====================================

  useEffect(() => {

    if (token) {

      getCart();

    } else {

      setCartItems({});

    }

  }, [token]);


  // =====================================
  // SAVE TOKEN
  // =====================================

  useEffect(() => {

    if (token) {

      localStorage.setItem(
        "token",
        token
      );

    } else {

      localStorage.removeItem(
        "token"
      );

    }

  }, [token]);


  // =====================================
  // CONTEXT VALUE
  // =====================================

  const contextValue = {

    // Backend
    url,


    // Cart
    cartItems,

    setCartItems,

    addToCart,

    removeFromCart,

    deleteFromCart,

    clearCart,

    getCart,


    // Authentication
    token,

    setToken

  };


  return (

    <StoreContext.Provider
      value={contextValue}
    >

      {children}

    </StoreContext.Provider>

  );

};


export default StoreContextProvider;