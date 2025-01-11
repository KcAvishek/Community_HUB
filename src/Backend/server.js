const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://kcabhisekh:Abhishek123@cluster0.gxdnk.mongodb.net/community-hub?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Middleware (optional for JSON parsing, if needed later)
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening running at http://localhost:${PORT}`);
});
