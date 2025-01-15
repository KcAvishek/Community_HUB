const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRouter = require('../Backend/routes/userRoutes');
const dotenv = require('dotenv');
// Converts the config.env file to environmental variables
dotenv.config({ path: './config.env' });
const PORT = 4000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies if needed
}));
app.use(express.json());
// MongoDB connection URI
const mongoURI = 'mongodb+srv://kcabhisekh:Abhishek123@cluster0.gxdnk.mongodb.net/community-hub?retryWrites=true&w=majority';


// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));



app.use('/api/auth', authRouter);
// Basic route
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening running at http://localhost:${PORT}`);
});
