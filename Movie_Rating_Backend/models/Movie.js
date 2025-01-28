const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  published_on: { type: Date, default: Date.now },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
});

const movieSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    cover: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: [reviewSchema],
  });

module.exports = mongoose.model('Movie', movieSchema);