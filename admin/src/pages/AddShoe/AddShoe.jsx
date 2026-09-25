import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./AddShoe.css";

const AddShoe = () => {
  const [shoeData, setShoeData] = useState({
    name: "",
    category: "Shoes",
    gender: "MEN",
    popular: "false",
    price: "",
    discount: "",
    sizes: "",
    description: "",
    isNewArrival: false,
    isOffer: false,
    offerPrice: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://virelli.onrender.com";

  const shoeCategories = ["Shoes", "Chapal"];
  const clothingCategories = ["Hoodies", "Jackets"];
  const noSizeCategories = ["Watches", "Caps"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "category") {
      let sizes = "";

      if (shoeCategories.includes(value)) {
        sizes = "39,40,41,42,43";
      } else if (clothingCategories.includes(value)) {
        sizes = "S,M,L,XL,XXL";
      }

      setShoeData((prev) => ({
        ...prev,
        category: value,
        sizes,
      }));

      return;
    }

    setShoeData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setImages(files);

    const imagePreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(imagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", shoeData.name);
      formData.append("category", shoeData.category);
      formData.append("type", shoeData.gender);
      formData.append("popular", shoeData.popular);
      formData.append("price", shoeData.price);
      formData.append("discount", shoeData.discount);

      if (!noSizeCategories.includes(shoeData.category)) {
        formData.append("sizes", shoeData.sizes);
      } else {
        formData.append("sizes", "");
      }

      formData.append("description", shoeData.description);

      formData.append(
        "isNewArrival",
        shoeData.isNewArrival ? "true" : "false"
      );

      formData.append(
        "isOffer",
        shoeData.isOffer ? "true" : "false"
      );

      formData.append("offerPrice", shoeData.offerPrice);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(
        `${backendUrl}/api/shoes/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Product added successfully!");

        setShoeData({
          name: "",
          category: "Shoes",
          gender: "MEN",
          popular: "false",
          price: "",
          discount: "",
          sizes: "39,40,41,42,43",
          description: "",
          isNewArrival: false,
          isOffer: false,
          offerPrice: "",
        });

        setImages([]);
        setPreviews([]);

        e.target.reset();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Something went wrong."
        );
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const showSizeField = !noSizeCategories.includes(
    shoeData.category
  );

  const sizePlaceholder = shoeCategories.includes(
    shoeData.category
  )
    ? "39,40,41,42,43"
    : "S,M,L,XL,XXL";

  return (
    <div className="addshoe-page">
      <Sidebar />
      <Navbar />

      <div className="addshoe-content">
        <div className="addshoe-card">
          <h2>Add New Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="image-upload">
              <label>Product Images</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImages}
                multiple
                required
              />

              {previews.length > 0 && (
                <div className="image-preview-container">
                  {previews.map((preview, index) => (
                    <div
                      className="image-preview-box"
                      key={index}
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="image-preview"
                      />

                      <span className="image-number">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {images.length > 0 && (
                <p className="selected-image-text">
                  {images.length} image
                  {images.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={shoeData.name}
                  onChange={handleChange}
                  placeholder="Nike Air Max"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={shoeData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Shoes">Shoes</option>
                  <option value="Chapal">Chapal</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Watches">Watches</option>
                  <option value="Caps">Caps</option>
                </select>
              </div>

              <div className="form-group">
                <label>Gender</label>

                <select
                  name="gender"
                  value={shoeData.gender}
                  onChange={handleChange}
                >
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                  <option value="KID">Kids</option>
                </select>
              </div>

              <div className="form-group">
                <label>Popular Product</label>

                <select
                  name="popular"
                  value={shoeData.popular}
                  onChange={handleChange}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  value={shoeData.price}
                  onChange={handleChange}
                  placeholder="4500"
                  required
                />
              </div>

              <div className="form-group">
                <label>Discount (%)</label>

                <input
                  type="number"
                  name="discount"
                  value={shoeData.discount}
                  onChange={handleChange}
                  placeholder="10"
                />
              </div>

              {showSizeField && (
                <div className="form-group">
                  <label>Sizes</label>

                  <input
                    type="text"
                    name="sizes"
                    value={shoeData.sizes}
                    onChange={handleChange}
                    placeholder={sizePlaceholder}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Offer Price</label>

                <input
                  type="number"
                  name="offerPrice"
                  value={shoeData.offerPrice}
                  onChange={handleChange}
                  placeholder="3500"
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "30px",
                margin: "20px 0",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={shoeData.isNewArrival}
                  onChange={(e) =>
                    setShoeData({
                      ...shoeData,
                      isNewArrival: e.target.checked,
                    })
                  }
                />{" "}
                New Arrival
              </label>

              <label>
                <input
                  type="checkbox"
                  name="isOffer"
                  checked={shoeData.isOffer}
                  onChange={handleChange}
                />{" "}
                Offer
              </label>
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={shoeData.description}
                onChange={handleChange}
                placeholder="Write product description..."
                required
              />
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
