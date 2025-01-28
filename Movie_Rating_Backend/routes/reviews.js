const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// Get reviews for a specific movie
router.get('/:id', async (req, res) => {
    try {
      // Convert the ID from the URL parameter to a number
    //   const movieId = parseInt(req.params.id, 10);
      // Check if the conversion was successful
    //   if (isNaN(movieId)) {
    //     return res.status(400).json({ error: 'Invalid movie ID' });
    //   }
    //   const movie = await Movie.findOne({ id: movieId });
      const movie = await Movie.findOne({ id: req.params.id });
      
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch reviews', details: err.message });
    }
  });


// Add a review for a specific movie
router.post('/add/:id', async (req, res) => {
    try {
        const { author, review, rating, published_on } = req.body;

        // Find the movie by ID or create a new one 
        let movie = await Movie.findOne({ id: req.params.id });
        if(!movie){
            return res.status(404).json({ error: 'Movie not found!' });
        }
        // Add the new review
        movie.reviews.push({
            author, 
            published_on: published_on || new Date(),
            review,
            rating
        });
        // Save the movie with the new review 
        await movie.save();
        
        res.status(201).json({ message: 'Review added successfully', review });
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding review', error: err.message });
    }
})

module.exports = router;