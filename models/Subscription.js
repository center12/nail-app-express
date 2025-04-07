const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    trim: true
  },
  postcode: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription; 