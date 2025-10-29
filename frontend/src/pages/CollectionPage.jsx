import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';

const CollectionPage = () => {
  const dispatch = useDispatch();

  // State for categories (could also fetch from backend)
  const [categories, setCategories] = useState([
    'Photography',
    'Frames',
    'Memorabilia',
    'Accessories',
  ]);

  // Redux state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Fetch products
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="md:w-64">
        <FilterSidebar categories={categories} />
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Collection</h1>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
