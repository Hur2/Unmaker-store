const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const reviewtSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
}, { timestamps: true })

const Review = mongoose.model('Review', reviewtSchema);

module.exports = { Review }