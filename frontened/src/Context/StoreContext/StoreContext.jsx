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
      console.log(
        "Fetch shoes error:",
        error
      );
    }
  }, [url]);


  /* =====================================
     ADD TO CART
  ===================================== */

  const addToCart = async (
    shoeOrId,
    size
  ) => {

    /* ================================
       CHECK LOGIN
    ================================= */

    if (!token) {
      navigate("/login");
      return;
    }


    /* ================================
       GET SHOE ID

       Supports both:

       addToCart(shoe._id, size)

       OR

       addToCart(shoe, size)
    ================================= */

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


    /* ================================
       CHECK SHOE ID
    ================================= */

    if (!shoeId) {
      alert("Shoe ID is missing");

      console.log(
        "Invalid shoe passed to addToCart:",
        shoeOrId
      );

      return;
    }


    /* ================================
       CHECK SIZE
    ================================= */

    if (!size) {
      alert("Please select a size");
      return;
    }


    /* ================================
       SEND REQUEST
    ================================= */

    try {

      const response = await axios.post(
        `${url}/api/cart/add`,
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


      /* ================================
         SUCCESS
      ================================= */

      if (response.data.success) {

        const updatedCart =
          response.data.cart || {};


        /* Update React state */

        setCartItems(
          updatedCart
        );


        /* Save cart locally */

        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(
            updatedCart
          )
        );
      }

    } catch (error) {

      console.log(
        "Add to cart error:",
        error
      );


      /* ================================
         SESSION EXPIRED
      ================================= */

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

        return;
      }


      /* ================================
         OTHER ERROR
      ================================= */

      alert(
        error.response?.data?.message ||
        "Error adding item to cart"
      );
    }
  };


  /* =====================================
     GET CART FROM MONGODB
  ===================================== */

  const getCart = useCallback(
    async () => {

      if (!token) {
        return;
      }

      try {

        const response =
          await axios.get(
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

          const serverCart =
            response.data.cart || {};


          /*
            MongoDB is the main
            source of truth.
          */

          setCartItems(
            serverCart
          );


          /*
            Keep localStorage
            synchronized.
          */

          localStorage.setItem(
            `cartItems_${token}`,
            JSON.stringify(
              serverCart
            )
          );
        }

      } catch (error) {

        console.log(
          "Get cart error:",
          error
        );


        /* ================================
           UNAUTHORIZED
        ================================= */

        if (
          error.response?.status === 401
        ) {

          localStorage.removeItem(
            "token"
          );

          setToken("");
          setCartItems({});

          return;
        }


        /* ================================
           RESTORE LOCAL CART
        ================================= */

        try {

          const savedCart =
            localStorage.getItem(
              `cartItems_${token}`
            );


          if (savedCart) {

            const parsedCart =
              JSON.parse(
                savedCart
              );

            setCartItems(
              parsedCart
            );
          }

        } catch (localError) {

          console.log(
            "Local cart error:",
            localError
          );
        }
      }

    },
    [token, url]
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


      if (
        response.data.success
      ) {

        const updatedCart =
          response.data.cart || {};


        setCartItems(
          updatedCart
        );


        localStorage.setItem(
          `cartItems_${token}`,
          JSON.stringify(
            updatedCart
          )
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

    if (!token) {
      return;
    }


    let quantity =
      cartItems[
        `${shoeId}-${size}`
      ] || 0;


    try {

      while (
        quantity > 0
      ) {

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
          JSON.stringify(
            updatedCart
          )
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


      if (
        response.data.success
      ) {

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


    localStorage.removeItem(
      "token"
    );


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
     LOAD CART WHEN USER LOGS IN /
     REFRESHES
  ===================================== */

  useEffect(() => {

    if (!token) {

      setCartItems({});

      return;
    }


    /*
      STEP 1:

      Immediately restore previous
      cart from localStorage.
    */

    try {

      const savedCart =
        localStorage.getItem(
          `cartItems_${token}`
        );


      if (savedCart) {

        const parsedCart =
          JSON.parse(
            savedCart
          );


        setCartItems(
          parsedCart
        );
      }

    } catch (error) {

      console.log(
        "Load saved cart error:",
        error
      );
    }


    /*
      STEP 2:

      Get latest cart from MongoDB.
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

    /* API URL */

    url,


    /* Shoes */

    shoes,
    fetchShoes,


    /* Cart */

    cartItems,
    setCartItems,


    /* Cart functions */

    addToCart,
    removeFromCart,
    deleteFromCart,


    /* Clear cart */

    clearCart,


    /* Get cart */

    getCart,


    /* Authentication */

    token,
    setToken,


    /* Logout */

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