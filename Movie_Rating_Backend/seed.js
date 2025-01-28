const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const trendingMovies = require('./data/trending-movies.json');
const popularMovies = require('./data/popular-movies.json');
const theatreMovies = require('./data/theatre-movies.json');

mongoose.connect('mongodb://localhost:27017/movie-reviews');

const movies = [...trendingMovies, ...popularMovies, ...theatreMovies];
Movie.insertMany(movies)
  .then(() => {
    console.log('Database seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
  });
