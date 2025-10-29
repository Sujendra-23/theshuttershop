const Product = require('../models/productModel');

/**
 * @desc    Fetch all products (supports filtering, searching, sorting)
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search, sort } = req.query;

    // Build query filter
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    // Sorting (default: newest first)
    let sortOption = { createdAt: -1 };
    if (sort === 'price_low_to_high') sortOption = { price: 1 };
    if (sort === 'price_high_to_low') sortOption = { price: -1 };

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    next(err);
  }
};

/**
 * @desc    Fetch single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    next(err);
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, countInStock, category, images } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = new Product({
      name,
      description,
      price,
      countInStock: countInStock || 0,
      category,
      images: images || [],
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    next(err);
  }
};

/**
 * @desc    Update an existing product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, countInStock, category, images } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.countInStock = countInStock ?? product.countInStock;
    product.category = category ?? product.category;
    product.images = images ?? product.images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    next(err);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    next(err);
  }
};
