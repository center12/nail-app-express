'use strict';

const mongoose = require('mongoose');

const waxingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
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
waxingSchema.index({ order: 1 });

// Add index for category lookup
waxingSchema.index({ category: 1 });

const Waxing = mongoose.model('Waxing', waxingSchema);

module.exports = Waxing; 