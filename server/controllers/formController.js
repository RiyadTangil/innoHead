const Form = require('../models/Form');

// @desc    Submit a new form
// @route   POST /api/forms
// @access  Public
exports.submitForm = async (req, res) => {
  try {
    const { formType, name, email, phone, company, message } = req.body;
    
    // Create new form submission
    const form = await Form.create({
      formType,
      name,
      email,
      phone,
      company,
      message
    });
    
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      form
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all forms (for admin)
// @route   GET /api/forms
// @access  Private/Admin
exports.getForms = async (req, res) => {
  try {
    const { status, formType, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (formType) query.formType = formType;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get forms with pagination
    const forms = await Form.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    // Get total count
    const total = await Form.countDocuments(query);
    
    res.json({
      success: true,
      count: forms.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      forms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get form by ID
// @route   GET /api/forms/:id
// @access  Private/Admin
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }
    
    res.json({
      success: true,
      form
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update form status
// @route   PUT /api/forms/:id
// @access  Private/Admin
exports.updateFormStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const form = await Form.findById(req.params.id);
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }
    
    form.status = status;
    await form.save();
    
    res.json({
      success: true,
      message: 'Form status updated successfully',
      form
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 