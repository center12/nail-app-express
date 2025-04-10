'use strict';

const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Add index for ordering
drinkSchema.index({ order: 1 });

// Add index for category lookup
drinkSchema.index({ category: 1 });

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink; 