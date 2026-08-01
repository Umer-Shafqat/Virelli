import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000";

  const [cartItems, setCartItems] = useState({});
  const [shoes, setShoes] = useState([]);
  
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const fetchShoes = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/shoes/list`);

      if (response.data.success) {
        setShoes(response.data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const addToCart = async (shoe, size) => {
    if (!token) {
      alert("Please login first");
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
        setCartItems(response.data.cart || {});
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
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log("Get cart error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
      }
    }
  }, [token, url]);

  const removeFromCart = async (shoeId, size) => {
    if (!token) {
      alert("Please login first");
      return;
    }

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
        setCartItems(response.data.cart || {});
      }
    } catch (error) {
      console.log("Remove from cart error:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
      }
    }
  };

  const deleteFromCart = async (shoeId, size) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      let updatedCart = { ...cartItems };
      const key = `${shoeId}-${size}`;

      while (updatedCart[key] && updatedCart[key] > 0) {
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
          updatedCart = response.data.cart || {};
        } else {
          break;
        }
      }

      setCartItems(updatedCart);
    } catch (error) {
      console.log("Delete cart item error:", error);
    }
  };

  const clearCart = async () => {
    if (!token) {
      setCartItems({});
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
        setCartItems({});
      }
    } catch (error) {
      console.log("Clear cart error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  useEffect(() => {
    if (token) {
      getCart();
    } else {
      setCartItems({});
    }
  }, [token, getCart]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

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