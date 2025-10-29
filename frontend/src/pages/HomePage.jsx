import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

const HomePage = () => {
  const dispatch = useDispatch();

  // Fetch products from Redux store
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((product) => product.isFeatured)
            .map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
