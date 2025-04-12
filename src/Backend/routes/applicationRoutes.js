const express = require('express');
const router = express.Router();
const { createApplication, getAllApplications, updateApplicationStatus } = require('../controllers/applicationController');

// Routes for Application handling
router.post('/applications', createApplication); // No need for authenticateUser here for now
router.get('/applications', getAllApplications); // No need for authenticateUser here for now
router.put('/applications/:id', updateApplicationStatus); // No need for authenticateUser here for now

module.exports = router;
