import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSection, setActiveSection] = useState("dashboard"); 

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
        



        {activeSection === "form" && (
  <div className="box form-section">
    <h2 className="form-header">Community Form</h2>
    <form>
      <div className="form1">
        <label>
          Community Name:
          <select className="form-1">
            <option value="">Select a community</option>
            <option value="Uivisuals">Uivisuals</option>
            <option value="AI-learns">AI-learns</option>
            <option value="Gaming Dev">Gaming Dev</option>
            
            {/* Add more communities as needed */}
          </select>
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
          <textarea className="form-1" placeholder="Why did you choose this community?"></textarea>
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

export default Dashboard;



