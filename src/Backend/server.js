// 
// 
// 
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// 
// const app = express();
// 
// const  PORT =  process.env.PORT || 5000;
// 
// // Middleware
// app.use(cors());
// app.use(express.json());
// 
// // Debug MongoDB URI
// console.log('MongoDB URI:', process.env.MONGO_URL);
// 
// // MongoDB Connection
// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err.message);
//   }
// };
// 
// connectToMongoDB();
// 
// // Routes
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'API is working',
//     success: true,
//   });
// });
// 
// app.listen(PORT, () => {
//   console.log(`Server listening at http://localhost:${PORT}`);
// });

const express = require('express'); // importing module express
const app = express();// creating express of application
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => { 
  res.send('<h1>Hello World!</h1>')
})

app.listen(PORT, () => {
    console.log(`App listening running at http://localhost:${PORT}`)
})