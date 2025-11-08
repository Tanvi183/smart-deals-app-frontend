import React, { useState } from "react";
// import { AtuhContext } from "../../contexts/AuthContext";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateProduct = () => {
  const { setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    title: "",
    price_min: "",
    price_max: "",
    email: "",
    category: "",
    created_at: new Date().toISOString(), // automatically set timestamp
    image: "",
    status: "pending", // default pending
    location: "",
    seller_image: "",
    seller_name: "",
    condition: "brandnew",
    usage: "",
    description: "",
    seller_contact: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to backend
      const response = await axiosSecure.post("/products", formData);
      console.log("Server Response:", response.data);

      // Reset form after submission
      setFormData({
        title: "",
        price_min: "",
        price_max: "",
        email: "",
        category: "",
        created_at: new Date().toISOString(),
        image: "",
        status: "pending",
        location: "",
        seller_image: "",
        seller_name: "",
        condition: "brandnew",
        usage: "",
        description: "",
        seller_contact: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }

    // try {
    //   // Send data to backend
    //   const response = await axios.post(
    //     "http://localhost:3000/products",
    //     formData
    //   );
    //   console.log("Server Response:", response.data);

    //   // Reset form after submission
    //   setFormData({
    //     title: "",
    //     price_min: "",
    //     price_max: "",
    //     email: "",
    //     category: "",
    //     created_at: new Date().toISOString(),
    //     image: "",
    //     status: "pending",
    //     location: "",
    //     seller_image: "",
    //     seller_name: "",
    //     condition: "brandnew",
    //     usage: "",
    //     description: "",
    //     seller_contact: "",
    //   });
    // } catch (error) {
    //   console.error("Error creating product:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        <button className="text-gray-500 text-sm mb-3 hover:text-gray-700">
          ← Back To Products
        </button>
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create <span className="text-purple-500">A Product</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Music">Music</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price_min"
              placeholder="Minimum Price ($)"
              value={formData.price_min}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="number"
              name="price_max"
              placeholder="Maximum Price ($)"
              value={formData.price_max}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Condition */}
          <div className="flex items-center gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="condition"
                value="brandnew"
                checked={formData.condition === "brandnew"}
                onChange={handleChange}
              />
              <span>Brand New</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="condition"
                value="used"
                checked={formData.condition === "used"}
                onChange={handleChange}
              />
              <span>Used</span>
            </label>
          </div>

          {/* Usage */}
          <input
            type="text"
            name="usage"
            placeholder="Usage duration (e.g. 8 months old)"
            value={formData.usage}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
          />

          {/* Product Image */}
          <input
            type="url"
            name="image"
            placeholder="Product Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
          />

          {/* Seller Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="seller_name"
              placeholder="Seller Name"
              value={formData.seller_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Seller Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="seller_contact"
              placeholder="Seller Contact"
              value={formData.seller_contact}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="url"
              name="seller_image"
              placeholder="Seller Image URL"
              value={formData.seller_image}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="City, Country"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md hover:opacity-90 transition"
          >
            Create A Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
