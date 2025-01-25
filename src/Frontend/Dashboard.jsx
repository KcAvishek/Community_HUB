// import React from "react";
import React, { useState } from 'react';
import "./Dashboard.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Community HUB</h2>
        <ul>
          <li>Dashboard</li>
          <li>Form</li>
          <li>Calendar</li>
          <li>Notification</li>
          <li>Feedback</li>
          <li>Settings</li>
        </ul>
        <button className="logout">Logout</button>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Welcome, Abhishek</h1>
          <div className="header-icons">
            <span className="icon">📧</span>
            <span className="icon">🔔</span>
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="profile-pic"
            />
          </div>
        </header>
        <hr />
        <div className="content-grid">
          <div className="box announcements">
            <h2>Announcement</h2>
            <div className="announcement-item">
              <p><strong>UI Visuals</strong></p>
              <p> Meeting</p>
              <p>
                There is a sprinkler that appears to be broken shooting out
                water in front of my home.
              </p>
            </div>
            <div className="announcement-item">
              <p><strong>Gaming</strong></p>
              <p>Pool closed for maintenance...</p>
              <p>
                From its medieval origins to the digital era, learn everything
                there is to know about the ubiquitous lorem ipsum passage.
              </p>
            </div>
            <div className="announcement-item">
              <p><strong>AI Learner</strong></p>
              <p>Ready fo the events</p>
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
      </main>
    </div>
  );
};

export default Dashboard;
