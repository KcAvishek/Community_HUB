const express = require('express');
const { register, login, getCommunityMembers } = require('../controllers/auth');
const router = express.Router();

// Signup Route
router.post('/signUp', register);

// Login Route
router.post('/login', login);
router.get('/members/:community_name', getCommunityMembers);


module.exports = router;

