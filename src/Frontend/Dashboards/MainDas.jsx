import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Dashboard.css";
import AnnouncementSection from "./AnnouncementSection";
import CalendarSection from "./CalendarSection";
import FormTableSection from "./FormTable";
import TimeTrackSection from "./Timetrack";
import DashboardSection from "../admin/dashboardSection";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import TopicHub from "../TopicHub";
import { toast } from "sonner";



const MainDas = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); 
  const navigate = useNavigate();
  const { clearAuthData } = useAuthStore();

  
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

  // State for settings
  const [userSettings, setUserSettings] = useState({
    fullName: "Abhishek K.C.",
    email: "abhi@gmail.com",
    password: "********",
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
  };

  // Logout handlers
  const handleLogoutClick = () => {
    setShowLogoutDialog(true); // Show the dialog
  };

  const confirmLogout = () => {
    clearAuthData(); // Clear auth data
    toast.success("Logged out successfully!"); // Show toast
    navigate("/"); // Redirect to role page
    setShowLogoutDialog(false); // Close dialog
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false); // Close dialog, stay on page
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
          {/* <li onClick={() => setActiveSection("poll&Voting")}>
            <span className="material-icons">description</span> Poll&Voting
          </li> */}
          <li onClick={() => setActiveSection("calendar")}>
            <span className="material-icons">calendar_today</span> Calendar
          </li>
          <li onClick={() => setActiveSection("Time Track")}>
            <span className="material-icons">hourglass_top</span> Time Track
          </li>
          <li onClick={() => setActiveSection("Topic-hub")}>
            <span className="material-icons">diversity_3</span> Topic Hub
          </li>
          {/* <li onClick={() => setActiveSection("Notification")}>
            <span className="material-icons">notifications</span> Notification
          </li> */}
          <li onClick={() => setActiveSection("settings")}>
            <span className="material-icons">settings</span> Settings
          </li>
        </ul>
        <div className="logout" onClick={handleLogoutClick} style={{ cursor: "pointer" }}>
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
            {/* <span className="material-icons notification-icon" onClick={() => setActiveSection("Notification")} style={{ cursor: "pointer" }}> notifications
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </span> */}
          </div>
        </header>
        <hr />

        {/* Logout Dialog */}
        {showLogoutDialog && (
          <div className="logout-dialog-overlay">
            <div className="logout-dialog">
              <h3>Confirm Logout</h3>
              <p>Are you sure you want to logout?</p>
              <div className="dialog-buttons">
                <button className="dialog-btn yes-btn" onClick={confirmLogout}>
                  Yes
                </button>
                <button className="dialog-btn no-btn" onClick={cancelLogout}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "dashboard" && <DashboardSection activeSection={activeSection} />}

        {activeSection === "announcement" && <AnnouncementSection activeSection={activeSection} />}
        
        {activeSection === "form" && < FormTableSection activeSection={activeSection} />}

        {activeSection === "calendar" && <CalendarSection activeSection={activeSection} />}

        {activeSection === "Time Track" && <TimeTrackSection activeSection={activeSection}/>}
          
        {activeSection === "Notification" && (
          <div className="box notification-section">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications available.</p>
            ) : (
              <>
                <div className="notification-header">
                  <span>You have {notifications.filter((n) => !n.read).length} unread notifications</span>
                  <button className="clear-all-btn" onClick={clearAllNotifications}>Clear All</button>
                </div>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.read ? "read" : "unread"}`}
                    >
                      <div className="notification-content">
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button className="mark-read-btn" onClick={() => markAsRead(notification.id)}>
                            Mark as Read
                          </button>
                        )}
                        <button className="delete-btn" onClick={() => deleteNotification(notification.id)}>
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

        {activeSection === "settings" && (
          <div className="box settings-section">
            <h2>Settings</h2>
            <div className="settings-container">
              <h3>Profile Settings</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>User Name:</label>
                  <input
                    type="text"
                    name="UserName"
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
                <button className="action-btn save-btn" onClick={handleSaveSettings}>Save Settings</button>
              </div>
            </div>
          </div>
        )}
{activeSection === "Topic-hub" && <TopicHub activeSection={activeSection} />}


      </main>
    </div>
  );
};

export default MainDas;

