const express = require('express');
const router = express.Router();
const { createAnnouncement, getAnnouncements, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementcontroller'); 

// Route to create a new announcement
router.post('/announcements', createAnnouncement);

// Route to get all announcements
router.get('/announcements', getAnnouncements);

// Route to update an announcement by ID
router.put('/announcements/:id', updateAnnouncement);

// Route to delete an announcement by ID
router.delete('/announcements/:id', deleteAnnouncement);

module.exports = router;
