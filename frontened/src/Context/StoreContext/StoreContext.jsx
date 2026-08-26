import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {

  const url = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState({});
  const [shoes, setShoes] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );


  /* =====================================
     FETCH SHOES
  ===================================== */

  const fetchShoes = useCallback(async () => {

    try {

      const response = await axios.get(
        `${url}/api/shoes/list`
      );

      if (response.data.success) {

        setShoes(
          response.data.data || []
        );

      }

    } catch (error) {

      console.log(
        "Fetch shoes error:",
        error
      );

    }

  }, [url]);


  /* =====================================
     ADD TO CART
  ===================================== */

  const addToCart = async (shoe, size) => {

    if (!token) {

      navigate("/login");

      return;

    }


    if (!shoe?._id) {

      alert("Shoe ID is missing");

      return;

    }


    if (!size) {

      alert("Please select a size");

      return;

    }


    try {

      const response = await axios.post(

        `${url}/api/cart/add`,

        {
          shoeId: shoe._id,
          size,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      if (response.data.success) {

        const updatedCart =
          response.data.cart || {};


        setCartItems(
          updatedCart
        );


        /*
          Save cart locally so it
          remains after refresh.
        */

        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(updatedCart)
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

        setCartItems({});

      } else {

        alert(
          error.response?.data?.message ||
            "Error adding item to cart"
        );

      }

    }

  };


  /* =====================================
     GET CART
  ===================================== */

  const getCart = useCallback(async () => {

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


      if (response.data.success) {

        const serverCart =
          response.data.cart || {};


        setCartItems(
          serverCart
        );


        /*
          Keep a local copy too.
        */

        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(serverCart)
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

      } else {

        /*
          If backend temporarily
          fails, restore saved cart.
        */

        try {

          const savedCart =
            localStorage.getItem(
              `cartItems_${token}`
            );


          if (savedCart) {

            setCartItems(
              JSON.parse(savedCart)
            );

          }

        } catch (localError) {

          console.log(
            "Local cart error:",
            localError
          );

        }

      }

    }

  }, [token, url]);


  /* =====================================
     REMOVE ONE QUANTITY
  ===================================== */

  const removeFromCart = async (
    shoeId,
    size
  ) => {

    if (!token) return;


    try {

      const response =
        await axios.post(

          `${url}/api/cart/remove`,

          {
            shoeId,
            size,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );


      if (response.data.success) {

        const updatedCart =
          response.data.cart || {};


        setCartItems(
          updatedCart
        );


        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(updatedCart)
        );

      }

    } catch (error) {

      console.log(
        "Remove from cart error:",
        error
      );

    }

  };


  /* =====================================
     DELETE ITEM COMPLETELY
  ===================================== */

  const deleteFromCart = async (
    shoeId,
    size
  ) => {

    if (!token) return;


    let quantity =
      cartItems[
        `${shoeId}-${size}`
      ] || 0;


    try {

      while (quantity > 0) {

        const response =
          await axios.post(

            `${url}/api/cart/remove`,

            {
              shoeId,
              size,
            },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );


        if (
          !response.data.success
        ) {

          break;

        }


        quantity--;


        const updatedCart =
          response.data.cart || {};


        setCartItems(
          updatedCart
        );


        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(updatedCart)
        );

      }

    } catch (error) {

      console.log(
        "Delete from cart error:",
        error
      );

    }

  };


  /* =====================================
     CLEAR CART
     
     ONLY USED AFTER SUCCESSFUL ORDER
  ===================================== */

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
                `Bearer ${token}`,
            },
          }

        );


      if (response.data.success) {

        /*
          Clear React cart
        */

        setCartItems({});


        /*
          Clear saved local cart
        */

        localStorage.removeItem(
          `cartItems_${token}`
        );

      }

    } catch (error) {

      console.log(
        "Clear cart error:",
        error
      );

    }

  };


  /* =====================================
     LOGOUT
  ===================================== */

  const logout = () => {

    if (token) {

      localStorage.removeItem(
        `cartItems_${token}`
      );

    }


    localStorage.removeItem(
      "token"
    );


    setToken("");

    setCartItems({});

  };


  /* =====================================
     FETCH SHOES
  ===================================== */

  useEffect(() => {

    fetchShoes();

  }, [fetchShoes]);


  /* =====================================
     LOAD CART
  ===================================== */

  useEffect(() => {

    if (!token) {

      setCartItems({});

      return;

    }


    /*
      Load saved cart immediately.
    */

    try {

      const savedCart =
        localStorage.getItem(
          `cartItems_${token}`
        );


      if (savedCart) {

        setCartItems(
          JSON.parse(savedCart)
        );

      }

    } catch (error) {

      console.log(
        "Load local cart error:",
        error
      );

    }


    /*
      Then get the latest cart
      from MongoDB.
    */

    getCart();

  }, [token, getCart]);


  /* =====================================
     SAVE TOKEN
  ===================================== */

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


  /* =====================================
     CONTEXT VALUE
  ===================================== */

  const contextValue = {

    url,

    shoes,

    fetchShoes,

    cartItems,

    setCartItems,

    addToCart,

    removeFromCart,

    deleteFromCart,

    clearCart,

    getCart,

    token,

    setToken,

    logout,

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