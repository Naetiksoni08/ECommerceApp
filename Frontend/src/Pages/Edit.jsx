import React, { useState } from "react";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting product:", product);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Product Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
            Product Price
          </label>
          <input
            name="price"
            type="number"
            id="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
            Product Image
          </label>
          <input
            name="image"
            type="text"
            id="image"
            value={product.image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Product Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-medium py-2 px-4 rounded transition-colors"
          // hover:bg-primary-400
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
