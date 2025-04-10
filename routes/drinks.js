const express = require('express');
const router = express.Router();
const Drink = require('../models/drink');
const { authenticate, authorize } = require('../middleware/auth');

// Get all drinks (public)
router.get('/', async (req, res) => {
    try {
        const drinks = await Drink.find()
            .populate('category')
            .sort({ order: 1 });
        
        res.status(200).json({
            success: true,
            count: drinks.length,
            data: drinks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching drinks',
            error: error.message
        });
    }
});

// Get drink by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id).populate('category');
        
        if (!drink) {
            return res.status(404).json({
                success: false,
                message: 'Drink not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: drink
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching drink',
            error: error.message
        });
    }
});

// Create new drink (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const drink = new Drink({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            order: req.body.order
        });

        await drink.save();
        
        res.status(201).json({
            success: true,
            data: drink
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating drink',
            error: error.message
        });
    }
});

// Update drink (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);
        
        if (!drink) {
            return res.status(404).json({
                success: false,
                message: 'Drink not found'
            });
        }

        const updatedDrink = await Drink.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: updatedDrink
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating drink',
            error: error.message
        });
    }
});

// Delete drink (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);
        
        if (!drink) {
            return res.status(404).json({
                success: false,
                message: 'Drink not found'
            });
        }

        await drink.deleteOne();
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting drink',
            error: error.message
        });
    }
});

module.exports = router; 