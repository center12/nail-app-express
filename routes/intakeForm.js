const express = require('express');
const router = express.Router();
const IntakeForm = require('../models/IntakeForm');
const { authenticate, authorize } = require('../middleware/auth');

// Create a new intake form
router.post('/', authenticate, async (req, res) => {
  try {
    const intakeForm = new IntakeForm({
      ...req.body,
      createdBy: req.user.id
    });
    
    await intakeForm.save();
    
    res.status(201).json({
      success: true,
      data: intakeForm
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating intake form',
      error: error.message
    });
  }
});

// Get all intake forms (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const intakeForms = await IntakeForm.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: intakeForms.length,
      data: intakeForms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching intake forms',
      error: error.message
    });
  }
});

// Get intake form by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const intakeForm = await IntakeForm.findById(req.params.id);
    
    if (!intakeForm) {
      return res.status(404).json({
        success: false,
        message: 'Intake form not found'
      });
    }
    
    // Check if user is admin or the creator of the form
    if (req.user.role !== 'admin' && intakeForm.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this intake form'
      });
    }
    
    res.status(200).json({
      success: true,
      data: intakeForm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching intake form',
      error: error.message
    });
  }
});

// Update intake form
router.put('/:id', authenticate, async (req, res) => {
  try {
    const intakeForm = await IntakeForm.findById(req.params.id);
    
    if (!intakeForm) {
      return res.status(404).json({
        success: false,
        message: 'Intake form not found'
      });
    }
    
    // Check if user is admin or the creator of the form
    if (req.user.role !== 'admin' && intakeForm.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this intake form'
      });
    }
    
    const updatedIntakeForm = await IntakeForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedIntakeForm
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating intake form',
      error: error.message
    });
  }
});

// Delete intake form
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const intakeForm = await IntakeForm.findById(req.params.id);
    
    if (!intakeForm) {
      return res.status(404).json({
        success: false,
        message: 'Intake form not found'
      });
    }
    
    // Check if user is admin or the creator of the form
    if (req.user.role !== 'admin' && intakeForm.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this intake form'
      });
    }
    
    await intakeForm.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting intake form',
      error: error.message
    });
  }
});

module.exports = router; 