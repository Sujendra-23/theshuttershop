import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          The Shutter Shop
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Home
          </Link>
          <Link
            to="/collection"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Collection
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Cart
          </Link>

          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium">
                <span>{userInfo.name}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
