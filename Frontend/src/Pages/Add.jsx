import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Add = () => {

 const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    Image: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");


      if (!token) {
        console.log("No token found — user not logged in");
        return;
      }
  
      const response = await axios.post("http://localhost:5001/api/product", product, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      console.log("Product added:", response.data);
      navigate("/product");

      setProduct({ name: '', price: '', Image: '', description: '' }); // empty the state

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form className="flex justify-center items-start min-h-screen bg-gray-20" onSubmit={handleSubmit}>
      <fieldset className="mt-40 mx-auto fieldset bg-gray-800 border-base-300 rounded-box w-sm shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>

        <label className="label p-2 text-sm">Product Name</label>
        <input type="text" className="input" name="name" value={product.name} onChange={handleChange} required />

        <label className="label p-2 text-sm">Product Price</label>
        <input type="number" className="input" name="price" value={product.price} onChange={handleChange} required />

        <label className="label p-2 text-sm">Product Image</label>
        <input type="text" className="input" name="Image" value={product.Image} onChange={handleChange} required />

        <label className="label p-2 text-sm">Product Description</label>

        <textarea className="textarea" name="description" value={product.description} onChange={handleChange} />

      
        <button type="submit" className="btn btn-neutral mt-4 w-full">Add Product</button>
       
      </fieldset>
    </form>
  );
};

export default Add;