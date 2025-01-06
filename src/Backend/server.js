
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://kcabhisekh:Abhishek123@cluster0.gxdnk.mongodb.net/community-hub?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(PORT, () => {
  console.log(`App listening running at http://localhost:${PORT}`);
});
