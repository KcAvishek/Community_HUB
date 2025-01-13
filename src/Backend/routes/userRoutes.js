const express = require('express');
const { register, login } = require('../controllers/auth');
const router = express.Router();

// Signup Route
router.post('/signUp', register);

// Login Route
router.post('/login', login);

module.exports = router;
