const mongoose = require('mongoose');
const Event = require('../models/Events'); // Import Event model

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, created_by } = req.body;

    console.log('Creating Event with data:', { title, description, date, created_by });

    const event = new Event({ title, description, date, created_by });
    await event.save();

    console.log('Event created successfully:', event);

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ message: "Error creating event", error: err.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    console.log('Fetching all events...');
    
    const events = await Event.find()
      .populate('created_by');

    console.log('Events fetched successfully:', events);

    return res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    return res.status(500).json({ message: "Error fetching events", error: err.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    console.log(`Fetching event with ID: ${req.params.id}`);

    const event = await Event.findById(req.params.id)
      .populate('created_by');

    if (!event) {
      console.log('Event not found');
      return res.status(404).json({ message: "Event not found" });
    }

    console.log('Event fetched successfully:', event);

    return res.status(200).json({
      message: "Event fetched successfully",
      event,
    });
  } catch (err) {
    console.error('Error fetching event:', err);
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

    console.log('Updating event with ID:', req.params.id);
    console.log('Update fields:', updateFields);

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).populate('created_by'); // Optional: populate created_by for consistency

    if (!updatedEvent) {
      console.log('Event not found for update');
      return res.status(404).json({ message: "Event not found" });
    }

    console.log('Event updated successfully:', updatedEvent);

    return res.status(200).json({
      message: "Event updated successfully",
      updatedEvent, // Match frontend expectation
    });
  } catch (err) {
    console.error('Error updating event:', err);
    return res.status(500).json({ message: "Error updating event", error: err.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    console.log(`Deleting event with ID: ${req.params.id}`);

    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      console.log('Event not found for deletion');
      return res.status(404).json({ message: "Event not found" });
    }

    console.log('Event deleted successfully:', event);

    return res.status(200).json({
      message: "Event deleted successfully",
      event,
    });
  } catch (err) {
    console.error('Error deleting event:', err);
    return res.status(500).json({ message: "Error deleting event", error: err.message });
  }
};

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
