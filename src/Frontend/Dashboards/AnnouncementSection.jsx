import React, { useState, useMemo, useEffect } from "react";
import useAuthStore from "../Store/authStore";
import axios from "axios";
import { toast } from "sonner";

const AnnouncementSection = ({ activeSection }) => {
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]); // Store announcements
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null); // Track the announcement being updated

  const token = useAuthStore((state) => state.token);
  const communityName = useAuthStore((state) => state.communityName); // Community name of the logged-in user

  const userId = useMemo(() => token?.user?._id, [token]);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/a2/announcements");
      setAnnouncements(res.data); // Store all announcements
    } catch (error) {
      toast.error("Failed to fetch announcements");
      console.error("Fetch error:", error);
    }
  };

  // Run once on mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Filter announcements based on the logged-in user's community name
  const filteredAnnouncements = announcements.filter(
    (announcement) => announcement.title === communityName // Filter by community name
  );

  const openModal = (announcement = null) => {
    setIsModalOpen(true);
    if (announcement) {
      setCurrentAnnouncement(announcement);
      setAnnouncementDescription(announcement.content);
    } else {
      setCurrentAnnouncement(null); // New announcement
      setAnnouncementDescription(""); // Reset description for new announcement
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncementDescription("");
  };

  const handleAddOrUpdateAnnouncement = async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const payload = {
      title: communityName, // Assign community name to the announcement
      content: announcementDescription,
      created_by: userId,
      expires_at: expiresAt.toISOString(),
    };

    try {
      let response;
      if (currentAnnouncement) {
        // Update
        response = await axios.put(
          `http://localhost:4000/api/a2/announcements/${currentAnnouncement._id}`,
          payload
        );
        toast.success("Announcement updated successfully!");
      } else {
        // Create
        response = await axios.post("http://localhost:4000/api/a2/announcements", payload);
        toast.success("Announcement created successfully!");
      }
      fetchAnnouncements(); // Refresh the list after creating or updating
      closeModal();
    } catch (error) {
      toast.error("Failed to save announcement");
      console.error(error.response?.data || error.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/a2/announcements/${id}`);
      toast.success("Announcement deleted successfully!");
      fetchAnnouncements(); // Refresh the list after deletion
    } catch (error) {
      toast.error("Failed to delete announcement");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    activeSection === "announcement" && (
      <div className="announcements-container">
        <div className="box announcements">
          <h2>Announcements for {communityName}</h2> {/* Display community name in the header */}

          {filteredAnnouncements.length === 0 ? (
            <p>No announcements yet for {communityName}.</p>
          ) : (
            filteredAnnouncements.map((a) => (
              <div key={a._id} className="announcement-item">
                <p><strong>{a.title}</strong></p>
                <p>{a.content}</p>
                <p><small>Expires: {new Date(a.expires_at).toLocaleDateString()}</small></p>
                <div className="announcement-buttons">
                  <button
                    className="update-button"
                    onClick={() => openModal(a)} // Open modal to update
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteAnnouncement(a._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="add-button" onClick={() => openModal()}>Add Announcement</button>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{currentAnnouncement ? "Update Announcement" : "Add Announcement"}</h3>
              <div className="modal-input">
                <label>Community:</label>
                <input type="text" value={communityName} readOnly disabled />
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
                <button onClick={handleAddOrUpdateAnnouncement}>OK</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default AnnouncementSection;
