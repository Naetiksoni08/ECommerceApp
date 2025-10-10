import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ListProduct = () => {

  const [products, Setproducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/product', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        Setproducts(res.data.data);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="flex flex-wrap gap-4 m-4 mt-20">
      {products.map((product) => (
        <div key={product._id} className="card bg-base-100 w-96 shadow-sm mx-auto">
          <figure>
            <img src={product.Image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p className="card-title">₹{product.price}</p>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
             <form action="/product/:id/show">
             <button className="btn btn-primary">Show</button>
             </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default ListProduct;