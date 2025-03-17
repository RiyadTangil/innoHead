const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { authenticate, isAdmin } = require('../middleware/auth');
const { contactFormValidation, checkValidation } = require('../middleware/validators');

// @route   POST /api/forms
// @desc    Submit a new form
// @access  Public
router.post('/', contactFormValidation, checkValidation, formController.submitForm);

// @route   GET /api/forms
// @desc    Get all forms (admin only)
// @access  Private/Admin
router.get('/', authenticate, isAdmin, formController.getForms);

// @route   GET /api/forms/:id
// @desc    Get form by ID
// @access  Private/Admin
router.get('/:id', authenticate, isAdmin, formController.getFormById);

// @route   PUT /api/forms/:id
// @desc    Update form status
// @access  Private/Admin
router.put('/:id', authenticate, isAdmin, formController.updateFormStatus);

module.exports = router; 