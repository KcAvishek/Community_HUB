import React, { useState, useEffect } from "react";
import useAuthStore from "./Store/authStore";
import axios from "axios";

const TopicHub = () => {
  const { user, username } = useAuthStore(); // user should contain _id
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newReply, setNewReply] = useState("");

  const API_BASE = "http://localhost:4000/api/a6";

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get-questions`);
      const questionsWithReplies = await Promise.all(
        res.data.map(async (q) => {
          const repliesRes = await axios.get(`${API_BASE}/get-replies/${q._id}`);
          return { ...q, replies: repliesRes.data || [] };
        })
      );
      setQuestions(questionsWithReplies);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handlePostQuestion = async (e) => {
    e.preventDefault();

    // Handle user as string or object
    const userId = typeof user === 'string' ? user : user?._id;

    console.log("📌 Posting Question with:", {
      title: newQuestion.title,
      content: newQuestion.content,
      user_id: userId,
      username,
    });

    if (!userId) {
      console.error("User ID not found. Please ensure you are logged in.");
      alert("Please log in to post a question.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/post-question`, {
        title: newQuestion.title,
        content: newQuestion.content,
        user_id: userId,
        username: username || "Anonymous",
      });

      // Ensure the new question has a replies array
      const newQuestionData = { ...res.data, replies: res.data.replies || [] };
      setQuestions([newQuestionData, ...questions]);
      setNewQuestion({ title: "", content: "" });
    } catch (err) {
      console.error("Failed to post question:", err);
      alert("Failed to post question. Please try again.");
    }
  };

  const handlePostReply = async (e, questionId) => {
    e.preventDefault();

    // Handle user as string or object
    const userId = typeof user === 'string' ? user : user?._id;

    if (!userId) {
      console.error("User ID not found. Please ensure you are logged in.");
      alert("Please log in to post a reply.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/post-reply`, {
        question_id: questionId,
        content: newReply,
        user_id: userId,
        username: username || "Anonymous",
      });

      const updatedQuestions = questions.map((q) =>
        q._id === questionId ? { ...q, replies: [...(q.replies || []), res.data] } : q
      );
      setQuestions(updatedQuestions);
      setNewReply("");
    } catch (err) {
      console.error("Failed to post reply:", err);
      alert("Failed to post reply. Please try again.");
    }
  };

  return (
    <div className="topic-hub-section">
      <h2>Topic HUB</h2>

      <div className="discussion-container">
        <div className="new-question-form">
          <form onSubmit={handlePostQuestion}>
            <input
              type="text"
              placeholder="Question Title"
              value={newQuestion.title}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Describe your question..."
              value={newQuestion.content}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, content: e.target.value })
              }
              required
            ></textarea>
            <button type="submit">Post Question</button>
          </form>
        </div>

        <div className="question-list">
          {questions.length === 0 ? (
            <p>No questions yet. Network Error</p>
          ) : (
            questions.map((question) => (
              <div key={question._id} className="question-item">
                <div className="question-header">
                  <h3>{question.title}</h3>
                  <p>
                    Posted by {question.username} on{" "}
                    {new Date(question.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="question-content">
                  <p>{question.content}</p>
                </div>
                <button
                  className="view-replies-btn"
                  onClick={() =>
                    setSelectedQuestion(
                      selectedQuestion?._id === question._id ? null : question
                    )
                  }
                >
                  {selectedQuestion?._id === question._id
                    ? "Hide Replies"
                    : `View Replies (${(question.replies || []).length})`}
                </button>

                {selectedQuestion?._id === question._id && (
                  <div className="replies-section">
                    <div className="reply-list">
                      {(question.replies || []).map((reply) => (
                        <div key={reply._id} className="reply-item">
                          <p>{reply.content}</p>
                          <p>
                            - {reply.username} (
                            {new Date(reply.createdAt).toLocaleDateString()})
                          </p>
                        </div>
                      ))}
                    </div>
                    <form
                      className="new-reply-form"
                      onSubmit={(e) => handlePostReply(e, question._id)}
                    >
                      <textarea
                        placeholder="Write a reply..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        required
                      ></textarea>
                      <button type="submit">Post Reply</button>
                    </form>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicHub;