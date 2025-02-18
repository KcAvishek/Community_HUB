const express = require('express');
const router = express.Router();
const { createAnnouncement, getAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementcontroller'); 

router.post('/createAnnouncement', createAnnouncement);
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

module.exports = router;
