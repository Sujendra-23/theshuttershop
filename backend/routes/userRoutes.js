const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

// Optional: import auth middleware if you add authentication
// const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authUser);

// @route   GET /api/users/profile
// @desc    Get logged-in user's profile
// @access  Private
router.get('/profile', /* protect, */ getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update logged-in user's profile
// @access  Private
router.put('/profile', /* protect, */ updateUserProfile);

module.exports = router;
