import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">The Shutter Shop</h2>
          <p className="text-gray-400">
            Your one-stop shop for high-quality photography and memorabilia products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-white transition-colors">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">Contact Us</h2>
          <p className="text-gray-400">Email: support@theshuttershop.com</p>
          <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
          <p className="text-gray-400">Address: 123 Photography St, City, Country</p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} The Shutter Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
