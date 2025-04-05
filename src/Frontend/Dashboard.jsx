// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./Dashboard.css";
// 
// const Dashboard = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [activeSection, setActiveSection] = useState("dashboard");
// 
//   // State for notifications
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "New Community Event",
//       message: "A new event has been scheduled for March 25, 2025.",
//       read: false,
//     },
//     {
//       id: 2,
//       title: "Form Submission",
//       message: "Your form has been successfully submitted.",
//       read: true,
//     },
//     {
//       id: 3,
//       title: "Poll Update",
//       message: "New poll results are available for review.",
//       read: false,
//     },
//   ]);
// 
//   // Handle marking a notification as read
//   const markAsRead = (id) => {
//     setNotifications(
//       notifications.map((notif) =>
//         notif.id === id ? { ...notif, read: true } : notif
//       )
//     );
//   };
// 
//   // Handle deleting a notification
//   const deleteNotification = (id) => {
//     setNotifications(notifications.filter((notif) => notif.id !== id));
//   };
// 
//   // Handle clearing all notifications
//   const clearAllNotifications = () => {
//     setNotifications([]);
//   };
// 
//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <h2>Community HUB</h2>
//         <ul>
//           <li onClick={() => setActiveSection("dashboard")}>
//             <span className="material-icons">dashboard</span> Dashboard
//           </li>
//           <li onClick={() => setActiveSection("form")}>
//             <span className="material-icons">description</span> Form
//           </li>
//           <li onClick={() => setActiveSection("calendar")}>
//             <span className="material-icons">calendar_today</span> Calendar
//           </li>
//           <li onClick={() => setActiveSection("Topic-hub")}>
//             <span className="material-icons">diversity_3</span> Topic Hub
//           </li>
//           <li onClick={() => setActiveSection("Notification")}>
//             <span className="material-icons">notifications</span> Notification
//           </li>
//           <li onClick={() => setActiveSection("settings")}>
//             <span className="material-icons">settings</span> Settings
//           </li>
//         </ul>
//         <div className="logout">
//           <span className="material-icons">logout</span> Logout
//         </div>
//       </aside>
// 
//       <main className="main-content">
//         <header className="header">
//           <h1>Welcome, Abhishek</h1>
//           <div className="header-icons">
//             <link
//               rel="stylesheet"
//               href="https://fonts.googleapis.com/icon?family=Material+Icons"
//             />
//             <span className="material-icons">inbox</span>
//             <span
//               className="material-icons notification-icon"
//               onClick={() => setActiveSection("Notification")}
//               style={{ cursor: "pointer" }}
//             >
//               notifications
//               {notifications.filter((n) => !n.read).length > 0 && (
//                 <span className="notification-badge">
//                   {notifications.filter((n) => !n.read).length}
//                 </span>
//               )}
//             </span>
//           </div>
//         </header>
//         <hr />
// 
//         {/* Render sections dynamically */}
//         {activeSection === "dashboard" && (
//           <div className="content-grid">
//             <div className="box announcements">
//               <h2>Announcement</h2>
//               <div className="announcement-item">
//                 <p>
//                   <strong>UI Visuals</strong>
//                 </p>
//                 <p>
//                   There is a sprinkler that appears to be broken shooting out
//                   water in front of my home.
//                 </p>
//               </div>
//               <div className="announcement-item">
//                 <p>
//                   <strong>Gaming</strong>
//                 </p>
//                 <p>
//                   From its medieval origins to the digital era, learn
//                   everything there is to know about the ubiquitous lorem ipsum
//                   passage.
//                 </p>
//               </div>
//               <div className="announcement-item">
//                 <p>
//                   <strong>AI Learner</strong>
//                 </p>
//                 <p>
//                   From its medieval origins to the digital era, learn
//                   everything there is to know about the ubiquitous lorem ipsum
//                   passage.
//                 </p>
//               </div>
//             </div>
//             <div className="box poll">
//               <h2>Poll and Voting</h2>
//               <form>
//                 <label>
//                   <input type="radio" name="poll" value="Morning" />
//                   Morning
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="poll"
//                     value="Afternoon"
//                     defaultChecked
//                   />
//                   Afternoon
//                 </label>
//                 <label>
//                   <input type="radio" name="poll" value="Evening" />
//                   Evening
//                 </label>
//                 <label>
//                   <input type="radio" name="poll" value="Night" />
//                   Night
//                 </label>
//                 <button type="submit">Submit your vote</button>
//               </form>
//             </div>
//             <div className="box events">
//               <h2>Events</h2>
//               <Calendar onChange={setSelectedDate} value={selectedDate} />
//               <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
//             </div>
//           </div>
//         )}
// 
//         {activeSection === "form" && (
//           <div className="box form-section">
//             <h2 className="form-header">Community Form</h2>
//             <form>
//               <div className="form1">
//                 <label>
//                   Community Name:
//                   <select className="form-1">
//                     <option value="">Select a community</option>
//                     <option value="Uivisuals">Uivisuals</option>
//                     <option value="AI-learns">AI-learns</option>
//                     <option value="Gaming Dev">Gaming Dev</option>
//                   </select>
//                 </label>
//               </div>
//               <div className="form1">
//                 <label>
//                   Name:
//                   <input
//                     className="form-1"
//                     type="text"
//                     placeholder="Enter your name"
//                   />
//                 </label>
//               </div>
//               <div className="form2">
//                 <label>
//                   Email:
//                   <input
//                     className="form-1"
//                     type="email"
//                     placeholder="Enter your email"
//                   />
//                 </label>
//               </div>
//               <div className="form3">
//                 <label>
//                   <div className="h3">Feedback:</div>
//                   <textarea
//                     className="form-1"
//                     placeholder="Why did you choose this community?"
//                   ></textarea>
//                 </label>
//               </div>
//               <div className="form-button">
//                 <button type="submit">Submit</button>
//               </div>
//             </form>
//           </div>
//         )}
// 
//         {activeSection === "calendar" && (
//           <div className="box calendar-section">
//             <h2>Events</h2>
//             <Calendar onChange={setSelectedDate} value={selectedDate} />
//             <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
//             <p>
//               <strong>Events on {selectedDate.toLocaleDateString()}:</strong>
//             </p>
//             <ul>
//               <li>Event 1: Meeting at 10 AM</li>
//               <li>Event 2: Community Lunch at 1 PM</li>
//               <li>Event 3: Workshop at 3 PM</li>
//             </ul>
//           </div>
//         )}
// 
//         {/* Updated Notification Section */}
//         {activeSection === "Notification" && (
//           <div className="box notification-section">
//             <h2>Notifications</h2>
//             {notifications.length === 0 ? (
//               <p>No notifications available.</p>
//             ) : (
//               <>
//                 <div className="notification-header">
//                   <span>
//                     You have {notifications.filter((n) => !n.read).length} unread notifications
//                   </span>
//                   {/* <button
//                     className="clear-all-btn"
//                     onClick={clearAllNotifications}
//                   >
//                     Clear All
//                   </button> */}
//                 </div>
//                 <div className="notification-list">
//                   {notifications.map((notification) => (
//                     <div
//                       key={notification.id}
//                       className={`notification-item ${notification.read ? "read" : "unread"}`}
//                     >
//                       <div className="notification-content">
//                         <h3>{notification.title}</h3>
//                         <p>{notification.message}</p>
//                         <span className="notification-time">{notification.time}</span>
//                       </div>
//                       <div className="notification-actions">
//                         {!notification.read && (
//                           <button
//                             className="mark-read-btn"
//                             onClick={() => markAsRead(notification.id)}
//                           >
//                             Mark as Read
//                           </button>
//                         )}
//                         {/* <button
//                           className="delete-btn"
//                           onClick={() => deleteNotification(notification.id)}
//                         >
//                           Delete
//                         </button> */}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}
// 
//         {activeSection === "settings" && (
//           <div className="box settings-section">
//             <h2>Settings</h2>
//             <p>Account settings process.</p>
//           </div>
//         )}
// 
//         
// {activeSection === "Topic-hub" && (
//   <div className="box topichub-section">
//    
//   </div>
// )}
//       </main>
//     </div>
//   );
// };
// 
// export default Dashboard;
// 
// 


import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSection, setActiveSection] = useState("dashboard");

  // State for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Community Event",
      message: "A new event has been scheduled for March 25, 2025.",
      read: false,
    },
    {
      id: 2,
      title: "Form Submission",
      message: "Your form has been successfully submitted.",
      read: true,
    },
    {
      id: 3,
      title: "Poll Update",
      message: "New poll results are available for review.",
      read: false,
    },
  ]);

  // State for discussion forum (Topic Hub)
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newReply, setNewReply] = useState("");

  // Fetch questions (simulated API call, replace with real fetch)
  useEffect(() => {
    const fetchQuestions = async () => {
      // Replace with actual API call: fetch("/api/questions")
      const mockQuestions = [
        {
          _id: "1",
          title: "What’s your favorite programming language?",
          content: "I’m curious to know what everyone prefers!",
          author: { username: "Abhishek" },
          createdAt: new Date(),
          replies: [
            { _id: "r1", content: "JavaScript!", author: { username: "User1" }, createdAt: new Date() },
          ],
        },
      ];
      setQuestions(mockQuestions);
    };
    if (activeSection === "Topic-hub") fetchQuestions();
  }, [activeSection]);

  // Handle marking a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Handle deleting a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // Handle clearing all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Handle posting a new question
  const handlePostQuestion = (e) => {
    e.preventDefault();
    const question = {
      _id: String(Date.now()), // Temporary ID, replace with backend-generated ID
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
      _id: String(Date.now()), // Temporary ID
      content: newReply,
      author: { username: "Abhishek" }, // Replace with authenticated user
      createdAt: new Date(),
    };
    setQuestions(
      questions.map((q) =>
        q._id === questionId ? { ...q, replies: [...q.replies, reply] } : q
      )
    );
    setNewReply("");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Community HUB</h2>
        <ul>
          <li onClick={() => setActiveSection("dashboard")}>
            <span className="material-icons">dashboard</span> Dashboard
          </li>
          <li onClick={() => setActiveSection("form")}>
            <span className="material-icons">description</span> Form
          </li>
          <li onClick={() => setActiveSection("calendar")}>
            <span className="material-icons">calendar_today</span> Calendar
          </li>
          <li onClick={() => setActiveSection("Topic-hub")}>
            <span className="material-icons">diversity_3</span> Topic Hub
          </li>
          <li onClick={() => setActiveSection("Notification")}>
            <span className="material-icons">notifications</span> Notification
          </li>
          <li onClick={() => setActiveSection("settings")}>
            <span className="material-icons">settings</span> Settings
          </li>
        </ul>
        <div className="logout">
          <span className="material-icons">logout</span> Logout
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Welcome, Abhishek</h1>
          <div className="header-icons">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            
            <span className="material-icons">inbox</span>
    <span
      className="material-icons notification-icon"
      onClick={() => setActiveSection("Notification")}
      style={{ cursor: "pointer" }}
    >
      notifications
      {notifications.filter((n) => !n.read).length > 0 && (
        <span className="notification-badge"></span> // Removed the number
      )}
            </span>
          </div>
        </header>
        <hr />

        {/* Render sections dynamically */}
        {activeSection === "dashboard" && (
          <div className="content-grid">
            <div className="box announcements">
              <h2>Announcement</h2>
              <div className="announcement-item">
                <p>
                  <strong>UI Visuals</strong>
                </p>
                <p>
                  There is a sprinkler that appears to be broken shooting out
                  water in front of my home.
                </p>
              </div>
              <div className="announcement-item">
                <p>
                  <strong>Gaming</strong>
                </p>
                <p>
                  From its medieval origins to the digital era, learn
                  everything there is to know about the ubiquitous lorem ipsum
                  passage.
                </p>
              </div>
              <div className="announcement-item">
                <p>
                  <strong>AI Learner</strong>
                </p>
                <p>
                  From its medieval origins to the digital era, learn
                  everything there is to know about the ubiquitous lorem ipsum
                  passage.
                </p>
              </div>
            </div>
            <div className="box poll">
              <h2>Poll and Voting</h2>
              <form>
                <label>
                  <input type="radio" name="poll" value="Morning" />
                  Morning
                </label>
                <label>
                  <input
                    type="radio"
                    name="poll"
                    value="Afternoon"
                    defaultChecked
                  />
                  Afternoon
                </label>
                <label>
                  <input type="radio" name="poll" value="Evening" />
                  Evening
                </label>
                <label>
                  <input type="radio" name="poll" value="Night" />
                  Night
                </label>
                <button type="submit">Submit your vote</button>
              </form>
            </div>
            <div className="box events">
              <h2>Events</h2>
              <Calendar onChange={setSelectedDate} value={selectedDate} />
              <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {activeSection === "form" && (
          <div className="box form-section">
            <h2 className="form-header">Community Form</h2>
            <form>
              <div className="form1">
                <label>
                  Community Name:
                  <select className="form-1">
                    <option value="">Select a community</option>
                    <option value="Uivisuals">Uivisuals</option>
                    <option value="AI-learns">AI-learns</option>
                    <option value="Gaming Dev">Gaming Dev</option>
                  </select>
                </label>
              </div>
              <div className="form1">
                <label>
                  Name:
                  <input
                    className="form-1"
                    type="text"
                    placeholder="Enter your name"
                  />
                </label>
              </div>
              <div className="form2">
                <label>
                  Email:
                  <input
                    className="form-1"
                    type="email"
                    placeholder="Enter your email"
                  />
                </label>
              </div>
              <div className="form3">
                <label>
                  <div className="h3">Feedback:</div>
                  <textarea
                    className="form-1"
                    placeholder="Why did you choose this community?"
                  ></textarea>
                </label>
              </div>
              <div className="form-button">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        )}

        {activeSection === "calendar" && (
          <div className="box calendar-section">
            <h2>Events</h2>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
            <p>
              <strong>Events on {selectedDate.toLocaleDateString()}:</strong>
            </p>
            <ul>
              <li>Event 1: Meeting at 10 AM</li>
              <li>Event 2: Community Lunch at 1 PM</li>
              <li>Event 3: Workshop at 3 PM</li>
            </ul>
          </div>
        )}

        {activeSection === "Notification" && (
          <div className="box notification-section">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications available.</p>
            ) : (
              <>
                <div className="notification-header">
                  {/* <span>
                    You have {notifications.filter((n) => !n.read).length} unread notifications
                  </span> */}
                </div>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.read ? "read" : "unread"}`}
                    >
                      <div className="notification-content">
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            className="mark-read-btn"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeSection === "settings" && (
          <div className="box settings-section">
            <h2>Settings</h2>
            <p>Account settings process.</p>
          </div>
        )}

        {activeSection === "Topic-hub" && (
          <div className="topic-hub-section">
            <h2>Topic HUB</h2>
            <div className="discussion-container">
              {/* Post a New Question */}
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

              {/* Question List */}
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
        )}
      </main>
    </div>
  );
};

export default Dashboard;