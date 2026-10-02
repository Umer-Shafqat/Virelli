import React, { useContext } from "react";
import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    shoes,
    url,
  } = useContext(StoreContext);

  const deliveryCharges = 300;

  // =====================================================
  // CART ENTRIES
  // =====================================================

  const cartEntries = Object.entries(cartItems || {});

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (shoe) => {
    // New Cloudinary images
    if (
      Array.isArray(shoe?.images) &&
      shoe.images.length > 0
    ) {
      const image = shoe.images[0];

      // Cloudinary / external URL
      if (
        typeof image === "string" &&
        (
          image.startsWith("http://") ||
          image.startsWith("https://")
        )
      ) {
        return image;
      }

      // Old local filename
      if (typeof image === "string") {
        return `${url}/images/${image}`;
      }
    }

    // Support old database structure
    if (shoe?.image) {
      if (
        typeof shoe.image === "string" &&
        (
          shoe.image.startsWith("http://") ||
          shoe.image.startsWith("https://")
        )
      ) {
        return shoe.image;
      }

      return `${url}/images/${shoe.image}`;
    }

    return "";
  };

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = cartEntries.reduce(
    (total, [key, quantity]) => {
      // Get only the product ID.
      // This works for both:
      // productId-M
      // productId-no-size
      const separatorIndex = key.indexOf("-");

      const shoeId =
        separatorIndex === -1
          ? key
          : key.slice(0, separatorIndex);

      const shoe = shoes.find(
        (item) =>
          item._id?.toString() === shoeId
      );

      if (!shoe) {
        return total;
      }

      const price = Number(shoe.price || 0);

      return total + price * quantity;
    },
    0
  );

  // =====================================================
  // TOTAL
  // =====================================================

  const totalAmount =
    subtotal + deliveryCharges;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="cart-page">

      {/* ================= TITLE ================= */}

      <h1>My Cart</h1>

      {/* ================= EMPTY CART ================= */}

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

        <>

          {/* ================= CART CONTAINER ================= */}

          <div className="cart-container">

            <div className="cart-items">

              {cartEntries.map(
                ([key, quantity]) => {

                  // -----------------------------------------
                  // GET PRODUCT ID + SIZE
                  // -----------------------------------------
                  //
                  // IMPORTANT:
                  // We cannot use:
                  //
                  // const [shoeId, size] = key.split("-");
                  //
                  // because:
                  //
                  // abc-no-size
                  //
                  // becomes:
                  // ["abc", "no", "size"]
                  //
                  // Instead, split only at the FIRST "-".
                  // -----------------------------------------

                  const separatorIndex =
                    key.indexOf("-");

                  const shoeId =
                    separatorIndex === -1
                      ? key
                      : key.slice(
                          0,
                          separatorIndex
                        );

                  const size =
                    separatorIndex === -1
                      ? "no-size"
                      : key.slice(
                          separatorIndex + 1
                        );

                  // -----------------------------------------
                  // FIND PRODUCT
                  // -----------------------------------------

                  const shoe = shoes.find(
                    (item) =>
                      item._id?.toString() ===
                      shoeId
                  );

                  if (!shoe) {
                    return null;
                  }

                  // -----------------------------------------
                  // IMAGE
                  // -----------------------------------------

                  const imageUrl =
                    getImageUrl(shoe);

                  // -----------------------------------------
                  // PRICE
                  // -----------------------------------------

                  const price =
                    Number(shoe.price || 0);

                  const itemTotal =
                    price * quantity;

                  return (

                    <div
                      className="cart-item"
                      key={key}
                    >

                      {/* ================= IMAGE ================= */}

                      <div className="cart-image-wrapper">

                        {imageUrl ? (

                          <img
                            src={imageUrl}
                            alt={
                              shoe.name ||
                              "Product"
                            }
                            className="cart-shoe-image"

                            onError={(e) => {
                              console.error(
                                "Cart image failed:",
                                e.currentTarget.src
                              );

                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <div className="cart-image-placeholder">
                            No Image
                          </div>

                        )}

                      </div>

                      {/* ================= DETAILS ================= */}

                      <div className="cart-item-details">

                        <h2>
                          {shoe.name}
                        </h2>

                        {shoe.description && (
                          <p>
                            {shoe.description}
                          </p>
                        )}

                        {/* 
                          Show size ONLY when product
                          has a real size.

                          Shoes:
                          M / L / 42 etc.

                          Hoodies:
                          M / L / XL etc.

                          Chapal:
                          40 / 41 / 42 etc.

                          Jackets:
                          M / L / XL etc.

                          Caps:
                          hidden

                          Watches:
                          hidden
                        */}

                        {size !== "no-size" && (
                          <p>
                            <strong>
                              Size:
                            </strong>{" "}
                            {size}
                          </p>
                        )}

                        <h3>
                          Rs.{" "}
                          {price.toLocaleString(
                            "en-PK"
                          )}
                        </h3>

                      </div>

                      {/* ================= QUANTITY ================= */}

                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              shoe._id,
                              size
                            )
                          }
                        >
                          -
                        </button>

                        <span>
                          {quantity}
                        </span>

                        <button
                          type="button"
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

                      {/* ================= ITEM TOTAL ================= */}

                      <div className="item-total">

                        Rs.{" "}
                        {itemTotal.toLocaleString(
                          "en-PK"
                        )}

                      </div>

                      {/* ================= REMOVE ================= */}

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() =>
                          deleteFromCart(
                            shoe._id,
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

          </div>

          {/* ================= TOTAL ================= */}

          <div className="total-amount">

            {/* SUBTOTAL */}

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

            {/* DELIVERY */}

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

            {/* TOTAL */}

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

            {/* CHECKOUT */}

            <button
              type="button"
              className="checkout-btn"
              onClick={() =>
                navigate(
                  "/place-order",
                  {
                    state: {
                      subtotal,
                      deliveryCharges,
                      totalAmount,
                    },
                  }
                )
              }
            >
              Proceed to Checkout
            </button>

          </div>

        </>

      )}

    </div>
  );
};

export default Cart;