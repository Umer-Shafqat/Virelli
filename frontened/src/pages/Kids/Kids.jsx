import React from "react";
import { shoes } from "../../assets/assets";
import "./Kids.css";

const Kids = () => {

  // Only KID shoes
  const kidShoes = shoes.filter(
    (shoe) => shoe.type === "KID"
  );

  return (
    <section className="kid-page">

      <div className="kid-heading">

        <h2>Kids' Shoes Collection</h2>

        <p>
          Explore our latest kids' shoe designs
        </p>

      </div>

      <div className="shoes-grid">

        {kidShoes.map((shoe) => (

          <div
            className="shoe-card"
            key={shoe.id}
          >

            <div className="shoe-image">

              <img
                src={shoe.image}
                alt={shoe.name}
              />

            </div>

            <div className="shoe-info">

              <h3>
                {shoe.name}
              </h3>

              <p className="shoe-category">
                {shoe.category}
              </p>

              <p className="shoe-description">
                {shoe.description}
              </p>

              <h4 className="shoe-price">
                Rs. {shoe.price.toLocaleString()}
              </h4>

              <div className="sizes">

                {shoe.sizes.map((size) => (

                  <button key={size}>
                    {size}
                  </button>

                ))}

              </div>

              <button className="add-cart">
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Kids;