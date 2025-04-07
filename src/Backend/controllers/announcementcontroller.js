const mongoose = require('mongoose');
const Announcement = require('../models/Announcements');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createAnnouncement = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming request

    const { title, content, created_by, expires_at } = req.body;

    // Ensure all required fields are present
    if (!title || !content || !created_by || !expires_at) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const announcement = new Announcement({ title, content, created_by, expires_at });
    await announcement.save();

    res.status(201).json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find(); // removed .populate
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch announcements' });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch announcement' });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    console.log("Updating announcement with ID:", req.params.id);
    console.log("Update data:", req.body);
    
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedAnnouncement) {
      console.error("Announcement not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement updated', updatedAnnouncement });
  } catch (error) {
    console.error("Error in updateAnnouncement:", error);
    res.status(500).json({ message: 'Failed to update announcement' });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) return res.status(404).json({ message: 'Announcement not found' });
    res.status(200).json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete announcement' });
  }
};

module.exports = {createAnnouncement,getAnnouncements,getAnnouncementById,updateAnnouncement,deleteAnnouncement};
