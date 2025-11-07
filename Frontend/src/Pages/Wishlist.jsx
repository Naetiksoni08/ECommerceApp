import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Wishlist = ({ fetchWishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWishlistItems(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load wishlist");
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/wishlist/remove/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWishlistItems(prev => prev.filter(item => item._id !== id));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove");
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-6">
      {wishlistItems.length === 0 ? (
        <p className="text-xl font-semibold">Your wishlist is empty</p>
      ) : (
        wishlistItems.map(item => (
          <div key={item._id} className="flex w-2/3 bg-dark shadow-md rounded-lg overflow-hidden">
            <div className="w-1/4">
              <img src={item.Image} alt={item.name} className="object-cover h-full w-full" />
            </div>
            <div className="w-3/4 p-4 flex flex-col justify-between">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="text-gray-600 mt-1">₹{item.price}</p>
              <div className="mt-4 flex gap-3">
                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleRemove(item._id)}>Remove</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
