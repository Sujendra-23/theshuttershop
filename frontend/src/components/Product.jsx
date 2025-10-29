import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      </Link>

      {/* Product Name */}
      <Link to={`/product/${product._id}`}>
        <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
          {product.name}
        </h2>
      </Link>

      {/* Product Price */}
      <p className="text-gray-700 font-bold mb-2">${product.price.toFixed(2)}</p>

      {/* Stock Status */}
      <p className={`mb-4 ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
      </p>

      {/* View Details Button */}
      <Link
        to={`/product/${product._id}`}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default Product;
