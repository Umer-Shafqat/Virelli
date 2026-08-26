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
     CART STORAGE KEY
  ===================================== */

  const getCartStorageKey = () => {
    if (!token) return "cartItems";
    return `cartItems_${token}`;
  };

  /* =====================================
     FETCH SHOES
  ===================================== */

  const fetchShoes = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/shoes/list`);

      if (response.data.success) {
        setShoes(response.data.data || []);
      }
    } catch (error) {
      console.log("Fetch shoes error:", error);
    }
  }, [url]);

  /* =====================================
     SAVE CART LOCALLY
  ===================================== */

  const saveCartLocally = useCallback(
    (cart) => {
      try {
        localStorage.setItem(
          getCartStorageKey(),
          JSON.stringify(cart || {})
        );
      } catch (error) {
        console.log("Save cart locally error:", error);
      }
    },
    [token]
  );

  /* =====================================
     LOAD LOCAL CART
  ===================================== */

  const loadLocalCart = useCallback(() => {
    try {
      const savedCart = localStorage.getItem(getCartStorageKey());

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (parsedCart && typeof parsedCart === "object") {
          setCartItems(parsedCart);
          return parsedCart;
        }
      }
    } catch (error) {
      console.log("Load local cart error:", error);
    }

    return {};
  }, [token]);

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
        const updatedCart = response.data.cart || {};

        setCartItems(updatedCart);

        // Keep cart after page refresh
        saveCartLocally(updatedCart);
      }
    } catch (error) {
      console.log("Add to cart error:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");

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
     GET CART FROM DATABASE
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const serverCart = response.data.cart || {};

        setCartItems(serverCart);

        /*
          Save database cart locally too.
          This makes the cart survive a refresh.
        */
        saveCartLocally(serverCart);
      }
    } catch (error) {
      console.log("Get cart error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");

        setToken("");
        setCartItems({});
      } else {
        /*
          If backend is temporarily unavailable,
          use the saved cart.
        */
        loadLocalCart();
      }
    }
  }, [token, url, saveCartLocally, loadLocalCart]);

  /* =====================================
     REMOVE ONE QUANTITY
  ===================================== */

  const removeFromCart = async (shoeId, size) => {
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
        const updatedCart = response.data.cart || {};

        setCartItems(updatedCart);

        saveCartLocally(updatedCart);
      }
    } catch (error) {
      console.log("Remove from cart error:", error);
    }
  };

  /* =====================================
     DELETE ITEM COMPLETELY
  ===================================== */

  const deleteFromCart = async (shoeId, size) => {
    if (!token) return;

    let quantity = cartItems[`${shoeId}-${size}`] || 0;

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

        const updatedCart = response.data.cart || {};

        setCartItems(updatedCart);

        saveCartLocally(updatedCart);
      }
    } catch (error) {
      console.log("Delete from cart error:", error);
    }
  };

  /* =====================================
     CLEAR CART
     
     ONLY CALL THIS AFTER ORDER IS
     SUCCESSFULLY PROCESSED
  ===================================== */

  const clearCart = async () => {
    if (!token) {
      setCartItems({});
      localStorage.removeItem("cartItems");
      return;
    }

    try {
      const response = await axios.delete(
        `${url}/api/cart/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Clear React state
        setCartItems({});

        // Clear saved cart
        localStorage.removeItem(getCartStorageKey());
      }
    } catch (error) {
      console.log("Clear cart error:", error);
    }
  };

  /* =====================================
     LOGOUT
  ===================================== */

  const logout = () => {
    localStorage.removeItem("token");

    if (token) {
      localStorage.removeItem(`cartItems_${token}`);
    }

    setToken("");
    setCartItems({});
  };

  /* =====================================
     FETCH SHOES ON START
  ===================================== */

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  /* =====================================
     GET CART WHEN USER LOGS IN
  ===================================== */

  useEffect(() => {
    if (token) {
      /*
        First show saved cart immediately.
      */
      loadLocalCart();

      /*
        Then get latest cart from MongoDB.
      */
      getCart();
    } else {
      setCartItems({});
    }
  }, [token, getCart, loadLocalCart]);

  /* =====================================
     SAVE TOKEN
  ===================================== */

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
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
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;