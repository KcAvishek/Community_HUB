import React from 'react'
import './dashboard.css'

const Dashboard = () => {
  return (
  <div className="App">
      <div className="sidebar">
        <h2>Community HUB</h2>
        <ul>
          <li>Dashboard</li>
          <li>Form</li>
          <li>Calendar</li>
          <li>Notification</li>
          <li>Feedback</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome, Abhishek</h1>
        <div className="announcement">
          <h2>Announcement</h2>
          <div className="announcement-item">
            <h3>Cameron Williamson</h3>
            <p>Board Meeting</p>
            <p>There is a pipe that appears to be broken shooting out water in front of my home. Please can you do something about this.</p>
          </div>
          <div className="announcement-item">
            <h3>Jenny Wilson</h3>
            <p>Pool closed for maintenance</p>
            <p>The pool is closed for the night, we have everything there is to know about the broken pump bearings.</p>
          </div>
        </div>
        <div className="poll-voting">
          <h2>Poll and Voting</h2>
          <form>
            <label>
              <input type="radio" name="time" value="morning" /> Morning
            </label>
            <label>
              <input type="radio" name="time" value="afternoon" defaultChecked /> Afternoon
            </label>
            <label>
              <input type="radio" name="time" value="evening" /> Evening
            </label>
            <label>
              <input type="radio" name="time" value="night" /> Night
            </label>
            <button type="submit">Submit your vote</button>
          </form>
        </div>
        <div className="events">
          <h2>Events</h2>
          <p>September 2020</p>
          <div className="calendar">
            {/* Calendar dates go here */}
            <div className="date">9</div>
            <div className="date">11</div>
          </div>
        </div>
        <div className="communities">
          <h2>Communities</h2>
          {/* Community content goes here */}
        </div>
      </div>
    </div>
  );
}


export default Dashboard