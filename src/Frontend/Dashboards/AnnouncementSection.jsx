// import React, { useState } from "react";
// import useAuthStore from "../Store/authStore"; 
// import axios from "axios";
// 
// const AnnouncementSection = ({ activeSection }) => {
//   const [announcementTitle, setAnnouncementTitle] = useState("");
//   const [announcementDescription, setAnnouncementDescription] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
// 
//   // Get the community name from authStore
//   const { communityName } = useAuthStore((state) => state);  // Accessing the store
// 
//   const openModal = () => {
//     setIsModalOpen(true);
//   };
// 
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setAnnouncementTitle("");
//     setAnnouncementDescription("");
//   };
// 
//   const handleAddAnnouncement = async () => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/a2/announcements", {
//         title: announcementTitle,
//         description: announcementDescription,
//         communityName, // Get the community name from the auth store
//       });
// 
//       console.log("Announcement added:", response.data);
//       closeModal();
//     } catch (error) {
//       console.error("Error adding announcement:", error);
//     }
//   };
// 
//   const handleUpdateAnnouncement = (id) => {
//     console.log("Update announcement with ID:", id);
//     // You can implement update functionality here
//   };
// 
//   const handleDeleteAnnouncement = async (id) => {
//     try {
//       const response = await axios.delete(`/api/announcements/${id}`);
//       console.log("Announcement deleted:", response.data);
//     } catch (error) {
//       console.error("Error deleting announcement:", error);
//     }
//   };
// 
//   return (
//     activeSection === "announcement" && (
//       <div className="announcements-container">
//         <div className="box announcements">
//           <h2>Announcement</h2>
//           <div className="announcement-item">
//             <p>
//               <strong>UI Visuals</strong>
//             </p>
//             <p>
//               There is a sprinkler that appears to be broken shooting out
//               water in front of my home.
//             </p>
//             <div className="announcement-buttons">
//               <button className="update-button" onClick={() => handleUpdateAnnouncement(1)}>Update</button>
//               <button className="delete-button" onClick={() => handleDeleteAnnouncement(1)}>Delete</button>
//             </div>
//           </div>
//           {/* More announcements... */}
//         </div>
//         <button className="add-button" onClick={openModal}>
//           Add Announcement
//         </button>
// 
//         {/* Modal to Add Announcement */}
//         {isModalOpen && (
//           <div className="modal-overlay">
//             <div className="modal">
//               <h3>Add Announcement</h3>
//               <div className="modal-input">
//                 <label>Community:</label>
//                 <input
//                   type="text"
//                   placeholder="Community name "
//                   value={""} // Use the community name from authStore
//                   disabled
//                 />
//               </div>
//               
//               <div className="modal-input">
//                 <label>Description:</label>
//                 <textarea
//                   placeholder="Enter description"
//                   value={announcementDescription}
//                   onChange={(e) => setAnnouncementDescription(e.target.value)}
//                 />
//               </div>
//               <div className="modal-actions">
//                 <button onClick={closeModal}>Cancel</button>
//                 <button onClick={handleAddAnnouncement}>OK</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// };
// 
// export default AnnouncementSection;


import React, { useState, useMemo } from "react";
import useAuthStore from "../Store/authStore";
import axios from "axios";

const AnnouncementSection = ({ activeSection }) => {
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get state from Zustand store
  const token = useAuthStore((state) => state.token);
  const community = useAuthStore((state) => state.community); // optional if you need full community object
  const communityName = useAuthStore((state) => state.communityName); // ✅ get name directly

  // Derive userId from the token
  const userId = useMemo(() => token?.user?._id || null, [token]);

  // Use communityName for the announcement title
  const announcementTitle = useMemo(() => communityName || "", [communityName]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncementDescription("");
  };

  const handleAddAnnouncement = async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Default expiry: 7 days

    try {
      const response = await axios.post("http://localhost:4000/api/a2/announcements", {
        title: announcementTitle, // ✅ correct title
        content: announcementDescription,
        created_by: userId || null,
        expires_at: expiresAt.toISOString(),
      });

      console.log("Announcement added:", response.data);
      closeModal();
    } catch (error) {
      console.error("Error adding announcement:", error.response ? error.response.data : error.message);
    }
  };

  return (
    activeSection === "announcement" && (
      <div className="announcements-container">
        <div className="box announcements">
          <h2>Announcement</h2>
          {/* Static sample announcement */}
          <div className="announcement-item">
            <p><strong>{communityName || "Community Name"}</strong></p>
            <p>There is a sprinkler that appears to be broken shooting out water in front of my home.</p>
            <div className="announcement-buttons">
              <button className="update-button" onClick={() => console.log("Update clicked")}>Update</button>
              <button className="delete-button" onClick={() => console.log("Delete clicked")}>Delete</button>
            </div>
          </div>
        </div>

        <button className="add-button" onClick={openModal}>Add Announcement</button>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add Announcement</h3>

              <div className="modal-input">
                <label>Community:</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={announcementTitle}
                  readOnly
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
      </div>
    )
  );
};

export default AnnouncementSection;

