import React, { useContext } from "react";

import {
  StoreContext
} from "../../Context/StoreContext/StoreContext";

import "./Cart.css";


const Cart = () => {

  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart
  } = useContext(StoreContext);


  return (

    <div className="cart-page">

      <h1>
        My Cart
      </h1>


      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some shoes to your cart.
          </p>

        </div>

      ) : (

        <div className="cart-container">

          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* Shoe Image */}

              <img
                src={item.image}
                alt={item.name}
                className="cart-shoe-image"
              />


              {/* Shoe Details */}

              <div className="cart-item-details">

                <h2>
                  {item.name}
                </h2>

                <p>
                  {item.description}
                </p>

                <h3>
                  Rs. {item.price.toLocaleString()}
                </h3>

              </div>


              {/* Quantity */}

              <div className="quantity-control">

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  -
                </button>


                <span>
                  {item.quantity}
                </span>


                <button
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  +
                </button>

              </div>


              {/* Total */}

              <div className="item-total">

                Rs.{" "}
                {(
                  item.price *
                  item.quantity
                ).toLocaleString()}

              </div>


              {/* Delete */}

              <button
                className="remove-btn"
                onClick={() =>
                  deleteFromCart(item.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};


export default Cart;