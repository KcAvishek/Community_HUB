const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRouter = require('../Backend/routes/userRoutes');
const communityRouter = require('../Backend/routes/communityRoutes');
const announcementRouter = require('../Backend/routes/AnnouncementRoutes'); 
const applicationRouter = require('../Backend/routes/applicationRoutes');
const eventRoutes = require('../Backend/routes/eventRoutes');
const attendanceRoutes = require('../Backend/routes/attendanceRoutes');
const discussionRoutes = require('../Backend/routes/discussionRoutes');
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



app.use('/api/auth', authRouter,);
app.use('/api/a1', communityRouter,);
app.use('/api/a2', announcementRouter); 
app.use('/api/a3', eventRoutes);
app.use('/api/a4', applicationRouter,);
app.use('/api/a5', attendanceRoutes,);
app.use('/api/a6', discussionRoutes,);



// Basic route
app.get('/', (req, res) => {
  res.send('<h1>you are on on the server.js!</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening running at http://localhost:${PORT}`);
});
