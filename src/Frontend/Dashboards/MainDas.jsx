import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Dashboard.css";
import AnnouncementSection from "./AnnouncementSection"; 

const MainDas = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");



  
  // State for attendance tracking
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
    const printContent = document.getElementById(
      "attendance-table-printable"
    ).outerHTML;
    const printWindow = window.open("", "_blank");
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
          <h2>Attendance Report - ${attendanceDate || "No Date Selected"}</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // State for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Community Event",
      message: "A new event has been scheduled for March 25, 2025.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Form Submission",
      message: "Your form has been successfully submitted.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Poll Update",
      message: "New poll results are available for review.",
      time: "3 hours ago",
      read: false,
    },
  ]);

  // Notification handlers
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };



  //calendar data
  const handleAddEvent = () => {
    alert("Event Added");
  };

  const handleUpdateEvent = () => {
    alert("Event Updated");
  };

  const handleDeleteEvent = () => {
    alert("Event Deleted");
  }; 
  
  // State for settings
  const [userSettings, setUserSettings] = useState({
    fullName: "Abhishek K.C.",
    email: "abhi@gmail.com",
    password: "********", // Placeholder, actual password not shown
  });

// Settings handlers
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", userSettings);
    alert("Settings Saved");
    // Add API call to save settings to backend here
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
          <li onClick={() => setActiveSection("Topic-hub")}>
            <span className="material-icons">diversity_3</span> Topic Hub
          </li>
          <li onClick={() => setActiveSection("Notification")}>
            <span className="material-icons">notifications</span> Notification
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
            <span
              className="material-icons notification-icon"
              onClick={() => setActiveSection("Notification")}
              style={{ cursor: "pointer" }}
            >
              notifications
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </span>
          </div>
        </header>
        <hr />

        {/* Existing sections remain unchanged */}
        {activeSection === "dashboard" && (
          <div className="content-grid">
            <div className="box announcements">
              <h2>Announcement</h2>
              <div className="announcement-item">
                <p>
                  <strong>UI Visuals</strong>
                </p>
                <p>
                  There is a sprinkler that appears to be broken shooting out
                  water in front of my home.
                </p>
              </div>
              <div className="announcement-item">
                <p>
                  <strong>Gaming</strong>
                </p>
                <p>
                  From its medieval origins to the digital era, learn
                  everything there is to know about the ubiquitous lorem ipsum
                  passage.
                </p>
              </div>
              <div className="announcement-item">
                <p>
                  <strong>AI Learner</strong>
                </p>
                <p>
                  From its medieval origins to the digital era, learn
                  everything there is to know about the ubiquitous lorem ipsum
                  passage.
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
                  <input
                    type="radio"
                    name="poll"
                    value="Afternoon"
                    defaultChecked
                  />
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

{/* --------------------- announcement -------------------- */}

{activeSection === "announcement" && <AnnouncementSection activeSection={activeSection} />}

{/* ------------------ Form Table -------------------- */}

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
                        <span className="status-badge status-accepted">
                          Accepted
                        </span>
                      </td>
                      <td>abhi@Gmail.com</td>
                      <td>Great service!</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">
                              Accepted
                            </button>
                            <button className="status-option status-pending">
                              Pending
                            </button>
                            <button className="status-option status-rejected">
                              Rejected
                            </button>
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
                        <span className="status-badge status-pending">
                          Pending
                        </span>
                      </td>
                      <td>rana@Gmail.com</td>
                      <td>Waiting for more info</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">
                              Accepted
                            </button>
                            <button className="status-option status-pending">
                              Pending
                            </button>
                            <button className="status-option status-rejected">
                              Rejected
                            </button>
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
                        <span className="status-badge status-rejected">
                          Rejected
                        </span>
                      </td>
                      <td>thapa1@Gmail.com</td>
                      <td>Not eligible</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">
                              Accepted
                            </button>
                            <button className="status-option status-pending">
                              Pending
                            </button>
                            <button className="status-option status-rejected">
                              Rejected
                            </button>
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
                        <span className="status-badge status-accepted">
                          Accepted
                        </span>
                      </td>
                      <td>anupe@Gmail.com</td>
                      <td>Perfect fit</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">
                              Accepted
                            </button>
                            <button className="status-option status-pending">
                              Pending
                            </button>
                            <button className="status-option status-rejected">
                              Rejected
                            </button>
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
                        <span className="status-badge status-accepted">
                          Accepted
                        </span>
                      </td>
                      <td>Kenab@Gmail.com</td>
                      <td>Excellent candidate</td>
                      <td>
                        <div className="action-menu">
                          <button className="action-button">...</button>
                          <div className="status-dropdown">
                            <button className="status-option status-accepted">
                              Accepted
                            </button>
                            <button className="status-option status-pending">
                              Pending
                            </button>
                            <button className="status-option status-rejected">
                              Rejected
                            </button>
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

{/* ----------------------Calender --------------------------- */}

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

{/* ------------------Time Track -------------------------- */}

        {activeSection === "Time Track" && (
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
                          className={`attendance-btn ${
                            attendee.status === "Absent" ? "active" : ""
                          }`}
                          onClick={() => handleAttendance(attendee.id, "Absent")}
                        >
                          x
                        </button>
                        <button
                          className={`attendance-btn ${
                            attendee.status === "Present" ? "active" : ""
                          }`}
                          onClick={() =>
                            handleAttendance(attendee.id, "Present")
                          }
                        >
                          ✓
                        </button>
                        <button
                          className={`attendance-btn ${
                            attendee.status === "Late" ? "active" : ""
                          }`}
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
              <button
                className="action-btn save-btn"
                onClick={handleSaveAttendance}
              >
                Save
              </button>
              <button
                className="action-btn update-btn"
                onClick={handleUpdateAttendance}
              >
                Update
              </button>
              <button
                className="action-btn delete-btn"
                onClick={handleDeleteAttendance}
              >
                Delete
              </button>
              <button className="action-btn print-btn" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>
        )}


{/* ------------------Notification----------------------- */}

        {activeSection === "Notification" && (
          <div className="box notification-section">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications available.</p>
            ) : (
              <>
                <div className="notification-header">
                  <span>
                    You have {notifications.filter((n) => !n.read).length} unread
                    notifications
                  </span>
                  <button
                    className="clear-all-btn"
                    onClick={clearAllNotifications}
                  >
                    Clear All
                  </button>
                </div>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${
                        notification.read ? "read" : "unread"
                      }`}
                    >
                      <div className="notification-content">
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                        <span className="notification-time">
                          {notification.time}
                        </span>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            className="mark-read-btn"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          className="delete-btn"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}


{/* ------------------------ Settings ----------------------- */}

        {/* Updated Settings Section */}
        {activeSection === "settings" && (
          <div className="box settings-section">
            <h2>Settings</h2>
            <div className="settings-container">
              <h3>Profile Settings</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={userSettings.fullName}
                    onChange={handleSettingsChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={userSettings.email}
                    onChange={handleSettingsChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={userSettings.password}
                    onChange={handleSettingsChange}
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div className="settings-actions">
                <button
                  className="action-btn save-btn"
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

{/* ---------------------Topic-Hub--------------------- */}

        {activeSection === "Topic-hub" && (
          <div className="box Topichub-section">
            <h2>working</h2>
            <p>Account</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainDas;


