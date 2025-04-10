const mongoose = require('mongoose');
const Event = require('../models/Events'); // Import Event model

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, created_by } = req.body;

    const event = new Event({ title, description, date, created_by });
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
      .populate('created_by');

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
      .populate('created_by');

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
    const { title, description, date, created_by } = req.body;

    // Only update fields that are provided in the request body
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (date !== undefined) updateFields.date = date;
    if (created_by !== undefined) updateFields.created_by = created_by;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).populate('created_by'); // Optional: populate created_by for consistency

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event updated successfully",
      updatedEvent, // Match frontend expectation
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



