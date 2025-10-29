import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart?productId=${id}&qty=${qty}`);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {loading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
              alt={product.name}
              className="w-full h-96 object-cover rounded"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className={`mb-4 ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>

            {product.countInStock > 0 && (
              <div className="mb-4">
                <label className="mr-2 font-medium">Quantity:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border px-2 py-1 rounded"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors ${
                product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
