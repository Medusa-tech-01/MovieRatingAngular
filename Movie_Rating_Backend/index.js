const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reviewRoutes = require('./routes/reviews');
const path = require('path');

const app = express();


// Middleware 
app.use(cors());
app.use(express.json());

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/movie-reviews')
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.use('/api/reviews', reviewRoutes);

// Serve the Angular app's static files
app.use(express.static(path.join(__dirname, '../Movie_Rating_Frontend/dist/')));
// Catch-all route to serve the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Movie_Rating_Frontend/dist/index.html'));
});

// Start the server 
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running st http://localhost:${PORT}`);
});




