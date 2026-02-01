import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../app/slices/authSlice';
import toast from 'react-hot-toast';
import { CiLight, CiDark, CiMenuBurger } from 'react-icons/ci';


import { CiSearch } from "react-icons/ci";



const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
      { credentials: 'include' }
    );
    const data = await res.json();
    if (data.success) {
      dispatch(setUser(null));
      toast.success(data.message);
      navigate('/login');
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 shadow-md ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          🛒 ShoppingCart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link className="hover:text-blue-500" to="/">Home</Link>
          <Link className="hover:text-blue-500" to="/products">Products</Link>

          {/* Search Bar */}
<div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[420px]">
  <input
    type="text"
    placeholder="What are you looking for?"
    className="bg-transparent outline-none flex-1 text-sm"
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        navigate(`/products?search=${e.target.value}&category=All`);
      }
    }}
  />

  {/* Category Dropdown */}
  <select
    className="bg-transparent outline-none text-sm cursor-pointer mr-2"
    onChange={(e) => {
      navigate(`/products?search=&category=${e.target.value}`);
    }}
  >
    <option value="All">All</option>
    <option value="beauty">Beauty</option>
    <option value="fragrances">Fragrances</option>
    <option value="furniture">Furniture</option>
    <option value="groceries">Groceries</option>
  </select>

  <CiSearch size={20} className="text-pink-500 cursor-pointer" />
</div>


          {user ? (
            <>
              {/* <Link className="hover:text-blue-500" to="/cart">Cart</Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Logout
              </button> */}

              <Link className="hover:text-blue-500" to="/cart">Cart</Link>

{/* PROFILE IMAGE + DROPDOWN */}
<div className="relative">
 <img
  src={
    user?.image
      ? `${import.meta.env.VITE_SERVER_URL}${user.image}`
      : "https://i.pravatar.cc/150"
  }
  alt="profile"
  className="w-9 h-9 rounded-full cursor-pointer border object-cover"
  onClick={() => setShowProfileMenu(!showProfileMenu)}
/>


  {showProfileMenu && (
<>
     <div
        className="fixed inset-0 z-40"
        onClick={() => setShowProfileMenu(false)}
      ></div>

    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
      <button
        onClick={() => {
          setShowProfileMenu(false);
          navigate("/profile");
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        View Profile
      </button>

      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
      >
        Logout
      </button>
    </div>
    </>
  )}
</div>

            </>
          ) : (
            <>
              <Link className="hover:text-blue-500" to="/login">Login</Link>
              <Link
                className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <CiLight size={24} /> : <CiDark size={24} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CiMenuBurger size={26} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden px-6 py-4 space-y-3 ${
            isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          <Link onClick={() => setIsOpen(false)} to="/">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/products">Products</Link>

          {user ? (
            <>
              <Link onClick={() => setIsOpen(false)} to="/cart">Cart</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-1 bg-red-500 text-white rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link onClick={() => setIsOpen(false)} to="/login">Login</Link>
              <Link onClick={() => setIsOpen(false)} to="/register">Register</Link>
            </>
          )}

          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <CiLight size={24} /> : <CiDark size={24} />}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
