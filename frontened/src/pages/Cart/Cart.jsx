import React, { useContext } from "react";

import {
  StoreContext
} from "../../Context/StoreContext/StoreContext";

import {
  shoes
} from "../../assets/assets";

import "./Cart.css";


const Cart = () => {

  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart
  } = useContext(StoreContext);


  // =========================
  // DELIVERY CHARGES
  // =========================

  const deliveryCharges = 300;


  // =========================
  // CART ENTRIES
  // =========================

  const cartEntries =
    Object.entries(cartItems);


  // =========================
  // SUBTOTAL
  // =========================

  const subtotal =
    cartEntries.reduce(
      (total, [key, quantity]) => {

        // Key format:
        // shoeId-size

        const [
          shoeId,
          size
        ] = key.split("-");


        // Find shoe from assets
        const shoe =
          shoes.find(
            (item) =>
              item.id.toString() ===
              shoeId
          );


        // If shoe not found
        if (!shoe) {

          return total;

        }


        return (
          total +
          shoe.price *
          quantity
        );

      },
      0
    );


  // =========================
  // TOTAL AMOUNT
  // =========================

  const totalAmount =
    subtotal +
    deliveryCharges;


  return (

    <div className="cart-page">

      <h1>
        My Cart
      </h1>


      {/* =========================
          EMPTY CART
      ========================= */}

      {cartEntries.length === 0 ? (

        <div className="empty-cart">

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some shoes to your cart.
          </p>

        </div>

      ) : (

        /* =========================
           CART ITEMS
        ========================= */

        <>

          <div className="cart-container">

            {cartEntries.map(
              ([key, quantity]) => {

                // =========================
                // GET SHOE ID AND SIZE
                // =========================

                const [
                  shoeId,
                  size
                ] = key.split("-");


                // =========================
                // FIND SHOE
                // =========================

                const shoe =
                  shoes.find(
                    (item) =>
                      item.id.toString() ===
                      shoeId
                  );


                // If shoe doesn't exist
                if (!shoe) {

                  return null;

                }


                return (

                  <div
                    className="cart-item"
                    key={key}
                  >

                    {/* =========================
                        SHOE IMAGE
                    ========================= */}

                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="cart-shoe-image"
                    />


                    {/* =========================
                        SHOE DETAILS
                    ========================= */}

                    <div className="cart-item-details">

                      <h2>
                        {shoe.name}
                      </h2>


                      <p>
                        {shoe.description}
                      </p>


                      {/* Selected Size */}

                      <p>
                        <strong>
                          Size:
                        </strong>{" "}
                        {size}
                      </p>


                      <h3>
                        Rs.{" "}
                        {shoe.price.toLocaleString(
                          "en-PK"
                        )}
                      </h3>

                    </div>


                    {/* =========================
                        QUANTITY
                    ========================= */}

                    <div className="quantity-control">

                      {/* Minus */}

                      <button
                        onClick={() =>
                          removeFromCart(
                            shoe.id,
                            size
                          )
                        }
                      >
                        -
                      </button>


                      {/* Quantity */}

                      <span>
                        {quantity}
                      </span>


                      {/* Plus */}

                      <button
                        onClick={() =>
                          addToCart(
                            shoe,
                            size
                          )
                        }
                      >
                        +
                      </button>

                    </div>


                    {/* =========================
                        ITEM TOTAL
                    ========================= */}

                    <div className="item-total">

                      Rs.{" "}

                      {(
                        shoe.price *
                        quantity
                      ).toLocaleString(
                        "en-PK"
                      )}

                    </div>


                    {/* =========================
                        DELETE
                    ========================= */}

                    <button
                      className="remove-btn"
                      onClick={() =>
                        deleteFromCart(
                          shoe.id,
                          size
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                );

              }
            )}

          </div>


          {/* =========================
              TOTAL AMOUNT
          ========================= */}

          <div className="total-amount">

            {/* Subtotal */}

            <div className="amount-row">

              <span>
                Subtotal
              </span>

              <span>
                PKR{" "}
                {subtotal.toLocaleString(
                  "en-PK"
                )}
              </span>

            </div>


            {/* Delivery */}

            <div className="amount-row">

              <span>
                Delivery Charges
              </span>

              <span>
                PKR{" "}
                {deliveryCharges.toLocaleString(
                  "en-PK"
                )}
              </span>

            </div>


            {/* Total */}

            <div className="amount-row total-row">

              <span>
                Total Amount
              </span>

              <span>
                PKR{" "}
                {totalAmount.toLocaleString(
                  "en-PK"
                )}
              </span>

            </div>


            {/* Checkout */}

            <button
              className="checkout-btn"
            >
              PROCEED TO CHECKOUT
            </button>

          </div>

        </>

      )}

    </div>

  );

};


export default Cart;