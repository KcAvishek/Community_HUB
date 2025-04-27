import React, { useState, useEffect } from "react";
import useAuthStore from "../Store/authStore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SettingsSection = () => {
  const { user, setAuthData } = useAuthStore();

  // Form for profile settings (username, email)
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
    reset: resetProfileForm,
  } = useForm();

  // Form for password change (oldPassword, newPassword, confirmPassword)
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch: watchPassword,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm();

  const [userSettings, setUserSettings] = useState({
    userId: "",
    userName: "",
    email: "",
    role: "",
    community: "",
  });

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode for Save Settings button visibility

  // Fetch user data from the backend using userId from Zustand store
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = user?._id || "N/A";
        setUserSettings((prev) => ({
          ...prev,
          userId,
        }));

        if (userId && userId !== "N/A") {
          const response = await fetch("http://localhost:4000/api/auth/all-users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch users: ${response.status} - ${errorText}`);
            toast.error(`Failed to fetch user data: ${errorText}`);
            return;
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            const errorText = await response.text();
            console.error("Response is not JSON:", errorText);
            toast.error("Server returned an invalid response.");
            return;
          }

          const data = await response.json();
          const matchedUser = data.find((u) => u._id === userId);
          if (matchedUser) {
            setUserSettings({
              userId: matchedUser._id || "N/A",
              userName: matchedUser.username || "",
              email: matchedUser.email || "",
              role: matchedUser.role || "member",
              community: matchedUser.community_name || "None",
            });
            // Set form values for react-hook-form
            setProfileValue("userName", matchedUser.username || "");
            setProfileValue("email", matchedUser.email || "");
          } else {
            console.error("User not found in backend data");
            toast.error("User not found in backend data.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data: " + error.message);
      }
    };

    fetchUserData();
  }, [user, setProfileValue]);

  // Handle saving updated username and email
  const onProfileSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userSettings.userId,
          username: data.userName,
          email: data.email,
          role: userSettings.role, // Use the unchanged role value
          community_name: userSettings.community, // Use the unchanged community value
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update settings: ${response.status} - ${errorText}`);
        toast.error(`Failed to update settings: ${errorText}`);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Response is not JSON:", errorText);
        toast.error("Server returned an invalid response.");
        return;
      }

      const responseData = await response.json();

      if (responseData.success) {
        setAuthData({
          role: userSettings.role,
          user: {
            _id: userSettings.userId,
            username: data.userName,
            email: data.email,
            role: userSettings.role,
          },
          community: user.community,
          communityName: userSettings.community,
          email: data.email,
          username: data.userName,
        });
        setUserSettings((prev) => ({
          ...prev,
          userName: data.userName,
          email: data.email,
        }));
        toast.success("Settings updated successfully!");
        setIsEditMode(false); // Exit edit mode after saving
        // Reset the form to ensure the values are in sync with userSettings
        resetProfileForm({
          userName: data.userName,
          email: data.email,
        });
      } else {
        toast.error(responseData.message || "Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Error updating settings: " + error.message);
    }
  };

  // Handle password update with old password verification first
  const onPasswordSubmit = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;

    try {
      // Step 1: Verify the old password by fetching the user's current password
      const userResponse = await fetch("http://localhost:4000/api/auth/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error(`Failed to fetch user data: ${userResponse.status} - ${errorText}`);
        toast.error(`Failed to verify password: ${errorText}`);
        return;
      }

      const contentType = userResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await userResponse.text();
        console.error("Response is not JSON:", errorText);
        toast.error("Server returned an invalid response.");
        return;
      }

      const usersData = await userResponse.json();
      const matchedUser = usersData.find((u) => u._id === userSettings.userId);

      if (!matchedUser) {
        toast.error("User not found.");
        return;
      }

      // Verify old password
      if (matchedUser.password !== oldPassword) {
        toast.error("Old password is incorrect.");
        return;
      }

      // Step 2: If old password is correct, validate newPassword and confirmPassword
      if (!newPassword || !confirmPassword) {
        toast.error("New password and confirm password are required.");
        return;
      }

      if (newPassword.length < 6) {
        toast.error("New password must be at least 6 characters.");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }

      // Step 3: Proceed with password update
      const response = await fetch("http://localhost:4000/api/auth/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userSettings.userId,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update password: ${response.status} - ${errorText}`);
        toast.error(`Failed to update password: ${errorText}`);
        return;
      }

      const responseContentType = response.headers.get("content-type");
      if (!responseContentType || !responseContentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Response is not JSON:", errorText);
        toast.error("Server returned an invalid response.");
        return;
      }

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Password changed successfully!");
        resetPasswordForm();
        setShowPasswordDialog(false);
      } else {
        toast.error(responseData.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Error changing password: " + error.message);
    }
  };

  // Handle clicking the Edit button
  const handleEditClick = () => {
    setIsEditMode(true);
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
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="profile-form">
          <div className="input-group">
            <label className="input-label">User ID:</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={userSettings.userId}
                disabled
                className="input-field disabled"
              />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Username:</label>
            <div className="input-wrapper">
              <input
                type="text"
                {...registerProfile("userName", {
                  required: "Username is required",
                })}
                placeholder="Enter your username"
                className="input-field"
              />
              {profileErrors.userName && (
                <span className="error-message">{profileErrors.userName.message}</span>
              )}
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Email:</label>
            <div className="input-wrapper">
              <input
                type="email"
                {...registerProfile("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="input-field"
              />
              {profileErrors.email && (
                <span className="error-message">{profileErrors.email.message}</span>
              )}
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Role:</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={userSettings.role}
                disabled
                className="input-field disabled"
              />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Community:</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={userSettings.community}
                disabled
                className="input-field disabled"
              />
            </div>
          </div>
          {!isEditMode && (
            <div className="edit-button-container">
              <button
                type="button"
                className="btn btn-secondary edit-btn"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
          {isEditMode && (
            <div className="action-buttons">
              <button type="submit" className="btn btn-primary">
                Save Settings
              </button>
            </div>
          )}
        </form>
      </div>

      {showPasswordDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Change Password</h3>
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <div className="input-group">
                <label className="input-label">Old Password:</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    {...registerPassword("oldPassword", {
                      required: "Old password is required",
                    })}
                    className="input-field"
                  />
                  {passwordErrors.oldPassword && (
                    <span className="error-message">{passwordErrors.oldPassword.message}</span>
                  )}
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">New Password:</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    {...registerPassword("newPassword")}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Confirm Password:</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    {...registerPassword("confirmPassword")}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowPasswordDialog(false);
                    resetPasswordForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;