const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const { authenticate, authorize } = require('../middleware/auth');

// Get all services (public)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find()
            .populate('category')
            .sort({ order: 1 });
        
        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching services',
            error: error.message
        });
    }
});

// Get service by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('category');
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching service',
            error: error.message
        });
    }
});

// Create new service (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const service = new Service({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            order: req.body.order
        });

        await service.save();
        
        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating service',
            error: error.message
        });
    }
});

// Update service (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: updatedService
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating service',
            error: error.message
        });
    }
});

// Delete service (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        await service.deleteOne();
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting service',
            error: error.message
        });
    }
});

module.exports = router; 