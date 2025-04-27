const express = require('express');
const { register, login, getCommunityMembers,getAllUsers,updateUserRoleAndCommunity } = require('../controllers/auth');
const router = express.Router();



router.post('/signUp', register);
router.get('/all-users', getAllUsers);
router.post('/login', login);
router.get('/members/:community_name', getCommunityMembers);
router.post('/update-user', updateUserRoleAndCommunity);

module.exports = router;





