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

  const [cartItems, setCartItems] = useState({});
  const [shoes, setShoes] = useState([]);

  /* =====================================
     FETCH PRODUCTS
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
     FIND PRODUCT
  ===================================== */

  const findShoe = useCallback(
    (shoeOrId) => {
      if (!shoeOrId) return null;

      // Product object was passed
      if (typeof shoeOrId === "object") {
        return shoeOrId;
      }

      // Product ID was passed
      return (
        shoes.find(
          (shoe) =>
            String(shoe._id) === String(shoeOrId) ||
            String(shoe.id) === String(shoeOrId)
        ) || null
      );
    },
    [shoes]
  );

  /* =====================================
     CHECK WHETHER SIZE IS REQUIRED
     
     IMPORTANT:
     undefined / old products = size required
     false = size NOT required
  ===================================== */

  const productRequiresSize = useCallback(
    (shoeOrId) => {
      const shoe = findShoe(shoeOrId);

      if (!shoe) {
        // Keep old products safe
        return true;
      }

      return shoe.requiresSize !== false;
    },
    [findShoe]
  );

  /* =====================================
     SAVE CART LOCALLY
  ===================================== */

  const saveCartLocally = useCallback(
    (cart) => {
      if (!token) return;

      localStorage.setItem(
        `cartItems_${token}`,
        JSON.stringify(cart)
      );
    },
    [token]
  );

  /* =====================================
     ADD TO CART
  ===================================== */

  const addToCart = async (shoeOrId, size) => {
    if (!token) {
      navigate("/login");
      return;
    }

    let shoeId = "";

    if (
      typeof shoeOrId === "string" ||
      typeof shoeOrId === "number"
    ) {
      shoeId = shoeOrId;
    } else if (shoeOrId?._id) {
      shoeId = shoeOrId._id;
    } else if (shoeOrId?.id) {
      shoeId = shoeOrId.id;
    }

    if (!shoeId) {
      alert("Shoe ID is missing");
      return;
    }

    /* =====================================
       CHECK PRODUCT SIZE REQUIREMENT
    ===================================== */

    const requiresSize =
      productRequiresSize(shoeOrId);

    let finalSize = size;

    if (requiresSize) {
      // Size is required
      if (
        !size ||
        String(size).trim() === ""
      ) {
        alert("Please select a size");
        return;
      }

      finalSize = String(size).trim();
    } else {
      // Size is NOT required
      finalSize = "N/A";
    }

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        {
          shoeId,
          size: finalSize,
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
        saveCartLocally(updatedCart);
      }
    } catch (error) {
      console.log(
        "Add to cart error:",
        error
      );

      if (error.response?.status === 401) {
        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem("token");

        localStorage.removeItem(
          `cartItems_${token}`
        );

        setToken("");
        setCartItems({});

        return;
      }

      alert(
        error.response?.data?.message ||
          "Error adding item to cart"
      );
    }
  };

  /* =====================================
     GET CART
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
          If MongoDB has cart items,
          use MongoDB cart.

          If MongoDB returns an empty cart,
          keep the local cart.
        */

        const hasServerItems =
          Object.keys(serverCart).length > 0;

        if (hasServerItems) {
          setCartItems(serverCart);
          saveCartLocally(serverCart);
        }
      }
    } catch (error) {
      console.log(
        "Get cart error:",
        error
      );

      /*
        If server request fails,
        keep localStorage cart.
      */

      if (error.response?.status === 401) {
        console.log(
          "Cart request unauthorized."
        );

        return;
      }

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
  }, [token, url, saveCartLocally]);

  /* =====================================
     NORMALIZE CART SIZE
     
     Products without size always use N/A
  ===================================== */

  const normalizeCartSize = useCallback(
    (shoeId, size) => {
      const requiresSize =
        productRequiresSize(shoeId);

      if (!requiresSize) {
        return "N/A";
      }

      return size;
    },
    [productRequiresSize]
  );

  /* =====================================
     REMOVE ONE QUANTITY
  ===================================== */

  const removeFromCart = async (
    shoeId,
    size
  ) => {
    if (!token) {
      return;
    }

    const finalSize =
      normalizeCartSize(shoeId, size);

    if (
      productRequiresSize(shoeId) &&
      (!finalSize ||
        String(finalSize).trim() === "")
    ) {
      console.log(
        "Size is required for this product."
      );

      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/cart/remove`,
        {
          shoeId,
          size: finalSize,
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
        saveCartLocally(updatedCart);
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
    if (!token) {
      return;
    }

    const finalSize =
      normalizeCartSize(shoeId, size);

    const cartKey =
      `${shoeId}-${finalSize}`;

    let quantity =
      cartItems[cartKey] || 0;

    if (quantity <= 0) {
      return;
    }

    try {
      while (quantity > 0) {
        const response =
          await axios.post(
            `${url}/api/cart/remove`,
            {
              shoeId,
              size: finalSize,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
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
        saveCartLocally(updatedCart);
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

     ONLY CALL AFTER SUCCESSFUL ORDER
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
        setCartItems({});

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
     FETCH PRODUCTS
  ===================================== */

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  /* =====================================
     RESTORE CART AFTER REFRESH
  ===================================== */

  useEffect(() => {
    if (!token) {
      setCartItems({});
      return;
    }

    /*
      FIRST:
      Restore cart immediately
      from localStorage.
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
      SECOND:
      Check MongoDB.
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
      localStorage.removeItem("token");
    }
  }, [token]);

  /* =====================================
     CONTEXT
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