const Attendance = require('../models/Attendance');

// ➕ Add new attendance
const addAttendance = async (req, res) => {
  try {
    const { community_name, date, attendees } = req.body;

    const existing = await Attendance.findOne({ community_name, date: new Date(date) });
    if (existing) {
      return res.status(400).json({ message: "Attendance already exists for this date." });
    }

    const newAttendance = new Attendance({ community_name, date, attendees });
    await newAttendance.save();

    return res.status(201).json({ message: "Attendance saved successfully", attendance: newAttendance });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get attendance by community and date
const getAttendanceByDate = async (req, res) => {
  try {
    const { communityName, date } = req.params;

    const attendance = await Attendance.findOne({
      community_name: communityName,
      date: new Date(date)
    });

    if (!attendance) {
      return res.status(404).json({ message: "No attendance found for this date" });
    }

    res.status(200).json({ message: "Attendance fetched", attendance });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Update attendance by community and date
const updateAttendance = async (req, res) => {
  try {
    const { community_name, date, attendees } = req.body;

    const updated = await Attendance.findOneAndUpdate(
      { community_name, date: new Date(date) },
      {
        attendees,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Attendance not found to update" });
    }

    res.status(200).json({ message: "Attendance updated", attendance: updated });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const { communityName, date } = req.params;

    const deleted = await Attendance.findOneAndDelete({
      community_name: communityName,
      date: new Date(date)
    });

    if (!deleted) {
      return res.status(404).json({ message: "Attendance not found to delete" });
    }

    res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {addAttendance,getAttendanceByDate,updateAttendance,deleteAttendance,};
