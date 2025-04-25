import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../dashboard.css";
import axios from "axios";



const DashboardSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [communityNames, setCommunityNames] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  // Fetch announcements and community names on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/a2/announcements");
        // Assuming the API returns an array of announcements with title and content
        setAnnouncements(response.data);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setError("Failed to fetch announcements. Please try again later.");
      }
    };

    const fetchCommunities = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/a1/getcommunity");
        // Assuming the API returns { communities: [{ name: "Community Name" }, ...] }
        if (response.data && Array.isArray(response.data.communities)) {
          const names = response.data.communities.map(community => community.name);
          setCommunityNames(names);
        } else {
          throw new Error("Unexpected response format for communities");
        }
      } catch (err) {
        console.error("Failed to fetch communities:", err);
        setError("Failed to fetch communities. Please try again later.");
      }
    };

    fetchAnnouncements();
    fetchCommunities();
  }, []);

  return (
    <div className="dashboard-section">
      <div className="content-grid">
        {/* Announcements */}
        <div className="box announcements">
          <h2 className="announcements-heading">Announcements</h2>
          {error && <p className="error-text">{error}</p>}
          {announcements.length === 0 && !error ? (
            <p>No announcements available.</p>
          ) : (
            announcements.map((announcement, index) => (
              <div key={index} className="announcement-item">
                <p><strong>{announcement.title || "Untitled"}</strong></p>
                <p>{announcement.content || "No content available."}</p>
              </div>
            ))
          )}
        </div>

        {/* Event Calendar */}
        <div className="box events">
          <h2 className="events-heading">Events</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        </div>

        {/* Communities */}
        <div className="box poll">
          <h2 className="communities-heading">Communities</h2>
          <div className="community-table-wrapper">
            <table className="community-table">
              <thead>
                <tr>
                  {/* Empty header */}
                </tr>
              </thead>
              <tbody>
                {communityNames.length === 0 ? (
                  <tr>
                    <td>No communities available.</td>
                  </tr>
                ) : (
                  communityNames.map((name, index) => (
                    <tr key={index}>
                      <td>{name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;