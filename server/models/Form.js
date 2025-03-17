const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ['contact', 'newsletter', 'quote', 'support']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: function() {
      return ['contact', 'support', 'quote'].includes(this.formType);
    }
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
FormSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Form', FormSchema); 