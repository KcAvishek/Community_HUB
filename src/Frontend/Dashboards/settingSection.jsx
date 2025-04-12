import React from 'react'

const settingSection = () => {

      // State for settings
      const [userSettings, setUserSettings] = useState({
        fullName: "Abhishek K.C.",
        email: "abhi@gmail.com",
        password: "********",
      });
    
      // Settings handlers
      const handleSettingsChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserSettings((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
      const handleSaveSettings = () => {
        console.log("Saving settings:", userSettings);
        alert("Settings Saved");
      };
  return (
    <div className="box settings-section">
    <h2>Settings</h2>
    <div className="settings-container">
      <h3>Profile Settings</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={userSettings.fullName}
            onChange={handleSettingsChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userSettings.email}
            onChange={handleSettingsChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userSettings.password}
            onChange={handleSettingsChange}
            placeholder="Enter new password"
          />
        </div>
      </div>
      <div className="settings-actions">
        <button className="action-btn save-btn" onClick={handleSaveSettings}>Save Settings</button>
      </div>
    </div>
  </div>

  )
}

export default settingSection