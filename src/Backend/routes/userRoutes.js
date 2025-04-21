const express = require('express');
const { register, login, getCommunityMembers,getAllUsers } = require('../controllers/auth');
const router = express.Router();



router.post('/signUp', register);
router.get('/all-users', getAllUsers);
router.post('/login', login);
router.get('/members/:community_name', getCommunityMembers);


module.exports = router;



