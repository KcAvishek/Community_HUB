const mongoose = require('mongoose');
const Announcement = require('../models/Announcements'); 

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createAnnouncement = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming request

    const { title, content, community_id, created_by, expires_at } = req.body;

    // Ensure all required fields are present
    if (!title || !content || !community_id || !created_by || !expires_at) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const announcement = new Announcement({ title, content, community_id, created_by, expires_at });
    await announcement.save();

    res.status(201).json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('community_id').populate('created_by');
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate('community_id').populate('created_by');
    if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcement' });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnnouncement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json({ message: 'Announcement updated', updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update announcement' });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
};

module.exports = {createAnnouncement,getAnnouncements,getAnnouncementById,updateAnnouncement,deleteAnnouncement};
