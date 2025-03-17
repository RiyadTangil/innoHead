const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');
const { registerValidation, checkValidation } = require('../middleware/validators');

// @route   GET /api/admin/analytics
// @desc    Get dashboard analytics
// @access  Private/Admin
router.get('/analytics', authenticate, isAdmin, adminController.getDashboardAnalytics);

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/users', authenticate, isAdmin, adminController.getUsers);

// @route   POST /api/admin/create-admin
// @desc    Create admin user
// @access  Private/Admin
router.post('/create-admin', authenticate, isAdmin, registerValidation, checkValidation, adminController.createAdminUser);

module.exports = router; 