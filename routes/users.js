const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST create new user
router.post('/', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const newUser = new User({ email, password, name, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { email, name, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.email = email || user.email;
        user.name = name || user.name;
        if (role) await user.updateRole(role);

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router; 