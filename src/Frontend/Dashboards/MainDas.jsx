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

  const handleAddEvent = () => {
    // Add event logic
    alert("Event Added");
  };

  const handleUpdateEvent = () => {
    // Update event logic
    alert("Event Updated");
  };

  const handleDeleteEvent = () => {
    // Delete event logic
    alert("Event Deleted");
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncementTitle("");
    setAnnouncementDescription("");
  };

  // Handle adding a new announcement
  const handleAddAnnouncement = () => {
    // Add your logic here to handle the new announcement
    console.log("New Announcement:", {
      title: announcementTitle,
      description: announcementDescription,
    });

    // Close the modal
    closeModal();
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
          <li onClick={() => setActiveSection("notifications")}>
            <span className="material-icons">notifications</span> Notification
          </li>
          <li onClick={() => setActiveSection("feedback")}>
            <span className="material-icons">feedback</span> Feedback
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

        {/* Render sections dynamically */}
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

        {/* Modal for adding announcements */}
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

        {/* Other sections remain unchanged */}
        {activeSection === "form" && (
          <div className="box form-section">
            <h2 className="form-header">Community Form</h2>
            <form>
              <div className="form1">
                <label>
                  Community Name:
                  <input className="form-1" type="text" placeholder="Enter community name" />
                </label>
              </div>
              <div className="form1">
                <label>
                  Name:
                  <input className="form-1" type="text" placeholder="Enter your name" />
                </label>
              </div>
              <div className="form2">
                <label>
                  Email:
                  <input className="form-1" type="email" placeholder="Enter your email" />
                </label>
              </div>
              <div className="form3">
                <label>
                  <div className="h3">Feedback:</div>
                  <textarea className="form-1" placeholder="Name, Why you choose this community?"></textarea>
                </label>
              </div>
              <div className="form-button">
                <button type="submit">Submit</button>
              </div>
            </form>
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
        <div className="form-group">
          <label>Description:</label>
          <textarea
            placeholder="Enter event description"
            className="description-input"
          ></textarea>
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







        {activeSection === "Time Track" && (
          <div className="box Time Track-section">
            {/* Time Track content */}
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="box notifications-section">
            <h2>Notifications</h2>
            <p>You have 3 new notifications</p>
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



