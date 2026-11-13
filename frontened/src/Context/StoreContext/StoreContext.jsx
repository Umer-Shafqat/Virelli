
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

  // =====================================
  // FETCH PRODUCTS
  // =====================================

  const fetchShoes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/api/shoes/list`
      );

      if (response.data.success) {
        const products = response.data.data || [];

        const normalizedProducts = products.map((product) => {
          const productImages =
            Array.isArray(product.images) && product.images.length > 0
              ? product.images
              : product.image
              ? [product.image]
              : [];

          return {
            ...product,
            images: productImages,
            image: productImages[0] || "",
            category: product.category || "Shoes",
          };
        });

        setShoes(normalizedProducts);
      }
    } catch (error) {
      console.log("Fetch shoes error:", error);
    }
  }, [url]);

  // =====================================
  // SAVE CART LOCALLY
  // =====================================

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

  // =====================================
  // ADD TO CART
  // =====================================

  const addToCart = async (shoeOrId, size) => {
    if (!token) {
      navigate("/login");
      return;
    }

    let shoeId = "";
    let product = null;

    if (
      typeof shoeOrId === "string" ||
      typeof shoeOrId === "number"
    ) {
      shoeId = shoeOrId.toString();

      product = shoes.find(
        (item) =>
          item._id?.toString() === shoeId ||
          item.id?.toString() === shoeId
      );
    } else if (shoeOrId?._id) {
      shoeId = shoeOrId._id.toString();
      product = shoeOrId;
    } else if (shoeOrId?.id) {
      shoeId = shoeOrId.id.toString();
      product = shoeOrId;
    }

    if (!shoeId) {
      alert("Product ID is missing");
      return;
    }

    // Categories that require sizes
    const sizeRequiredCategories = [
      "Shoes",
      "Hoodies",
      "Chapal",
      "Jackets",
    ];

    const category = product?.category || "";

    const requiresSize = sizeRequiredCategories.some(
      (requiredCategory) =>
        category.toLowerCase() === requiredCategory.toLowerCase()
    );

    if (requiresSize && !size) {
      alert("Please select a size");
      return;
    }

    // Caps and Watches do not require sizes
    const cartSize = requiresSize ? size : "no-size";

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        {
          shoeId,
          size: cartSize,
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
      console.log("Add to cart error:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem(`cartItems_${token}`);

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

  // =====================================
  // GET CART
  // =====================================

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
        // IMPORTANT:
        // Always synchronize local cart with server cart.
        // This also handles an empty server cart.

        const serverCart = response.data.cart || {};

        setCartItems(serverCart);
        saveCartLocally(serverCart);
      }
    } catch (error) {
      console.log("Get cart error:", error);

      if (error.response?.status === 401) {
        console.log("Cart request unauthorized.");
        return;
      }

      // Restore local cart if server request fails
      try {
        const savedCart = localStorage.getItem(
          `cartItems_${token}`
        );

        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (localError) {
        console.log("Local cart error:", localError);
      }
    }
  }, [token, url, saveCartLocally]);

  // =====================================
  // REMOVE ONE QUANTITY
  // =====================================

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

  // =====================================
  // DELETE ITEM COMPLETELY
  // =====================================

  const deleteFromCart = async (shoeId, size) => {
    if (!token) return;

    const cartKey = `${shoeId}-${size}`;
    let quantity = Number(cartItems[cartKey] || 0);

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

  // =====================================
  // CLEAR CART
  // Call after successful order only
  // =====================================

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

        localStorage.removeItem(
          `cartItems_${token}`
        );
      }
    } catch (error) {
      console.log("Clear cart error:", error);
    }
  };

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {
    if (token) {
      localStorage.removeItem(`cartItems_${token}`);
    }

    localStorage.removeItem("token");

    setToken("");
    setCartItems({});
  };

  // =====================================
  // FETCH PRODUCTS ON LOAD
  // =====================================

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  // =====================================
  // RESTORE CART AFTER REFRESH
  // =====================================

  useEffect(() => {
    if (!token) {
      setCartItems({});
      return;
    }

    try {
      const savedCart = localStorage.getItem(
        `cartItems_${token}`
      );

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.log("Load saved cart error:", error);
    }

    getCart();
  }, [token, getCart]);

  // =====================================
  // SAVE TOKEN
  // =====================================

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // =====================================
  // CONTEXT
  // =====================================

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
