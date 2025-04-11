import React from "react";
// import "./dasboard";

const JoinCommunityForm = () => {
  return (
    <div className="community-join-container">
      <div className="community-join-card">
        <h2 className="community-join-title">Join Our Community</h2>
        <form className="community-join-form">
          <div className="form-row">
            <label htmlFor="community-select" className="input-label">
              Community Name
            </label>
            <select
              id="community-select"
              className="form-input select-input"
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
              placeholder="Your user name"
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
              placeholder="your.email@example.com"
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
              required
            ></textarea>
          </div>

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
