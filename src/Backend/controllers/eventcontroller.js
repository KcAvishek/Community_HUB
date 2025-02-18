const mongoose = require('mongoose');
const Event = require('../models/Events');  // Import Event model

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { description, date, community_id, created_by } = req.body;

    // Create new event document
    const event = new Event({ description, date, community_id, created_by });

    // Save event to database
    await event.save();

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating event", error: err.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('community_id')  // Populate the community information
      .populate('created_by');   // Populate the user who created the event

    return res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching events", error: err.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('community_id')  // Populate the community information
      .populate('created_by');   // Populate the user who created the event

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event fetched successfully",
      event,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching event", error: err.message });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { description, date, community_id, created_by } = req.body;

    // Update the event by ID
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { description, date, community_id, created_by },
      { new: true }  // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating event", error: err.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json({
      message: "Event deleted successfully",
      event,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting event", error: err.message });
  }
};

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
