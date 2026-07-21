import React from "react";
import { shoes } from "../../assets/assets";
import "./Men.css";

const Men = () => {

  // Only MEN shoes
  const menShoes = shoes.filter(
    (shoe) => shoe.type === "MEN"
  );

  return (
    <section className="men-page">

      <div className="men-heading">

        <h2>Men's Shoes Collection</h2>

        <p>
          Explore our latest men's shoe designs
        </p>

      </div>

      <div className="shoes-grid">

        {menShoes.map((shoe) => (

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

export default Men;