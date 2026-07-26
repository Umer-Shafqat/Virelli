import React, {
  createContext,
  useEffect,
  useState,
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

  /*
    Cart format:

    {
      "1-40": 2,
      "2-42": 1,
      "3-39": 3,
      "4-43": 1
    }

    Key:
    shoeId-size

    This allows unlimited different shoes
    and different sizes.
  */

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


    // Check shoe
    if (!shoe?.id) {

      alert("Shoe ID is missing");

      return;

    }


    // Check size
    if (!size) {

      alert("Please select a size");

      return;

    }


    try {

      const response = await axios.post(

        `${url}/api/cart/add`,

        {
          shoeId: shoe.id,
          size: size,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      if (
        response.data.success
      ) {

        /*
          Backend returns the complete cart.

          Example:

          {
            "1-40": 1,
            "2-42": 1,
            "3-39": 1
          }

          So we replace frontend cart
          with complete backend cart.
        */

        setCartItems(
          response.data.cart || {}
        );

      }

    } catch (error) {

      console.log(
        "Add to cart error:",
        error
      );


      // =================================
      // SESSION EXPIRED
      // =================================

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

        setCartItems({});


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

    // If user is not logged in
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
              `Bearer ${token}`,
          },
        }

      );


      if (
        response.data.success
      ) {

        /*
          Load complete cart from MongoDB.

          If cart is empty:

          {}

          If cart contains items:

          {
            "1-40": 2,
            "2-42": 1,
            "3-39": 1
          }
        */

        setCartItems(
          response.data.cartData || {}
        );

      }

    } catch (error) {

      console.log(
        "Get cart error:",
        error
      );


      // =================================
      // SESSION EXPIRED
      // =================================

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

    // Check login
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
          size: size,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      if (
        response.data.success
      ) {

        /*
          Backend returns updated
          complete cart.

          Example:

          Before:
          {
            "1-40": 2,
            "2-42": 1
          }

          After pressing -:
          {
            "1-40": 1,
            "2-42": 1
          }
        */

        setCartItems(
          response.data.cart || {}
        );

      }

    } catch (error) {

      console.log(
        "Remove from cart error:",
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

        setCartItems({});

      }

    }

  };


  // =====================================
  // REMOVE ITEM COMPLETELY
  // =====================================

  const deleteFromCart = async (
    shoeId,
    size
  ) => {

    // Check login
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
          size: size,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      if (
        response.data.success
      ) {

        /*
          We only remove one quantity
          per API request.

          So keep calling remove
          until quantity becomes zero.
        */

        let updatedCart =
          response.data.cart || {};


        const key =
          `${shoeId}-${size}`;


        while (
          updatedCart[key] &&
          updatedCart[key] > 0
        ) {

          const removeResponse =
            await axios.post(

              `${url}/api/cart/remove`,

              {
                shoeId: shoeId,
                size: size,
              },

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }

            );


          if (
            removeResponse.data.success
          ) {

            updatedCart =
              removeResponse.data.cart || {};

          } else {

            break;

          }

        }


        // Update frontend cart
        setCartItems(
          updatedCart
        );

      }

    } catch (error) {

      console.log(
        "Delete cart item error:",
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

        setCartItems({});

      }

    }

  };


  // =====================================
  // CLEAR ENTIRE CART
  // =====================================

  const clearCart = async () => {

    // If not logged in
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
                `Bearer ${token}`,
            },
          }

        );


      if (
        response.data.success
      ) {

        // Empty frontend cart
        setCartItems({});

      }

    } catch (error) {

      console.log(
        "Clear cart error:",
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
  // LOGOUT
  // =====================================

  const logout = () => {

    // Remove token
    localStorage.removeItem(
      "token"
    );


    // Remove token from state
    setToken("");


    // Clear cart from frontend
    setCartItems({});

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

    setToken,

    logout,

  };


  // =====================================
  // PROVIDER
  // =====================================

  return (

    <StoreContext.Provider
      value={contextValue}
    >

      {children}

    </StoreContext.Provider>

  );

};


export default StoreContextProvider;