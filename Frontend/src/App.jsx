import React, { useEffect, useState } from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Addproduct from './Pages/Add'
import Editproduct from './Pages/Edit'
import ListProduct from './Pages/ListProduct'
import ShowProducts from './Pages/Show'
import Footer from './Components/Footer'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from './Pages/Cart'
import axios from 'axios'

const App = () => {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
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
    fetchCart();
  }, []);



  return (
    <div className='flex-grow'>
      <Navbar username={username} cartItems={cartItems} />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register setUsername={setUsername} />} />
        <Route path='/login' element={<Login setUsername={setUsername} />} />
        <Route path='/product' element={<ListProduct />} />
        <Route path='/product/add' element={<Addproduct />} />
        <Route path="/product/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/product/:id/show' element={<ShowProducts />} />
        <Route path='/product/edit/:id' element={<Editproduct />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Footer />
    </div>
  )

}

export default App