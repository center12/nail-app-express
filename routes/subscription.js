const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const { authenticate, authorize } = require('../middleware/auth');

// Create a new subscription
router.post('/', async (req, res) => {
  try {
    const subscription = new Subscription({
      ...req.body,
    });
    
    await subscription.save();
    
    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating subscription',
      error: error.message
    });
  }
});

// Get all subscriptions (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscriptions',
      error: error.message
    });
  }
});

// Get subscription by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    // Check if user is admin or the creator of the subscription
    if (req.user.role !== 'admin' && subscription.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this subscription'
      });
    }
    
    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscription',
      error: error.message
    });
  }
});

// Update subscription
router.put('/:id', authenticate, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    // Check if user is admin or the creator of the subscription
    if (req.user.role !== 'admin' && subscription.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this subscription'
      });
    }
    
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedSubscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating subscription',
      error: error.message
    });
  }
});

// Delete subscription
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    // Check if user is admin or the creator of the subscription
    if (req.user.role !== 'admin' && subscription.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this subscription'
      });
    }
    
    await subscription.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting subscription',
      error: error.message
    });
  }
});

// Update subscription status (admin only)
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'inactive', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating subscription status',
      error: error.message
    });
  }
});

module.exports = router; 