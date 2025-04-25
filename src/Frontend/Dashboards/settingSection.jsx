// import React, { useState, useEffect } from "react";
// import useAuthStore from "../Store/authStore"; 
// 
// const SettingsSection = () => {
//   const { user } = useAuthStore(); 
//   const [userSettings, setUserSettings] = useState({
//     userId: "",
//     userName: "",
//     email: "",
//     role: "",
//     community: "",
//   });
// 
// 
//   
//   const [showPasswordDialog, setShowPasswordDialog] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
// 
//   useEffect(() => {
//     if (user) {
//       setUserSettings({
//         userId: user.user_id || "N/A",
//         userName: user.username || "",
//         email: user.email || "",
//         role: user.role || "member",
//         community: user.community || "None",
//       });
//     }
//   }, [user]);
// 
//   const handleSettingsChange = (e) => {
//     const { name, value } = e.target;
//     setUserSettings((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
// 
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
// 
//   const handleSaveSettings = () => {
//     // You can call an API here to update username, email, community
//     console.log("Saving settings:", userSettings);
//     alert("Settings updated successfully!");
//   };
// 
//   const handlePasswordSubmit = () => {
//     const { oldPassword, newPassword, confirmPassword } = passwordData;
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       alert("Please fill all password fields.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       alert("New password and confirm password do not match.");
//       return;
//     }
// 
//     // You can make API call here with oldPassword and newPassword
//     console.log("Change password request:", passwordData);
//     alert("Password changed successfully!");
//     setPasswordData({
//       oldPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//     setShowPasswordDialog(false);
//   };
// 
//   return (
//     <div className="settings-card">
//       <div className="header-section">
//         <h2 className="settings-title">Settings</h2>
//         <button
//           className="btn btn-secondary"
//           onClick={() => setShowPasswordDialog(true)}
//         >
//           Change Password
//         </button>
//       </div>
//       <div className="settings-content">
//         <h3 className="section-heading">Profile Information</h3>
//         <div className="profile-form">
//           <div className="input-group">
//             <label className="input-label">User ID:</label>
//             <input type="text" value={userSettings.userId} disabled className="input-field disabled" />
//           </div>
//           <div className="input-group">
//             <label className="input-label">Username:</label>
//             <input
//               type="text"
//               name="userName"
//               value={userSettings.userName}
//               onChange={handleSettingsChange}
//               placeholder="Enter your username"
//               className="input-field"
//             />
//           </div>
//           <div className="input-group">
//             <label className="input-label">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={userSettings.email}
//               onChange={handleSettingsChange}
//               placeholder="Enter your email"
//               className="input-field"
//             />
//           </div>
//           <div className="input-group">
//             <label className="input-label">Role:</label>
//             <input type="text" value={userSettings.role} disabled className="input-field disabled" />
//           </div>
//           <div className="input-group">
//             <label className="input-label">Community:</label>
//             <input
//               type="text"
//               name="community"
//               value={userSettings.community}
//               onChange={handleSettingsChange}
//               placeholder="Enter community name"
//               className="input-field disabled"
//               disabled
//             />
//           </div>
//         </div>
//         <div className="action-buttons">
//           <button className="btn btn-primary" onClick={handleSaveSettings}>
//             Save Settings
//           </button>
//         </div>
//       </div>
// 
//       {showPasswordDialog && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3 className="modal-title">Change Password</h3>
//             <div className="input-group">
//               <label className="input-label">Old Password:</label>
//               <input
//                 type="password"
//                 name="oldPassword"
//                 value={passwordData.oldPassword}
//                 onChange={handlePasswordChange}
//                 className="input-field"
//               />
//             </div>
//             <div className="input-group">
//               <label className="input-label">New Password:</label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 value={passwordData.newPassword}
//                 onChange={handlePasswordChange}
//                 className="input-field"
//               />
//             </div>
//             <div className="input-group">
//               <label className="input-label">Confirm Password:</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={passwordData.confirmPassword}
//                 onChange={handlePasswordChange}
//                 className="input-field"
//               />
//             </div>
//             <div className="modal-actions">
//               <button className="btn btn-primary" onClick={handlePasswordSubmit}>
//                 Submit
//               </button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowPasswordDialog(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// 
// export default SettingsSection;

import React, { useState, useEffect } from "react";
import useAuthStore from "../Store/authStore";

const SettingsSection = () => {
  const { user, token, setAuthData } = useAuthStore();
  const [userSettings, setUserSettings] = useState({
    userId: "",
    userName: "",
    email: "",
    role: "",
    community: "",
  });

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user data from the backend using userId from Zustand store
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Set userId from Zustand store immediately
        const userId = user?._id || "N/A";
        setUserSettings((prev) => ({
          ...prev,
          userId,
        }));

        if (userId && userId !== "N/A") {
          // Fetch all users from the backend
          const response = await fetch("http://localhost:4000/api/auth/all-users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token for authentication
            },
          });

          const data = await response.json();

          if (response.ok) {
            // Find the user matching the userId from Zustand store
            const matchedUser = data.find((u) => u._id === userId);
            if (matchedUser) {
              setUserSettings({
                userId: matchedUser._id || "N/A",
                userName: matchedUser.username || "",
                email: matchedUser.email || "",
                role: matchedUser.role || "member",
                community: matchedUser.community_name || "None",
              });
            } else {
              console.error("User not found in backend data");
            }
          } else {
            console.error("Failed to fetch users:", data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user, token]);

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setUserSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle saving updated username and email
  const handleSaveSettings = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/all-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({
          userId: userSettings.userId,
          username: userSettings.userName,
          email: userSettings.email,
          role: userSettings.role, // Pass role as well, even if unchanged
          community_name: userSettings.community, // Pass community as well
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update Zustand store with new user data
        setAuthData({
          token,
          role: userSettings.role,
          user: {
            _id: userSettings.userId,
            username: userSettings.userName,
            email: userSettings.email,
            role: userSettings.role,
          },
          community: user.community, // Keep existing community data
          communityName: userSettings.community,
          email: userSettings.email,
          username: userSettings.userName,
        });
        alert("Settings updated successfully!");
      } else {
        alert(data.message || "Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Error updating settings");
    }
  };

  // Handle password update
  const handlePasswordSubmit = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({
          userId: userSettings.userId,
          password: newPassword, // Send new password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Password changed successfully!");
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordDialog(false);
      } else {
        alert(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  return (
    <div className="settings-card">
      <div className="header-section">
        <h2 className="settings-title">Settings</h2>
        <button
          className="btn btn-secondary"
          onClick={() => setShowPasswordDialog(true)}
        >
          Change Password
        </button>
      </div>
      <div className="settings-content">
        <h3 className="section-heading">Profile Information</h3>
        <div className="profile-form">
          <div className="input-group">
            <label className="input-label">User ID:</label>
            <input type="text" value={userSettings.userId} disabled className="input-field disabled" />
          </div>
          <div className="input-group">
            <label className="input-label">Username:</label>
            <input
              type="text"
              name="userName"
              value={userSettings.userName}
              onChange={handleSettingsChange}
              placeholder="Enter your username"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email:</label>
            <input
              type="email"
              name="email"
              value={userSettings.email}
              onChange={handleSettingsChange}
              placeholder="Enter your email"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Role:</label>
            <input type="text" value={userSettings.role} disabled className="input-field disabled" />
          </div>
          <div className="input-group">
            <label className="input-label">Community:</label>
            <input
              type="text"
              name="community"
              value={userSettings.community}
              onChange={handleSettingsChange}
              placeholder="Enter community name"
              className="input-field disabled"
              disabled
            />
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={handleSaveSettings}>
            Save Settings
          </button>
        </div>
      </div>

      {showPasswordDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Change Password</h3>
            <div className="input-group">
              <label className="input-label">Old Password:</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label className="input-label">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="input-field"
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handlePasswordSubmit}>
                Submit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;