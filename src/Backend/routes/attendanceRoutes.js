const express = require('express');
const router = express.Router();
const {addAttendance,getAttendanceByDate,updateAttendance,deleteAttendance} = require('../controllers/attendanceController');

//  Add attendance
router.post('/add', addAttendance);

// Get attendance by community and date
router.get('/:communityName/:date', getAttendanceByDate);

//  Update attendance
router.put('/update', updateAttendance);

//  Delete attendance
router.delete('/:communityName/:date', deleteAttendance);

module.exports = router;

