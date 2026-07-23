import React, {
  createContext,
  useState
} from "react";


export const StoreContext = createContext();


const StoreContextProvider = ({ children }) => {

  // All cart items are stored here
  const [cartItems, setCartItems] = useState([]);


  // =====================================
  // ADD TO CART
  // =====================================

  const addToCart = (shoe) => {

    setCartItems((prevItems) => {

      // Check if shoe already exists
      // using unique shoe ID
      const existingItem = prevItems.find(
        (item) => item.id === shoe.id
      );


      // If shoe already exists
      // increase quantity
      if (existingItem) {

        return prevItems.map((item) => {

          if (item.id === shoe.id) {

            return {
              ...item,
              quantity: item.quantity + 1
            };

          }

          return item;

        });

      }


      // If shoe does not exist
      // add it as a new item
      return [
        ...prevItems,

        {
          ...shoe,
          quantity: 1
        }
      ];

    });

  };


  // =====================================
  // REMOVE ONE QUANTITY
  // =====================================

  const removeFromCart = (shoeId) => {

    setCartItems((prevItems) => {

      return prevItems
        .map((item) => {

          if (item.id === shoeId) {

            return {
              ...item,
              quantity: item.quantity - 1
            };

          }

          return item;

        })
        .filter(
          (item) => item.quantity > 0
        );

    });

  };


  // =====================================
  // REMOVE ITEM COMPLETELY
  // =====================================

  const deleteFromCart = (shoeId) => {

    setCartItems((prevItems) => {

      return prevItems.filter(
        (item) => item.id !== shoeId
      );

    });

  };


  // =====================================
  // CONTEXT VALUE
  // =====================================

  const contextValue = {

    cartItems,

    addToCart,

    removeFromCart,

    deleteFromCart

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