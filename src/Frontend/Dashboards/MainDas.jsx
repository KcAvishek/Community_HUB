import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Dashboard.css";

const MainDas = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  // State for the modal and announcement fields
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");

  // State for attendance tracking
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendees, setAttendees] = useState([
    { id: 1, name: 'Abhishek K.C.', status: 'Not Marked' },
    { id: 2, name: 'Kenab K.C.', status: 'Not Marked' },
    { id: 3, name: 'Niraj Chaudhary', status: 'Not Marked' },
    { id: 4, name: 'Suren Tamang', status: 'Not Marked' },
  ]);

  const handleAddEvent = () => {
    alert("Event Added");
  };

  const handleUpdateEvent = () => {
    alert("Event Updated");
  };

  const handleDeleteEvent = () => {
    alert("Event Deleted");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncementTitle("");
    setAnnouncementDescription("");
  };

  const handleAddAnnouncement = () => {
    console.log("New Announcement:", {
      title: announcementTitle,
      description: announcementDescription,
    });
    closeModal();
  };

  const handleAttendance = (id, newStatus) => {
    setAttendees(attendees.map(attendee => 
      attendee.id === id 
        ? { ...attendee, status: newStatus }
        : attendee
    ));
  };

  // New handler functions for buttons
  const handleSaveAttendance = () => {
    console.log("Saving attendance:", { date: attendanceDate, attendees });
    alert("Attendance Saved");
    // Add your save logic here (e.g., API call)
  };

  const handleUpdateAttendance = () => {
    console.log("Updating attendance:", { date: attendanceDate, attendees });
    alert("Attendance Updated");
    // Add your update logic here (e.g., API call)
  };

  const handleDeleteAttendance = () => {
    setAttendees(attendees.map(attendee => ({ ...attendee, status: 'Not Marked' })));
    setAttendanceDate('');
    alert("Attendance Cleared");
    // Add your delete logic here
  };

  const handlePrint = () => {
    const printContent = document.getElementById('attendance-table-printable').outerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Attendance Report - ${attendanceDate}</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px; text-align: center; border: 1px solid #ddd; }
            th { background-color: #f5f5f5; }
            @media print { 
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h2>Attendance Report - ${attendanceDate || 'No Date Selected'}</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Community HUB</h2>
        <ul>
          <li onClick={() => setActiveSection("dashboard")}>
            <span className="material-icons">dashboard</span> Dashboard
          </li>
          <li onClick={() => setActiveSection("announcement")}>
            <span className="material-icons">lightbulb</span> Announcement
          </li>
          <li onClick={() => setActiveSection("form")}>
            <span className="material-icons">description</span> Form
          </li>
          <li onClick={() => setActiveSection("poll&Voting")}>
            <span className="material-icons">description</span> Poll&Voting
          </li>
          <li onClick={() => setActiveSection("calendar")}>
            <span className="material-icons">calendar_today</span> Calendar
          </li>
          <li onClick={() => setActiveSection("Time Track")}>
            <span className="material-icons">hourglass_top</span> Time Track
          </li>
          <li onClick={() => setActiveSection("settings")}>
            <span className="material-icons">settings</span> Settings
          </li>
        </ul>
        <div className="logout">
          <span className="material-icons">logout</span> Logout
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Welcome, Abhishek</h1>
          <div className="header-icons">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <span className="material-icons">inbox</span>
            <span className="material-icons">notifications</span>
          </div>
        </header>
        <hr />

        {/* Existing sections remain unchanged */}
        {activeSection === "dashboard" && (
          <div className="content-grid">
            <div className="box announcements">
              <h2>Announcement</h2>
              <div className="announcement-item">
                <p><strong>UI Visuals</strong></p>
                <p>
                  There is a sprinkler that appears to be broken shooting out
                  water in front of my home.
                </p>
              </div>
              <div className="announcement-item">
                <p><strong>Gaming</strong></p>
                <p>
                  From its medieval origins to the digital era, learn everything
                  there is to know about the ubiquitous lorem ipsum passage.
                </p>
              </div>
              <div className="announcement-item">
                <p><strong>AI Learner</strong></p>
                <p>
                  From its medieval origins to the digital era, learn everything
                  there is to know about the ubiquitous lorem ipsum passage.
                </p>
              </div>
            </div>

            <div className="box poll">
              <h2>Poll and Voting</h2>
              <form>
                <label>
                  <input type="radio" name="poll" value="Morning" />
                  Morning
                </label>
                <label>
                  <input type="radio" name="poll" value="Afternoon" defaultChecked />
                  Afternoon
                </label>
                <label>
                  <input type="radio" name="poll" value="Evening" />
                  Evening
                </label>
                <label>
                  <input type="radio" name="poll" value="Night" />
                  Night
                </label>
                <button type="submit">Submit your vote</button>
              </form>
            </div>

            <div className="box events">
              <h2>Events</h2>
              <Calendar onChange={setSelectedDate} value={selectedDate} />
              <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {activeSection === "announcement" && (
          <div className="announcements-container">
            <div className="box announcements">
              <h2>Announcement</h2>
              <div className="announcement-item">
                <p><strong>UI Visuals</strong></p>
                <p>There is a sprinkler that appears to be broken shooting out water in front of my home.</p>
                <div className="announcement-buttons">
                  <button className="update-button">Update</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
              <div className="announcement-item">
                <p><strong>Gaming</strong></p>
                <p>
                  From its medieval origins to the digital era, learn everything
                  there is to know about the ubiquitous lorem ipsum passage.
                </p>
                <div className="announcement-buttons">
                  <button className="update-button">Update</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
              <div className="announcement-item">
                <p><strong>AI Learner</strong></p>
                <p>
                  From its medieval origins to the digital era, learn everything
                  there is to know about the ubiquitous lorem ipsum passage.
                </p>
                <div className="announcement-buttons">
                  <button className="update-button">Update</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            </div>
            <button className="add-button" onClick={openModal}>
              Add Announcement
            </button>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add Announcement</h3>
              <div className="modal-input">
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                />
              </div>
              <div className="modal-input">
                <label>Description:</label>
                <textarea
                  placeholder="Enter description"
                  value={announcementDescription}
                  onChange={(e) => setAnnouncementDescription(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleAddAnnouncement}>OK</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "form" && (
          <div className="box form-section">
            <h2>Form Management</h2>
            <div className="form-management-container">
              <div className="form-table-wrapper">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th className="full-name-column">FULL NAME</th>
                      <th className="status-column">STATUS</th>
                      <th className="email-column">EMAIL</th>
                      <th className="feedback-column">FEEDBACK</th>
                      <th className="actions-column"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="user-name-cell">
                        <div className="user-avatar">A</div>
                        <span>Abhishek K.C.</span>
                      </td>
                      <td>
                        <span className="status-badge status-accepted">Accepted</span>
                      </td>
                      <td>abhi@Gmail.com</td>
                      <td>Great service!</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">Accepted</button>
                            <button className="status-option status-pending">Pending</button>
                            <button className="status-option status-rejected">Rejected</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="user-name-cell">
                        <div className="user-avatar">R</div>
                        <span>Rahul Rana</span>
                      </td>
                      <td>
                        <span className="status-badge status-pending">Pending</span>
                      </td>
                      <td>rana@Gmail.com</td>
                      <td>Waiting for more info</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">Accepted</button>
                            <button className="status-option status-pending">Pending</button>
                            <button className="status-option status-rejected">Rejected</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="user-name-cell">
                        <div className="user-avatar">N</div>
                        <span>Niraj thapa</span>
                      </td>
                      <td>
                        <span className="status-badge status-rejected">Rejected</span>
                      </td>
                      <td>thapa1@Gmail.com</td>
                      <td>Not eligible</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">Accepted</button>
                            <button className="status-option status-pending">Pending</button>
                            <button className="status-option status-rejected">Rejected</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="user-name-cell">
                        <div className="user-avatar">A</div>
                        <span>Anp gurung</span>
                      </td>
                      <td>
                        <span className="status-badge status-accepted">Accepted</span>
                      </td>
                      <td>anupe@Gmail.com</td>
                      <td>Perfect fit</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">Accepted</button>
                            <button className="status-option status-pending">Pending</button>
                            <button className="status-option status-rejected">Rejected</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="user-name-cell">
                        <div className="user-avatar">K</div>
                        <span>Kenab K.C.</span>
                      </td>
                      <td>
                        <span className="status-badge status-accepted">Accepted</span>
                      </td>
                      <td>Kenab@Gmail.com</td>
                      <td>Excellent candidate</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">Accepted</button>
                            <button className="status-option status-pending">Pending</button>
                            <button className="status-option status-rejected">Rejected</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeSection === "calendar" && (
          <div className="box calendar-section">
            <h2>Events</h2>
            <div className="calendar-container">
              <div className="calendar-wrapper">
                <Calendar onChange={setSelectedDate} value={selectedDate} />
              </div>
              <div className="calendar-form">
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="text"
                    value={selectedDate.toLocaleDateString()}
                    disabled
                    className="date-input"
                  />
                </div>
                <div className="form-group">
                  <label>Event:</label>
                  <input
                    type="text"
                    placeholder="Enter event name"
                    className="event-input"
                  />
                </div>
                <div className="form-buttons">
                  <button className="add-event-button">Add Event</button>
                  <button className="update-event-button">Update Event</button>
                  <button className="delete-event-button">Delete Event</button>
                </div>
              </div>
            </div>
            <div className="current-date-events">
              <p>Current Date: {selectedDate.toLocaleDateString()}</p>
              <div className="event-list">
                <h3>Events on this Date:</h3>
                <ul>
                  <li>No events for this date.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Updated Time Track Section with Buttons and Print */}
        {activeSection === "Time Track" && (
          <div className="box time-track-section">
            <h2>Event Attendance Tracker</h2>
            
            {/* Date Input */}
            <div className="date-input">
              <label htmlFor="eventDate">Select Event Date: </label>
              <input 
                type="date" 
                id="eventDate"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </div>

            {/* Attendance Table */}
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
                          className={`attendance-btn ${attendee.status === 'Absent' ? 'active' : ''}`}
                          onClick={() => handleAttendance(attendee.id, 'Absent')}
                        >
                          x
                        </button>
                        <button 
                          className={`attendance-btn ${attendee.status === 'Present' ? 'active' : ''}`}
                          onClick={() => handleAttendance(attendee.id, 'Present')}
                        >
                          ✓
                        </button>
                        <button 
                          className={`attendance-btn ${attendee.status === 'Late' ? 'active' : ''}`}
                          onClick={() => handleAttendance(attendee.id, 'Late')}
                        >
                          !
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Action Buttons */}
            <div className="attendance-actions">
              <button className="action-btn save-btn" onClick={handleSaveAttendance}>
                Save
              </button>
              <button className="action-btn update-btn" onClick={handleUpdateAttendance}>
                Update
              </button>
              <button className="action-btn delete-btn" onClick={handleDeleteAttendance}>
                Delete
              </button>
              <button className="action-btn print-btn" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>
        )}

        {activeSection === "feedback" && (
          <div className="box feedback-section">
            <h2>Feedback</h2>
            <p>View or submit feedback process.</p>
          </div>
        )}

        {activeSection === "settings" && (
          <div className="box settings-section">
            <h2>Settings</h2>
            <p>Account settings process.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainDas;
