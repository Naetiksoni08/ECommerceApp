import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'




const ShowProducts = () => {

  const { id } = useParams();

  const [product, SetProduct] = useState();
  const [newText, setnewText] = useState();
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    // setTimeout(() => { // to test loading product
    axios.get(`http://localhost:5001/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => SetProduct(res.data.data))
      .catch(err => console.log(err))
    // },3000);
  }, [id]); // product is dependent upon product id so we are saying react that whenever the id changes re fetch the product basically re run the use effect tho if u dont include id in the dependency array then also it will work normal and fine but it is a good practice so remember whenever ur product is dependent on something u should pass that thing in the dependency array


  const submitReview = () => {
    axios.post(`http://localhost:5001/api/review/products/${id}/reviews`,
      { text: newText, rating: newRating },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
      .then(res => {
        alert("Review submitted!");
        setnewText("");
        setNewRating(5);
      })
      .catch(err => console.log(err));
  }

  if (!product) {
    return <p className='text-center mt-50 text-2xl text-gray-500'>Loading product....</p>
  }

  return (
    <div className="flex ml-40 md:justify-items-start mt-30">
      <div className="card bg-base-100 w-full md:w-1/3  shadow-sm">
        <figure>
          <img src={product.Image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} alt={product.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <h2 className="card-title">₹{product.price}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="ml-10 w-1/2 ">
        <h1 className="text-2xl font-bold mb-2">Leave a Review</h1>

        <fieldset class="starability-basic">
                    <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked aria-label="No rating." />
                    <input type="radio" id="first-rate1" name="rating" value="1" />
                    <label for="first-rate1" title="Terrible">1 star</label>
                    <input type="radio" id="first-rate2" name="rating" value="2" />
                    <label for="first-rate2" title="Not good">2 stars</label>
                    <input type="radio" id="first-rate3" name="rating" value="3" />
                    <label for="first-rate3" title="Average">3 stars</label>
                    <input type="radio" id="first-rate4" name="rating" value="4" />
                    <label for="first-rate4" title="Very good">4 stars</label>
                    <input type="radio" id="first-rate5" name="rating" value="5" />
                    <label for="first-rate5" title="Amazing">5 stars</label>
                  </fieldset>  
      </div>
    </div>
  )
}

export default ShowProducts