const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventcontroller');

// Route to create a new event
router.post('/events', createEvent);

// Route to get all events
router.get('/events', getAllEvents);

// Route to get a single event by ID
router.get('/events/:id', getEventById);

// Route to update an event
router.put('/events/:id', updateEvent);

// Route to delete an event
router.delete('/events/:id', deleteEvent);

module.exports = router;
