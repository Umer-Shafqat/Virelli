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

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  /* =====================================
     CART
  ===================================== */

  const [cartItems, setCartItems] = useState({});

  /* =====================================
     SHOES
  ===================================== */

  const [shoes, setShoes] = useState([]);

  /* =====================================
     FETCH SHOES
  ===================================== */

  const fetchShoes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/api/shoes/list`
      );

      if (response.data.success) {
        setShoes(response.data.data || []);
      }
    } catch (error) {
      console.log("Fetch shoes error:", error);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedCart =
          response.data.cart || {};

        setCartItems(updatedCart);

        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(updatedCart)
        );
      }
    } catch (error) {
      console.log("Add to cart error:", error);

      if (error.response?.status === 401) {
        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem("token");

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
     GET CART FROM MONGODB
  ===================================== */

  const getCart = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(
        `${url}/api/cart/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const serverCart =
          response.data.cart || {};

        /*
          MongoDB is the main source of truth.
        */

        setCartItems(serverCart);

        /*
          Keep localStorage synchronized.
        */

        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(serverCart)
        );
      }
    } catch (error) {
      console.log("Get cart error:", error);

      /*
        IMPORTANT:

        Do NOT clear the cart when the server
        temporarily fails.

        Restore the previous local cart instead.
      */

      if (error.response?.status === 401) {
        localStorage.removeItem("token");

        setToken("");
        setCartItems({});

        return;
      }

      try {
        const savedCart =
          localStorage.getItem(
            `cartItems_${token}`
          );

        if (savedCart) {
          const parsedCart =
            JSON.parse(savedCart);

          setCartItems(parsedCart);
        }
      } catch (localError) {
        console.log(
          "Local cart error:",
          localError
        );
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
      const response = await axios.post(
        `${url}/api/cart/remove`,
        {
          shoeId,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedCart =
          response.data.cart || {};

        setCartItems(updatedCart);

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
      cartItems[`${shoeId}-${size}`] || 0;

    try {
      while (quantity > 0) {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          {
            shoeId,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.success) {
          break;
        }

        quantity--;

        const updatedCart =
          response.data.cart || {};

        setCartItems(updatedCart);

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
     
     ONLY AFTER SUCCESSFUL ORDER
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
          Clear React state
        */

        setCartItems({});

        /*
          Clear localStorage
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

    localStorage.removeItem("token");

    setToken("");
    setCartItems({});
  };

  /* =====================================
     INITIAL FETCH SHOES
  ===================================== */

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  /* =====================================
     LOAD CART WHEN USER LOGS IN / REFRESHES
  ===================================== */

  useEffect(() => {
    if (!token) {
      setCartItems({});
      return;
    }

    /*
      STEP 1:
      Immediately restore the previous cart
      from localStorage.

      This makes the cart survive refresh.
    */

    try {
      const savedCart =
        localStorage.getItem(
          `cartItems_${token}`
        );

      if (savedCart) {
        const parsedCart =
          JSON.parse(savedCart);

        setCartItems(parsedCart);
      }
    } catch (error) {
      console.log(
        "Load saved cart error:",
        error
      );
    }

    /*
      STEP 2:
      Get the latest cart from MongoDB.
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
