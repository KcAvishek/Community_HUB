import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useAuthStore from "./Store/authStore";
import JoinCommunityForm from "./JoinCommunityForm";
import TopicHub from "./TopicHub";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { clearAuthData } = useAuthStore();
  const navigate = useNavigate();


  // State for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Community Event",
      message: "A new event has been scheduled for March 25, 2025.",
      read: false,
    },
    {
      id: 2,
      title: "Form Submission",
      message: "Your form has been successfully submitted.",
      read: true,
    },
    {
      id: 3,
      title: "Poll Update",
      message: "New poll results are available for review.",
      read: false,
    },
  ]);
// Logout handlers
const handleLogoutClick = () => {
  setShowLogoutDialog(true); // Show the dialog
};

const confirmLogout = () => {
  clearAuthData(); // Clear auth data
  navigate("/");
  toast.success("Logged out successfully!"); // Show toast
   // Redirect to role page
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
          <li onClick={() => setActiveSection("form")}>
            <span className="material-icons">description</span> Form
          </li>
          <li onClick={() => setActiveSection("calendar")}>
            <span className="material-icons">calendar_today</span> Calendar
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
    <span
      className="material-icons notification-icon"
      onClick={() => setActiveSection("Notification")}
      style={{ cursor: "pointer" }}
    >
      notifications
      {notifications.filter((n) => !n.read).length > 0 && (
        <span className="notification-badge"></span> // Removed the number
      )}
            </span>
          </div>
        </header>
        <hr />

        {/* Render sections dynamically */}
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

      

{activeSection === "form" && <JoinCommunityForm activeSection={activeSection} />}


        {activeSection === "calendar" && (
          <div className="box calendar-section">
            <h2>Events</h2>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
            <p>
              <strong>Events on {selectedDate.toLocaleDateString()}:</strong>
            </p>
            <ul>
              <li>Event 1: Meeting at 10 AM</li>
              <li>Event 2: Community Lunch at 1 PM</li>
              <li>Event 3: Workshop at 3 PM</li>
            </ul>
          </div>
        )}

        {activeSection === "Notification" && (
          <div className="box notification-section">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications available.</p>
            ) : (
              <>
                <div className="notification-header">
                  {/* <span>
                    You have {notifications.filter((n) => !n.read).length} unread notifications
                  </span> */}
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
            <p>Account settings process.</p>
          </div>
        )}

        {activeSection === "Topic-hub" && <TopicHub activeSection={activeSection} />}

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
      </main>
    </div>
  );
};

export default Dashboard;







