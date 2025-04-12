import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./Store/authStore";
import axios from "axios";
import { toast } from "sonner"; // Import Sonner toast

const JoinCommunityForm = () => {
  // State for form inputs
  const [communityName, setCommunityName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Get data from Zustand store
  const { username, email, user } = useAuthStore();
  const userId = user; // Use user directly as the user ID

  // Navigation for redirect
  const navigate = useNavigate();

  // Debug store state
  console.log("Zustand store state in JoinCommunityForm:", {
    username,
    email,
    user,
    userId,
    userType: typeof user, // Confirm user is a string
  });

  // Check if user is logged in
  if (!user || !username || !email) {
    const missingFields = [];
    if (!user) missingFields.push("user ID");
    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");

    return (
      <div className="community-join-container">
        <div className="community-join-card">
          <h2 className="community-join-title">Join Our Community</h2>
          <p className="error-message">
            Please log in to join a community. Missing: {missingFields.join(", ")}.
          </p>
          <button
            className="submit-button"
            onClick={() => navigate("/login")}
          >
            <span className="button-label">Go to Login</span>
          </button>
        </div>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate required fields with specific errors
    if (!communityName) {
      setError("Please select a community.");
      toast.error("Please select a community."); // Sonner error toast
      return;
    }
    if (!feedback) {
      setError("Please provide your expectations.");
      toast.error("Please provide your expectations."); // Sonner error toast
      return;
    }
    if (!userId) {
      setError("User ID is missing. Please try logging in again.");
      toast.error("User ID is missing. Please try logging in again."); // Sonner error toast
      return;
    }

    // Log data for debugging
    const formData = {
      community_name: communityName,
      username,
      email,
      feedback,
      user_id: userId,
    };
    console.log("Submitting application:", formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/a4/applications",
        formData
      );
      setSuccess(response.data.message);
      toast.success(response.data.message); // Sonner success toast
      // Reset form
      setCommunityName("");
      setFeedback("");
    } catch (err) {
      console.error("Submission error:", err.response || err);
      const errorMessage = err.response?.data?.message || "Failed to submit application.";
      setError(errorMessage);
      toast.error(errorMessage); // Sonner error toast
    }
  };

  return (
    <div className="community-join-container">
      <div className="community-join-card">
        <h2 className="community-join-title">Join Our Community</h2>
        <form className="community-join-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="community-select" className="input-label">
              Community Name
            </label>
            <select
              id="community-select"
              className="form-input select-input"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              required
            >
              <option value="">Select a community</option>
              <option value="UIvisuals">UIvisuals</option>
              <option value="AI Learners">AI Learners</option>
              <option value="Gaming Dev">Gaming Dev</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="applicant-name" className="input-label">
              User Name
            </label>
            <input
              id="applicant-name"
              className="form-input"
              type="text"
              value={username}
              disabled
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="applicant-email" className="input-label">
              Email Address
            </label>
            <input
              id="applicant-email"
              className="form-input"
              type="email"
              value={email}
              disabled
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="applicant-expectations" className="input-label">
              Your Expectations
            </label>
            <textarea
              id="applicant-expectations"
              className="form-input textarea-input"
              placeholder="What do you hope to gain from this community?"
              rows="5"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-action-row">
            <button type="submit" className="submit-button">
              <span className="button-label">Submit Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinCommunityForm;