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
    price: "",
    discount: "",
    sizes: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = "http://localhost:4000";

  const handleChange = (e) => {
    setShoeData({
      ...shoeData,
      [e.target.name]: e.target.value,
    });
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
      formData.append("price", shoeData.price);
      formData.append("discount", shoeData.discount);
      formData.append("sizes", shoeData.sizes);
      formData.append("description", shoeData.description);
      formData.append("image", image);

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
          price: "",
          discount: "",
          sizes: "",
          description: "",
        });

        setImage(null);
        setPreview("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add shoe.");
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

            <div className="image-upload">

              <label>Product Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
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

              <div className="form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={shoeData.category}
                  onChange={handleChange}
                >
                  <option>Sneakers</option>
                  <option>Sports</option>
                  <option>Loafers</option>
                  <option>Formal</option>
                  <option>Boots</option>
                  <option>Sandals</option>
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

              <div className="form-group">
                <label>Sizes</label>

                <input
                  type="text"
                  name="sizes"
                  value={shoeData.sizes}
                  onChange={handleChange}
                  placeholder="39,40,41,42,43"
                />
              </div>

            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={shoeData.description}
                onChange={handleChange}
                placeholder="Write shoe description..."
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
  );
};

export default AddShoe;