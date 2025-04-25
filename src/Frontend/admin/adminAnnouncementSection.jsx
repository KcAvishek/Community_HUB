import React, { useState, useMemo, useEffect } from "react";
import useAuthStore from "../Store/authStore";
import axios from "axios";
import { toast } from "sonner";

const adminAnnouncementSection = ({ activeSection }) => {
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [announcementCommunity, setAnnouncementCommunity] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]); 
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null); 

  const token = useAuthStore((state) => state.token);
  const communityName = useAuthStore((state) => state.communityName); 

  const userId = useMemo(() => token?.user?._id, [token]);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/a2/announcements");
      setAnnouncements(res.data);
    } catch (error) {
      toast.error("Failed to fetch announcements");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const openModal = (announcement = null) => {
    setIsModalOpen(true);
    if (announcement) {
      setCurrentAnnouncement(announcement);
      setAnnouncementDescription(announcement.content);
      setAnnouncementCommunity(announcement.title); // Set existing community
    } else {
      setCurrentAnnouncement(null);
      setAnnouncementDescription("");
      setAnnouncementCommunity(communityName); // Default to current user's community
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncementDescription("");
    setAnnouncementCommunity("");
  };

  const handleAddOrUpdateAnnouncement = async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const payload = {
      title: announcementCommunity, // Use editable input
      content: announcementDescription,
      created_by: userId,
      expires_at: expiresAt.toISOString(),
    };

    try {
      let response;
      if (currentAnnouncement) {
        response = await axios.put(
          `http://localhost:4000/api/a2/announcements/${currentAnnouncement._id}`,
          payload
        );
        toast.success("Announcement updated successfully!");
      } else {
        response = await axios.post("http://localhost:4000/api/a2/announcements", payload);
        toast.success("Announcement created successfully!");
      }
      fetchAnnouncements();
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
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to delete announcement");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    activeSection === "announcement" && (
      <div className="announcements-container">
        <div className="box announcements">
          <h2>All Announcements</h2>

          {announcements.length === 0 ? (
            <p>No announcements yet.</p>
          ) : (
            announcements.map((a) => (
              <div key={a._id} className="announcement-item">
                <p><strong>{a.title}</strong></p>
                <p>{a.content}</p>
                <p><small>Expires: {new Date(a.expires_at).toLocaleDateString()}</small></p>
                <div className="announcement-buttons">
                  <button
                    className="update-button"
                    onClick={() => openModal(a)}
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
                <input
                  type="text"
                  value={announcementCommunity}
                  onChange={(e) => setAnnouncementCommunity(e.target.value)}
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
                <button onClick={handleAddOrUpdateAnnouncement}>OK</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default adminAnnouncementSection;
