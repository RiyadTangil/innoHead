const Form = require('../models/Form');
const User = require('../models/User');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getDashboardAnalytics = async (req, res) => {
  try {
    // Get form counts by status
    const statusCounts = await Form.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get form counts by type
    const typeCounts = await Form.aggregate([
      {
        $group: {
          _id: '$formType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get recent forms
    const recentForms = await Form.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get forms submitted in the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentFormCount = await Form.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });
    
    // Get forms by day for the last 7 days
    const formsByDay = await Form.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json({
      success: true,
      analytics: {
        statusCounts,
        typeCounts,
        recentForms,
        totalUsers,
        recentFormCount,
        formsByDay
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create admin user
// @route   POST /api/admin/create-admin
// @access  Private/Admin
exports.createAdminUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Create new admin user
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });
    
    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 