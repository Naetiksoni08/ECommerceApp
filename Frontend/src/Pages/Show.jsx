import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const ShowProducts = () => {

  const { id } = useParams();

  const [product, SetProduct] = useState();
  const [newText, setnewText] = useState();
  const [newRating, setNewRating] = useState(5);
  const [reviews, SetReviews] = useState([]);
  const navigate = useNavigate();


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

    axios.get(`http://localhost:5001/api/review/product/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => SetReviews(res.data.data || []))
      .catch(err => console.log(err));

  }, [id]); // product is dependent upon product id so we are saying react that whenever the id changes re fetch the product basically re run the use effect tho if u dont include id in the dependency array then also it will work normal and fine but it is a good practice so remember whenever ur product is dependent on something u should pass that thing in the dependency array





  const submitReview = () => {
    axios.post(`http://localhost:5001/api/review/product/${id}/reviews`,
      { text: newText, rating: newRating },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
      .then(res => {
        // alert("Review submitted!");
        setnewText("");
        setNewRating(5);


        return axios.get(`http://localhost:5001/api/review/product/${id}/reviews`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      })
      .then(res => SetReviews(res.data.data || []))
      .catch(err => console.log(err));
  }

  if (!product) {
    return <p className='text-center mt-50 text-2xl text-gray-500'>Loading product....</p>
  }


  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5001/api/review/product/${id}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const updatedReviews = reviews.filter((rev) => rev._id !== reviewId);
      SetReviews(updatedReviews);

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="flex ml-40 md:justify-items-start mt-30 gap-50">
      {/* left part */}
      <div className="card bg-base-100 w-full md:w-1/3 shadow-xl h-1/2">
        <figure>
          <img src={product.Image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} alt={product.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <h2 className="card-title">₹{product.price}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end mx-auto">
            <button className="btn btn-primary">Buy Now</button>
            <button className="btn btn-secondary">Add to Cart</button>
            <button className="btn btn-accent" onClick={()=>navigate(`/product/edit/${id}`)}>Edit</button>
            <button className="btn btn-warning">Delete</button>

          </div>
        </div>

      </div>

      {/* right part */}
      <div className="ml-10 w-1/2 ">
        <h1 className="text-2xl font-bold mb-5">Leave a Review</h1>

        <div className="starability-basic">
          <input type="radio" id="rate5" name="rating" value="5" onChange={(e) => setNewRating(Number(e.target.value))} />
          <label htmlFor="rate5" title="Amazing">5 stars</label>

          <input type="radio" id="rate4" name="rating" value="4" onChange={(e) => setNewRating(Number(e.target.value))} />
          <label htmlFor="rate4" title="Very good">4 stars</label>

          <input type="radio" id="rate3" name="rating" value="3" onChange={(e) => setNewRating(Number(e.target.value))} />
          <label htmlFor="rate3" title="Average">3 stars</label>

          <input type="radio" id="rate2" name="rating" value="2" onChange={(e) => setNewRating(Number(e.target.value))} />
          <label htmlFor="rate2" title="Not good">2 stars</label>

          <input type="radio" id="rate1" name="rating" value="1" onChange={(e) => setNewRating(Number(e.target.value))} />
          <label htmlFor="rate1" title="Terrible">1 star</label>
        </div>
        <textarea
          className='textarea mt-5' rows={3} placeholder="Write your review..." value={newText} onChange={(e) => setnewText(e.target.value)}>
        </textarea>

        <button onClick={submitReview} className='btn btn-primary block mt-4'>Submit</button>


        <h2 className="text-xl font-bold mt-10 mb-3">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} className="p-2 rounded-lg mb-5 bg-gray-900 w-80 shadow-lg">
              <div className="flex items-center gap-2">
                <p className="text-yellow-700">⭐ {rev.rating}</p>
              </div>
              <p className=" mt-1 text-white">{rev.text}</p>
              <button className='rounded-xl text-sm bg-red-900 p-3 mt-3 cursor-pointer' onClick={() => deleteReview(rev._id)}>Delete</button>
            </div>

          ))
        )}

      </div>

    </div>
  )
}

export default ShowProducts

//buy now 
//add to cart
//delete//edit