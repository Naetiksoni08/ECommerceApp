import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';




const Edit = () => {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    Image: "",
    description: "",
  });


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5001/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);

      }
    };
    fetchProduct();
  }, [id]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
     const res =  await axios.put(`http://localhost:5001/api/product/${id}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
      navigate("/product");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "Failed to update product!");

    }
  }

  return (
    <form className="flex justify-center items-start min-h-screen" onSubmit={handleSubmit}>
      <fieldset className="mt-40 mx-auto fieldset bg-gray-800 border-base-300 rounded-box w-1/3 shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>

        <label className="label p-2 text-sm">Product Name</label>
        <input type="text" className="input w-full" name="name" value={product.name} onChange={handlechange} required />

        <label className="label p-2 text-sm">Product Price</label>
        <input type="number" className="input w-full" name="price" value={product.price} onChange={handlechange} required />

        <label className="label p-2 text-sm">Product Image</label>
        <input type="text" className="input w-full" name="Image" value={product.Image} onChange={handlechange} required />

        <label className="label p-2 text-sm">Product Description</label>

        <textarea className="textarea w-full" name="description" value={product.description} onChange={handlechange} />


        <button type="submit" className="btn btn-neutral mt-4 w-full">Edit Product</button>

      </fieldset>
    </form>
  )
}

export default Edit