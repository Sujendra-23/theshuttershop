import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const FilterSidebar = ({ categories }) => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleFilter = () => {
    dispatch(listProducts(selectedCategory, searchTerm, sortOption));
  };

  return (
    <aside className="w-full md:w-64 bg-white border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Options */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="price_high_to_low">Price: High to Low</option>
        </select>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleFilter}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
