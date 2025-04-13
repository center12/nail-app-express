const express = require('express');
const router = express.Router();
const Waxing = require('../models/waxing');
const { authenticate, authorize } = require('../middleware/auth');

// Get all waxing services (public)
router.get('/', async (req, res) => {
    try {
        const waxingServices = await Waxing.find()
            .populate('category')
            .sort({ order: 1 });
        
        res.status(200).json({
            success: true,
            count: waxingServices.length,
            data: waxingServices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching waxing services',
            error: error.message
        });
    }
});

// Get waxing service by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const waxingService = await Waxing.findById(req.params.id).populate('category');
        
        if (!waxingService) {
            return res.status(404).json({
                success: false,
                message: 'Waxing service not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: waxingService
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching waxing service',
            error: error.message
        });
    }
});

// Create new waxing service (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const waxingService = new Waxing({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            order: req.body.order
        });

        await waxingService.save();
        
        res.status(201).json({
            success: true,
            data: waxingService
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating waxing service',
            error: error.message
        });
    }
});

// Update waxing service (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const waxingService = await Waxing.findById(req.params.id);
        
        if (!waxingService) {
            return res.status(404).json({
                success: false,
                message: 'Waxing service not found'
            });
        }

        const updatedWaxingService = await Waxing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: updatedWaxingService
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating waxing service',
            error: error.message
        });
    }
});

// Delete waxing service (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const waxingService = await Waxing.findById(req.params.id);
        
        if (!waxingService) {
            return res.status(404).json({
                success: false,
                message: 'Waxing service not found'
            });
        }

        await waxingService.deleteOne();
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting waxing service',
            error: error.message
        });
    }
});

module.exports = router; 