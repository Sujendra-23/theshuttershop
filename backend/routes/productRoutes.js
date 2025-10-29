const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Optional: import auth middleware if you add authentication
// const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/products
// @desc    Get all products (with optional filters)
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/', /* protect, admin, */ createProduct);

// @route   PUT /api/products/:id
// @desc    Update an existing product
// @access  Private/Admin
router.put('/:id', /* protect, admin, */ updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', /* protect, admin, */ deleteProduct);

module.exports = router;
