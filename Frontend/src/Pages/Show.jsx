import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";


const ShowProducts = () => {

  const { id } = useParams();

  //states
  const [product, SetProduct] = useState();
  const [newText, setnewText] = useState();
  const [newRating, setNewRating] = useState(5);
  const [reviews, SetReviews] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:5001/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => SetProduct(res.data.data))
      .catch(err => console.log(err))

    axios.get(`http://localhost:5001/api/review/product/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => SetReviews(res.data.data || []))
      .catch(err => console.log(err));

  }, [id]);
  // product is dependent upon product id so we are saying react that whenever the id changes re fetch the product basically re run the use effect tho if u dont include id in the dependency array then also it will work normal and fine but it is a good practice so remember whenever ur product is dependent on something u should pass that thing in the dependency array




  const submitReview = () => {
    axios.post(`http://localhost:5001/api/review/product/${id}/reviews`,
      { text: newText, rating: newRating },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
      .then(res => {
        setnewText("");
        setNewRating(5);
        toast.success(res.data.message || "Review submitted successfully!");

        // Fetch latest reviews
        return axios.get(`http://localhost:5001/api/review/product/${id}/reviews`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      })
      .then(res => SetReviews(res.data.data || []))
      .catch(error => {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to submit review!");
      });
  }

  if (!product) {
    return <p className='text-center mt-50 text-2xl text-gray-500'>Loading product....</p>
  }




  const deleteReview = async (reviewId) => {
    try {
      const res = await axios.delete(`http://localhost:5001/api/review/product/${id}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const updatedReviews = reviews.filter((rev) => rev._id !== reviewId);
      SetReviews(updatedReviews);
      toast.success(res.data.message || "Review deleted successfully!");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review!");

    }
  }



  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:5001/api/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      toast.success(data.message || "Product deleted successfully!");
      navigate("/product");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product!");
    }
  }

  const handleBuyNow = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/payment/order", {
        amount: product.price
      },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      const order = data.data;
      const options = {
        key: "rzp_test_RUTxFqCzlLGV4C",
        amount: order.amount,
        currency: order.currency,
        name: "My Shop",
        description: product.name,
        order_id: order.id,
        handler: function (response) {
          toast.success("Payment Successful!");
        },
        prefill: {
          name: "Naetik Soni",
          email: "naetik@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options)
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment Failed. Please try again");
    }

  };

  const CartSubmitHandler = async () => {
    try {
      const { data } = await axios.post("http://localhost:5001/api/cart/add", { productid: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });


      if (data && data.success) {
        toast.success("Product Added To Cart");
      } else {
        toast.error(data?.message || "Failed to add to cart");
      }


      navigate("/product");
    } catch (error) {
      toast.warn(error.response?.data?.message || "Failed to add to cart");

    }
  }


  return (
    <div className="flex ml-40 md:justify-items-start mt-30 gap-50">

      {/* Left part */}
      <div className="card bg-base-100 w-full md:w-1/3 shadow-xl h-1/2">
        <figure>
          <img
            src={product.Image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt={product.name}
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <h2 className="card-title">₹{product.price}</h2>
          <p>{product.description}</p>

          <div className="card-actions justify-end mx-auto">
            <button className="btn btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>

            <button className="btn btn-secondary" onClick={CartSubmitHandler}>
              Add to Cart
            </button>

            <button
              className="btn btn-accent"
              onClick={() => navigate(`/product/edit/${id}`)}
            >
              Edit
            </button>

            <button
              className="btn btn-warning"
              onClick={() => deleteProduct()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Right part */}
      <div className="ml-10 w-1/2">
        <h1 className="text-2xl font-bold mb-5">Leave a Review</h1>
        <ReactStars
          count={5}
          value={newRating}
          onChange={(newValue) => {
            console.log("New rating:", newValue);
            setNewRating(newValue);
          }}
          size={40}
          isHalf={true}
          edit={true}
          activeColor="#facc15"
          color="#4b5563"
          emptyIcon={<i className="far fa-star" />}
          halfIcon={<i className="fa fa-star-half-alt" />}
          filledIcon={<i className="fa fa-star" />}
        />
        <textarea
          className="textarea mt-5"
          rows={3}
          placeholder="Write your review..."
          value={newText}
          onChange={(e) => setnewText(e.target.value)}
        ></textarea>

        <button
          onClick={submitReview}
          className="btn btn-primary block mt-4"
        >
          Submit
        </button>

        <h2 className="text-xl font-bold mt-10 mb-3">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((rev, index) => (
            <div
              key={index}
              className="p-2 rounded-lg mb-5 bg-gray-900 w-80 shadow-lg"
            >
              <div className="flex items-center gap-2">
                {/* ⭐ Display review stars */}
                <div className="flex items-center gap-2">
                  <ReactStars
                    count={5}
                    value={rev.rating}
                    edit={false}
                    size={20}
                    isHalf={true}
                    activeColor="#facc15"
                    color="#4b5563"
                    emptyIcon={<i className="far fa-star" />}
                    halfIcon={<i className="fa fa-star-half-alt" />}
                    filledIcon={<i className="fa fa-star" />}
                  />
                </div>
              </div>
              <p className="mt-1 text-white">{rev.text}</p>

              <button
                className="rounded-xl text-sm bg-red-900 p-3 mt-3 cursor-pointer"
                onClick={() => deleteReview(rev._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowProducts;