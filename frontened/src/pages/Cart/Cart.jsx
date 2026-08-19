import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext/StoreContext";
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
  } = useContext(StoreContext);

  const deliveryCharges = 300;

  const cartEntries = Object.entries(cartItems || {});

  const subtotal = cartEntries.reduce((total, [key, quantity]) => {
    const [shoeId] = key.split("-");

    const shoe = shoes.find(
      (item) => item._id?.toString() === shoeId
    );

    if (!shoe) return total;

    return total + shoe.price * quantity;
  }, 0);

  const totalAmount = subtotal + deliveryCharges;

  return (
    <div className="cart-page">
      <h1>My Cart</h1>

      {cartEntries.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some shoes to your cart.</p>
        </div>
      ) : (
        <>
          <div className="cart-container">

            {/* CART ITEMS GRID */}
            <div className="cart-items">
              {cartEntries.map(([key, quantity]) => {
                const [shoeId, size] = key.split("-");

                const shoe = shoes.find(
                  (item) => item._id?.toString() === shoeId
                );

                if (!shoe) {
                  return null;
                }

                return (
                  <div className="cart-item" key={key}>

                    {/* SHOE IMAGE */}
                    <img
                      src={`http://localhost:4000/images/${shoe.image}`}
                      alt={shoe.name}
                      className="cart-shoe-image"
                    />

                    {/* SHOE DETAILS */}
                    <div className="cart-item-details">
                      <h2>{shoe.name}</h2>

                      <p>{shoe.description}</p>

                      <p>
                        <strong>Size:</strong> {size}
                      </p>

                      <h3>
                        Rs. {shoe.price.toLocaleString("en-PK")}
                      </h3>
                    </div>

                    {/* QUANTITY CONTROL */}
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(shoe._id, size)
                        }
                      >
                        -
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(shoe, size)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* ITEM TOTAL */}
                    <div className="item-total">
                      Rs.{" "}
                      {(shoe.price * quantity).toLocaleString(
                        "en-PK"
                      )}
                    </div>

                    {/* REMOVE ITEM */}
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        deleteFromCart(shoe._id, size)
                      }
                    >
                      Remove
                    </button>

                  </div>
                );
              })}
            </div>

          </div>

          {/* TOTAL AMOUNT */}
          <div className="total-amount">

            <div className="amount-row">
              <span>Subtotal</span>

              <span>
                PKR {subtotal.toLocaleString("en-PK")}
              </span>
            </div>

            <div className="amount-row">
              <span>Delivery Charges</span>

              <span>
                PKR {deliveryCharges.toLocaleString("en-PK")}
              </span>
            </div>

            <div className="amount-row total-row">
              <span>Total Amount</span>

              <span>
                PKR {totalAmount.toLocaleString("en-PK")}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/place-order", {
                  state: {
                    subtotal,
                    deliveryCharges,
                    totalAmount,
                  },
                })
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
