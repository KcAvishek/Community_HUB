const express = require('express');
const {
  createCommunity,
  getCommunities,
  getCommunityById,
  updateCommunity,
  deleteCommunity
} = require('../controllers/communitycontroller');

const router = express.Router();

// Create community
router.post('/createcommunity', createCommunity);

// Get all communities
router.get('/getcommunity', getCommunities);

// Get one community by ID
router.get('/getcommunityid/:id', getCommunityById); // Changed to GET + use :id param

// Update community
router.put('/updatecommunity/:id', updateCommunity); // Changed to PUT + use :id param

// Delete community
router.delete('/deletecommunityid/:id', deleteCommunity); // Changed to DELETE + use :id param

module.exports = router;
