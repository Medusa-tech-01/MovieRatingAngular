const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reviewRoutes = require("./routes/reviews");
const path = require("path");
const Movie = require('./models/Movie');
const trendingMovies = require('./data/trending-movies.json');
const popularMovies = require('./data/popular-movies.json');
const theatreMovies = require('./data/theatre-movies.json');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",  // Allow all origins (For testing only. Restrict in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase(); // Call function to check and seed the database
  })
  .catch((err) => console.log(err));

// Function to seed database only if it's empty
async function seedDatabase() {
  try {
      const movieCount = await Movie.countDocuments();
      if (movieCount === 0) {
          console.log('Database is empty. Seeding data...');
          const movies = [...trendingMovies, ...popularMovies, ...theatreMovies];
          await Movie.insertMany(movies);
          console.log('Database seeded successfully');
      } else {
          console.log('Database already has data. Skipping seeding.');
      }
  } catch (err) {
      console.error('Error checking/seeding database:', err);
  }
}

app.use("/api/reviews", reviewRoutes);

// Serve the Angular app's static files
app.use(express.static(path.join(__dirname, "../Movie_Rating_Frontend/dist/")));
// Catch-all route to serve the Angular app
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Movie_Rating_Frontend/dist/browser/index.csr.html")
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running st http://localhost:${PORT}`);
});
