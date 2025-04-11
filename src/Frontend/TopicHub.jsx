import React, { useState, useEffect } from "react";

const TopicHub = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newReply, setNewReply] = useState("");

  // Simulated API call (replace with real API fetch)
  useEffect(() => {
    const fetchQuestions = async () => {
      const mockQuestions = [
        {
          _id: "1",
          title: "What’s your favorite programming language?",
          content: "I’m curious to know what everyone prefers!",
          author: { username: "Abhishek" },
          createdAt: new Date(),
          replies: [
            {
              _id: "r1",
              content: "JavaScript!",
              author: { username: "User1" },
              createdAt: new Date(),
            },
          ],
        },
      ];
      setQuestions(mockQuestions);
    };

    fetchQuestions();
  }, []);

  // Handle posting a new question
  const handlePostQuestion = (e) => {
    e.preventDefault();
    const question = {
      _id: String(Date.now()),
      title: newQuestion.title,
      content: newQuestion.content,
      author: { username: "Abhishek" }, // Replace with authenticated user
      createdAt: new Date(),
      replies: [],
    };
    setQuestions([question, ...questions]);
    setNewQuestion({ title: "", content: "" });
  };

  // Handle posting a reply
  const handlePostReply = (e, questionId) => {
    e.preventDefault();
    const reply = {
      _id: String(Date.now()),
      content: newReply,
      author: { username: "Abhishek" }, // Replace with authenticated user
      createdAt: new Date(),
    };
    setQuestions(
      questions.map((q) =>
        q._id === questionId
          ? { ...q, replies: [...q.replies, reply] }
          : q
      )
    );
    setNewReply("");
  };

  return (
    <div className="topic-hub-section">
      <h2>Topic HUB</h2>

      <div className="discussion-container">
        {/* Post New Question Form */}
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

        {/* List of Questions */}
        <div className="question-list">
          {questions.length === 0 ? (
            <p>No questions yet. Be the first to ask!</p>
          ) : (
            questions.map((question) => (
              <div key={question._id} className="question-item">
                <div className="question-header">
                  <h3>{question.title}</h3>
                  <p>
                    Posted by {question.author.username} on{" "}
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
                    : `View Replies (${question.replies.length})`}
                </button>

                {/* Replies Section */}
                {selectedQuestion?._id === question._id && (
                  <div className="replies-section">
                    <div className="reply-list">
                      {question.replies.map((reply) => (
                        <div key={reply._id} className="reply-item">
                          <p>{reply.content}</p>
                          <p>
                            - {reply.author.username} (
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

