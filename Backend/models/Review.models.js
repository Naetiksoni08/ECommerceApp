const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "product rating is required"]
    }
},
    {
        timestamps: true
    });

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;

