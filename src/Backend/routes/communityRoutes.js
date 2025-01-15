const express = require('express');
const { createCommunity, getCommunities,getCommunityById,updateCommunity,deleteCommunity } = require('../controllers/communitycontroller');
const router = express.Router();


// create community
router.post('/createcommunity', createCommunity);

// get community
router.post('/getcommunity', getCommunities);

// get community
router.post('/getcommunityid', getCommunityById);

// update community
router.post('/updatecommunity', updateCommunity);

// delete community
router.post('/deletecommunityid', deleteCommunity);


module.exports = router;