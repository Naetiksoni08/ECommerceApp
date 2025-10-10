import React from 'react';

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-white"
      style={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay to lighten image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="text-center" style={{ zIndex: 1, position: 'relative' }}>
        <header className="mb-4">
          <h3 className="mb-3">Shopping Cart</h3>
          <nav className="nav justify-content-center">
            <a className="nav-link text-white" href="/products">Products</a>
            <a className="nav-link text-white" href="/login">Login</a>
            <a className="nav-link text-white" href="/register">Register</a>
          </nav>
        </header>

        <main>
          <h1 className="display-4 fw-bold">Shopping Cart</h1>
          <p className="lead">
            Welcome to Shopping Cart! <br />
            Jump right in and explore our many products. <br />
            Feel free to add some of your own and comment on others!
          </p>
          <a href="/products" className="btn btn-lg btn-primary mt-3">
            View Products
          </a>
        </main>

        <footer className="mt-5 text-white-50">
          <p>All Rights Reserved &copy; E-Commerce 2025</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
