import React, { useState, useEffect } from "react";
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
  const [communities, setCommunities] = useState([]); // State for fetched communities
  const [loadingCommunities, setLoadingCommunities] = useState(true); // State for loading communities

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

  // Fetch community names from API when component mounts
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoadingCommunities(true);
        const response = await axios.get("http://localhost:4000/api/a1/getcommunity");
        
        // Log the full response for debugging
        console.log("API response from /api/a1/getcommunity:", response.data);

        const communityData = response.data;

        // Check if the response has a nested 'communities' array (e.g., { communities: [...] })
        if (communityData && Array.isArray(communityData.communities)) {
          setCommunities(communityData.communities);
          // Log the communities state for debugging
          console.log("Fetched communities:", communityData.communities);
        } else {
          throw new Error("Unexpected API response format: Expected an object with a 'communities' array.");
        }
        setLoadingCommunities(false);
      } catch (err) {
        console.error("Error fetching communities:", err.response || err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch communities.";
        setError(errorMessage);
        toast.error(errorMessage); // Sonner error toast
        setLoadingCommunities(false);
      }
    };

    fetchCommunities();
  }, []);

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
              disabled={loadingCommunities}
            >
              <option value="">
                {loadingCommunities
                  ? "Loading communities..."
                  : communities.length === 0
                  ? "No communities available"
                  : "Select a community"}
              </option>
              {communities.map((community, index) => {
                console.log("Rendering community option:", community); // Debug log
                return (
                  <option key={index} value={community.name}>
                    {community.name}
                  </option>
                );
              })}
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