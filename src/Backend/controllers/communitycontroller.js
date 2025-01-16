const mongoose = require('mongoose');
const Community = require('../models/Community');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createCommunity = async (req, res) => {
  try {
    const { name, description, leader_id } = req.body;

    // Validate input
    if (!name || !leader_id) {
      return res.status(400).json({ message: 'Name and leader_id are required' });
    }

    // Create a new community
    const newCommunity = await Community.create({
      name,
      description,
      leader_id, 
    });

    res.status(201).json({ message: 'Community created successfully', community: newCommunity });
  } catch (err) {
    console.error('Error creating community:', err);
    res.status(500).json({ message: 'Error creating community', error: err.message });
  }
};




  const getCommunities = async (req, res) => {
    try {
      // Fetch all communities with leader details populated
      const communities = await Community.find().populate('leader_id', 'name');
      res.status(200).json({ communities });
    } catch (err) {
      console.error('Error fetching communities:', err);
      res.status(500).json({ message: 'Error fetching communities', error: err.message });
    }
  };
  



  const getCommunityById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the community by ID
      const community = await Community.findById(id).populate('leader_id', 'name');
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }
  
      res.status(200).json({ community });
    } catch (err) {
      console.error('Error fetching community:', err);
      res.status(500).json({ message: 'Error fetching community', error: err.message });
    }
  };
  




  const updateCommunity = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      // Update the community
      const updatedCommunity = await Community.findByIdAndUpdate(
        id,
        { name, description, updated_at: Date.now() },
        { new: true }
      );
  
      if (!updatedCommunity) {
        return res.status(404).json({ message: 'Community not found' });
      }
  
      res.status(200).json({ message: 'Community updated successfully', community: updatedCommunity });
    } catch (err) {
      console.error('Error updating community:', err);
      res.status(500).json({ message: 'Error updating community', error: err.message });
    }
  };
  
  const deleteCommunity = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete the community
      const deletedCommunity = await Community.findByIdAndDelete(id);
      if (!deletedCommunity) {
        return res.status(404).json({ message: 'Community not found' });
      }
  
      res.status(200).json({ message: 'Community deleted successfully', community: deletedCommunity });
    } catch (err) {
      console.error('Error deleting community:', err);
      res.status(500).json({ message: 'Error deleting community', error: err.message });
    }
  };
  
  module.exports = {
    createCommunity,
    getCommunities,
    getCommunityById,
    updateCommunity,
    deleteCommunity,
  };