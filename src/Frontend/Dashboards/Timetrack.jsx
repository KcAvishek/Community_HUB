import React, { useState } from 'react';

const TimeTrack = () => {
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendees, setAttendees] = useState([
    { id: 1, name: "Abhishek K.C.", status: "Not Marked" },
    { id: 2, name: "Kenab K.C.", status: "Not Marked" },
    { id: 3, name: "Niraj Chaudhary", status: "Not Marked" },
    { id: 4, name: "Suren Tamang", status: "Not Marked" },
  ]);

  const handleAttendance = (id, newStatus) => {
    setAttendees(
      attendees.map((attendee) =>
        attendee.id === id ? { ...attendee, status: newStatus } : attendee
      )
    );
  };

  const handleSaveAttendance = () => {
    console.log("Saving attendance:", { date: attendanceDate, attendees });
    alert("Attendance Saved");
  };

  const handleUpdateAttendance = () => {
    console.log("Updating attendance:", { date: attendanceDate, attendees });
    alert("Attendance Updated");
  };

  const handleDeleteAttendance = () => {
    setAttendees(
      attendees.map((attendee) => ({ ...attendee, status: "Not Marked" }))
    );
    setAttendanceDate("");
    alert("Attendance Cleared");
  };

  const handlePrint = () => {
    const printContent = document.getElementById("attendance-table-printable").outerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Attendance Report - ${attendanceDate}</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px; text-align: center; border: 1px solid #ddd; }
            th { background-color: #f5f5f5; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <h2>Attendance Report - ${attendanceDate || "No Date Selected"}</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="box time-track-section">
      <h2>Event Attendance Tracker</h2>
      <div className="date-input">
        <label htmlFor="eventDate">Select Event Date: </label>
        <input
          type="date"
          id="eventDate"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
        />
      </div>
      <table className="attendance-table" id="attendance-table-printable">
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Status</th>
            <th className="no-print">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={attendee.id}>
              <td>{index + 1}</td>
              <td>{attendee.name}</td>
              <td>{attendee.status}</td>
              <td className="no-print">
                <div className="attendance-buttons">
                  <button
                    className={`attendance-btn ${attendee.status === "Absent" ? "active" : ""}`}
                    onClick={() => handleAttendance(attendee.id, "Absent")}
                  >
                    x
                  </button>
                  <button
                    className={`attendance-btn ${attendee.status === "Present" ? "active" : ""}`}
                    onClick={() => handleAttendance(attendee.id, "Present")}
                  >
                    ✓
                  </button>
                  <button
                    className={`attendance-btn ${attendee.status === "Late" ? "active" : ""}`}
                    onClick={() => handleAttendance(attendee.id, "Late")}
                  >
                    !
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="attendance-actions">
        <button className="action-btn save-btn" onClick={handleSaveAttendance}>Save</button>
        <button className="action-btn update-btn" onClick={handleUpdateAttendance}>Update</button>
        <button className="action-btn delete-btn" onClick={handleDeleteAttendance}>Delete</button>
        <button className="action-btn print-btn" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default TimeTrack;
