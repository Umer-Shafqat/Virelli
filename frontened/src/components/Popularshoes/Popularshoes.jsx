import React from "react";
import { shoes } from "../../assets/assets";
import "./Popularshoes.css";

const Popularshoes = () => {

  const displayedShoes = shoes.slice(0, 6);

  return (
    <section className="shoes-section">

      <div className="shoes-heading">

        <h2>Demanded Articles</h2>

        <p>
          Check out our popular shoe designs
        </p>

      </div>

      <div className="shoes-grid">

        {displayedShoes.map((shoe) => (

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

              <h3>{shoe.name}</h3>

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

export default Popularshoes;