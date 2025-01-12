// const express = require('express');
// const User = require('../models/User');
// const router = express.Router();
// 
// // Example route to get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// 
// // Export the router
// module.exports = router;

const express = require('express');
const { register, login } = require('../controllers/auth');
const router = express.Router();

// Signup Route
router.post('/signup', register);

// Login Route
router.post('/login', login);

module.exports = router;
