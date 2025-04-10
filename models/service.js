'use strict';

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
serviceSchema.index({ order: 1 });

// Add index for category lookup
serviceSchema.index({ category: 1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 