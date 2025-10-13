import React, { useState } from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Addproduct from './Pages/Add'
import EditProduct from './Pages/Edit'
import ListProduct from './Pages/ListProduct'
import ShowProducts from './Pages/Show'
import Footer from './Components/Footer'

const App = () => {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );

  return (
    <div className='flex-grow'>
      <Navbar username={username} />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register setUsername={setUsername} />} />
        <Route path='/login' element={<Login setUsername={setUsername} />} />
        <Route path='/product' element={<ListProduct />} />
        <Route path='/product/add' element={<Addproduct />} />
        <Route path='/product/:id/show' element={<ShowProducts />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />
      </Routes>
      <Footer />
    </div>
  )

}

export default App