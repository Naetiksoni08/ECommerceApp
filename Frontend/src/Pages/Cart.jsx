import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);


    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/cart", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setCartItems(res.data.data || []);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch cart");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);



    const handleRemove = async (productid) => {
        try {
            const { data } = await axios.delete(`http://localhost:5001/api/cart/removed/${productid}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (data && data.success) {
                toast.success("Removed from cart");
                await fetchCart();
            } else {
                toast.error(data?.message || "Failed to remove");
            }

            setCartItems(cartItems.filter(item => item._id !== productid));
            await fetchCart();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove");
        }
    }
    return (
        <div className="mt-30 flex flex-col items-center gap-6 ">
            {!cartItems || cartItems.length === 0 ? (
                <p className="text-xl font-semibold">Your cart is empty</p>
            ) : (
                cartItems.map(item => (
                    <div key={item._id} className="flex w-2/3 bg-dark shadow-md rounded-lg overflow-hidden">
                        {/* Product Image */}
                        <div className="w-1/4">
                            <img
                                src={item.Image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                                alt={item.name}
                                className="object-cover h-full w-full"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="w-3/4 p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">{item.name}</h2>
                                <p className="text-gray-600 mt-1">₹{item.price}</p>
                                <p className="text-gray-600 mt-2">{item.description}</p>
                            </div>

                            {/* Action Button */}
                            <div className="mt-4">
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};


export default Cart