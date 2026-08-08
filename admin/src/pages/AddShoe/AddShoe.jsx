import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./AddShoe.css";

const AddShoe = () => {
  const [shoeData, setShoeData] = useState({
    name: "",
    category: "Sneakers",
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

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = "http://localhost:4000";

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setShoeData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
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
      formData.append("sizes", shoeData.sizes);
      formData.append("description", shoeData.description);
      formData.append("image", image);
   formData.append("isNewArrival", shoeData.isNewArrival);

formData.append(
  "isOffer",
  shoeData.isOffer ? "true" : "false"
);
formData.append("offerPrice", shoeData.offerPrice);

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
        alert("Shoe added successfully!");

        setShoeData({
          name: "",
          category: "Sneakers",
          gender: "MEN",
          popular: "false",
          price: "",
          discount: "",
          sizes: "",
          description: "",
          isNewArrival: "false",
          isOffer: "false",
          offerPrice: "",
        });

        setImage(null);
        setPreview("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="addshoe-page">
    <Sidebar />
    <Navbar />

    <div className="addshoe-content">
      <div className="addshoe-card">
        <h2>Add New Shoe</h2>

        <form onSubmit={handleSubmit}>
          {/* Product Image */}
          <div className="image-upload">
            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="form-grid">

            {/* Shoe Name */}
            <div className="form-group">
              <label>Shoe Name</label>

              <input
                type="text"
                name="name"
                value={shoeData.name}
                onChange={handleChange}
                placeholder="Nike Air Max"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={shoeData.category}
                onChange={handleChange}
              >
                <option value="Sneakers">Sneakers</option>
                <option value="Sports">Sports</option>
                <option value="Loafers">Loafers</option>
                <option value="Formal">Formal</option>
                <option value="Boots">Boots</option>
                <option value="Sandals">Sandals</option>
              </select>
            </div>

            {/* Gender */}
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

            {/* Popular */}
            <div className="form-group">
              <label>Popular Shoe</label>

              <select
                name="popular"
                value={shoeData.popular}
                onChange={handleChange}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            {/* Price */}
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

            {/* Discount */}
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

            {/* Sizes */}
            <div className="form-group">
              <label>Sizes</label>

              <input
                type="text"
                name="sizes"
                value={shoeData.sizes}
                onChange={handleChange}
                placeholder="39,40,41,42,43"
                required
              />
            </div>

            {/* Offer Price */}
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

          {/* Checkboxes */}
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
        isNewArrival: e.target.checked
      })
    }
  />

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

          {/* Description */}
          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={shoeData.description}
              onChange={handleChange}
              placeholder="Write shoe description..."
              required
            />
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding Shoe..." : "Add Shoe"}
          </button>
        </form>
      </div>
    </div>
  </div>
)
};

export default AddShoe;