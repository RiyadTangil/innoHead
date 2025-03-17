const { body, validationResult } = require('express-validator');

// Middleware to check validation results
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Validation rules for user registration
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Validation rules for user login
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

// Validation rules for contact form
exports.contactFormValidation = [
  body('formType')
    .trim()
    .notEmpty().withMessage('Form type is required')
    .isIn(['contact', 'newsletter', 'quote', 'support']).withMessage('Invalid form type'),
  
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  
  body('message')
    .trim()
    .custom((value, { req }) => {
      if (['contact', 'support', 'quote'].includes(req.body.formType) && !value) {
        throw new Error('Message is required for this form type');
      }
      return true;
    })
]; 