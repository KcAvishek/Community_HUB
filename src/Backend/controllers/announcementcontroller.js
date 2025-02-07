const mongoose = require('mongoose');
const Announcement = require('../models/Announcements');

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, community_id, created_by, expires_at } = req.body;
    const announcement = new Announcement({ title, content, community_id, created_by, expires_at });
    await announcement.save();
    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
};

// Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('community_id').populate('created_by');
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

// Get a single announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate('community_id').populate('created_by');
    if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcement' });
  }
};

// Update an announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnnouncement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json({ message: 'Announcement updated', updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update announcement' });
  }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
};
