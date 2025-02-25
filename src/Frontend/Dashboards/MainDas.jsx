// // import React, { useState } from "react";
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import "../Dashboard.css";
// // 
// // const MainDas = () => {
// //     const [selectedDate, setSelectedDate] = useState(new Date());
// //       const [activeSection, setActiveSection] = useState("dashboard"); 
// //   return (
// //     <div className="dashboard">
// //       <aside className="sidebar">
// //         <h2>Community HUB</h2>
// //         <ul>
// //           <li onClick={() => setActiveSection("dashboard")}>
// //             <span className="material-icons">dashboard</span> Dashboard
// //           </li>
// //           <li onClick={() => setActiveSection("announcement")}>
// //             <span className="material-icons">lightbulb</span> Announcement
// //           </li>
// //           <li onClick={() => setActiveSection("form")}>
// //             <span className="material-icons">description</span> Form
// //           </li>
// //           <li onClick={() => setActiveSection("poll&Voting")}>
// //             <span className="material-icons">description</span> Poll&Voting
// //           </li>
// //           <li onClick={() => setActiveSection("calendar")}>
// //             <span className="material-icons">calendar_today</span> Calendar
// //           </li>
// //           <li onClick={() => setActiveSection("notifications")}>
// //             <span className="material-icons">notifications</span> Notification
// //           </li>
// //           <li onClick={() => setActiveSection("feedback")}>
// //             <span className="material-icons">feedback</span> Feedback
// //           </li>
// //           <li onClick={() => setActiveSection("settings")}>
// //             <span className="material-icons">settings</span> Settings
// //           </li>
// //         </ul>
// //         <div className="logout">
// //           <span className="material-icons">logout</span> Logout
// //         </div>
// //       </aside>
// // 
// //       <main className="main-content">
// //         <header className="header">
// //           <h1>Welcome, Abhishek</h1>
// //           <div className="header-icons">
// //             <link
// //               rel="stylesheet"
// //               href="https://fonts.googleapis.com/icon?family=Material+Icons"
// //             />
// //             <span className="material-icons">inbox</span>
// //             <span className="material-icons">notifications</span>
// //           </div>
// //         </header>
// //         <hr />
// // 
// //         {/* Render sections dynamically */}
// //         {activeSection === "dashboard" && (
// //           <div className="content-grid">
// //           <div className="box announcements">
// //             <h2>Announcement</h2>
// //             <div className="announcement-item">
// //               <p><strong>UI Visuals</strong></p>
// //               <p> Meeting</p>
// //               <p>
// //                 There is a sprinkler that appears to be broken shooting out
// //                 water in front of my home.
// //               </p>
// //             </div>
// //             <div className="announcement-item">
// //               <p><strong>Gaming</strong></p>
// //               <p>Pool closed for maintenance...</p>
// //               <p>
// //                 From its medieval origins to the digital era, learn everything
// //                 there is to know about the ubiquitous lorem ipsum passage.
// //               </p>
// //             </div>
// //             <div className="announcement-item">
// //               <p><strong>AI Learner</strong></p>
// //               <p>Ready fo the events</p>
// //               <p>
// //                 From its medieval origins to the digital era, learn everything
// //                 there is to know about the ubiquitous lorem ipsum passage.
// //               </p>
// //             </div>
// //           </div>
// //           <div className="box poll">
// //             <h2>Poll and Voting</h2>
// //             <form>
// //               <label>
// //                 <input type="radio" name="poll" value="Morning" />
// //                 Morning
// //               </label>
// //               <label>
// //                 <input type="radio" name="poll" value="Afternoon" defaultChecked />
// //                 Afternoon
// //               </label>
// //               <label>
// //                 <input type="radio" name="poll" value="Evening" />
// //                 Evening
// //               </label>
// //               <label>
// //                 <input type="radio" name="poll" value="Night" />
// //                 Night
// //               </label>
// //               <button type="submit">Submit your vote</button>
// //             </form>
// //           </div>
// //           <div className="box events">
// //   <h2>Events</h2>
// //   <Calendar onChange={setSelectedDate} value={selectedDate} />
// //   <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
// // </div>
// //         </div>
// //         )}
// // 
// // {activeSection === "announcement" && (
// //           <div className="box announcements">
// //           <h2>Announcement</h2>
// //           <div className="announcement-item">
// //             <p><strong>UI Visuals</strong></p>
// //             <p>
// //               There is a sprinkler that appears to be broken shooting out
// //               water in front of my home.
// //             </p>
// //           </div>
// //           <div className="announcement-item">
// //             <p><strong>Gaming</strong></p>
// //             <p>
// //               From its medieval origins to the digital era, learn everything
// //               there is to know about the ubiquitous lorem ipsum passage.
// //             </p>
// //           </div>
// //           <div className="announcement-item">
// //             <p><strong>AI Learner</strong></p>
// //             <p>
// //               From its medieval origins to the digital era, learn everything
// //               there is to know about the ubiquitous lorem ipsum passage.
// //             </p>
// //           </div>
// //         </div>
// //         )}
// // 
// //         {activeSection === "form" && (
// //           <div className=" box form-section">
// //             <h2 className="form-header">Community Form</h2>
// //             <form>
// //             <div className="form1">
// //               <label>
// //                 Community Name:
// //                 <input  className="form-1" type="community-name" placeholder="Enter community name" />
// //               </label>
// //             </div>
// //             <div className="form1">
// //               <label>
// //                 Name:
// //                 <input  className="form-1" type="name" placeholder="Enter your name" />
// //               </label>
// //             </div>
// // 
// //             <div className="form2">
// //               <label>
// //                 Email:
// //                 <input className="form-1" type="email" placeholder="Enter your email" />
// //               </label>
// //             </div>
// //             <div className="form3">
// //               <label>
// //               
// //                  <div className="h3">Feedback:</div>
// //                 <textarea className="form-1" placeholder="Name, Why you choose this community?"></textarea>
// //               </label>
// //             </div>
// //             <div className="form-button">
// //                <button type="submit">Submit</button>
// //             </div>
// //             </form>
// //           </div>
// //         )}
// // 
// //         {activeSection === "calendar" && (
// //           <div className="box calendar-section">
// //             <h2>Events</h2>
// //             <Calendar onChange={setSelectedDate} value={selectedDate} />
// //             <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
// //             
// //             <ul>
// //               <li>Event 1: Meeting at 10 AM</li>
// //             </ul>
// //           </div>
// //         )}
// // 
// //         {activeSection === "notifications" && (
// //           <div className="box notifications-section">
// //             <h2>Notifications</h2>
// //             <p>You have 3 new notifications</p>
// //           </div>
// //         )}
// // 
// //         {activeSection === "feedback" && (
// //           <div className="box feedback-section">
// //             <h2>Feedback</h2>
// //             <p>View or submit feedback process.</p>
// //           </div>
// //         )}
// // 
// //         {activeSection === "settings" && (
// //           <div className="box settings-section">
// //             <h2>Settings</h2>
// //             <p>Account settings process.</p>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };
// // 
// // export default MainDas
// 
// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../Dashboard.css";
// 
// const MainDas = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [activeSection, setActiveSection] = useState("dashboard");
// 
//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <h2>Community HUB</h2>
//         <ul>
//           <li onClick={() => setActiveSection("dashboard")}>
//             <span className="material-icons">dashboard</span> Dashboard
//           </li>
//           <li onClick={() => setActiveSection("announcement")}>
//             <span className="material-icons">lightbulb</span> Announcement
//           </li>
//           <li onClick={() => setActiveSection("form")}>
//             <span className="material-icons">description</span> Form
//           </li>
//           <li onClick={() => setActiveSection("poll&Voting")}>
//             <span className="material-icons">description</span> Poll&Voting
//           </li>
//           <li onClick={() => setActiveSection("calendar")}>
//             <span className="material-icons">calendar_today</span> Calendar
//           </li>
//           <li onClick={() => setActiveSection("notifications")}>
//             <span className="material-icons">notifications</span> Notification
//           </li>
//           <li onClick={() => setActiveSection("feedback")}>
//             <span className="material-icons">feedback</span> Feedback
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
//             <span className="material-icons">notifications</span>
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
//                 <p><strong>UI Visuals</strong></p>
//                 <p>Meeting</p>
//                 <p>
//                   There is a sprinkler that appears to be broken shooting out
//                   water in front of my home.
//                 </p>
//               </div>
//               <div className="announcement-item">
//                 <p><strong>Gaming</strong></p>
//                 <p>Pool closed for maintenance...</p>
//                 <p>
//                   From its medieval origins to the digital era, learn everything
//                   there is to know about the ubiquitous lorem ipsum passage.
//                 </p>
//               </div>
//               <div className="announcement-item">
//                 <p><strong>AI Learner</strong></p>
//                 <p>Ready for the events</p>
//                 <p>
//                   From its medieval origins to the digital era, learn everything
//                   there is to know about the ubiquitous lorem ipsum passage.
//                 </p>
//               </div>
//             </div>
// 
//             <div className="box poll">
//               <h2>Poll and Voting</h2>
//               <form>
//                 <label>
//                   <input type="radio" name="poll" value="Morning" />
//                   Morning
//                 </label>
//                 <label>
//                   <input type="radio" name="poll" value="Afternoon" defaultChecked />
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
// 
//             <div className="box events">
//               <h2>Events</h2>
//               <Calendar onChange={setSelectedDate} value={selectedDate} />
//               <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
//             </div>
//           </div>
//         )}
// 
//         {activeSection === "announcement" && (
//           <div className="box announcements">
//             <h2>Announcement</h2>
//             <div className="announcement-item">
//               <p><strong>UI Visuals</strong></p>
//               <p>There is a sprinkler that appears to be broken shooting out water in front of my home.</p>
//             </div>
//             <div className="announcement-item">
//               <p><strong>Gaming</strong></p>
//               <p>
//                 From its medieval origins to the digital era, learn everything
//                 there is to know about the ubiquitous lorem ipsum passage.
//               </p>
//             </div>
//             <div className="announcement-item">
//               <p><strong>AI Learner</strong></p>
//               <p>
//                 From its medieval origins to the digital era, learn everything
//                 there is to know about the ubiquitous lorem ipsum passage.
//               </p>
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
//                   <input className="form-1" type="text" placeholder="Enter community name" />
//                 </label>
//               </div>
//               <div className="form1">
//                 <label>
//                   Name:
//                   <input className="form-1" type="text" placeholder="Enter your name" />
//                 </label>
//               </div>
//               <div className="form2">
//                 <label>
//                   Email:
//                   <input className="form-1" type="email" placeholder="Enter your email" />
//                 </label>
//               </div>
//               <div className="form3">
//                 <label>
//                   <div className="h3">Feedback:</div>
//                   <textarea className="form-1" placeholder="Name, Why you choose this community?"></textarea>
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
//             <ul>
//               <li>Event 1: Meeting at 10 AM</li>
//             </ul>
//           </div>
//         )}
// 
//         {activeSection === "notifications" && (
//           <div className="box notifications-section">
//             <h2>Notifications</h2>
//             <p>You have 3 new notifications</p>
//           </div>
//         )}
// 
//         {activeSection === "feedback" && (
//           <div className="box feedback-section">
//             <h2>Feedback</h2>
//             <p>View or submit feedback process.</p>
//           </div>
//         )}
// 
//         {activeSection === "settings" && (
//           <div className="box settings-section">
//             <h2>Settings</h2>
//             <p>Account settings process.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
// 
// export default MainDas;
// 


import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Dashboard.css";

const MainDas = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  
  const handleAddEvent = () => {
    // Add event logic
    alert("Event Added");
  };
  
  const handleUpdateEvent = () => {
    // Update event logic
    alert("Event Updated");
  };
  
  const handleDeleteEvent = () => {
    // Delete event logic
    alert("Event Deleted");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Community HUB</h2>
        <ul>
          <li onClick={() => setActiveSection("dashboard")}>
            <span className="material-icons">dashboard</span> Dashboard
          </li>
          <li onClick={() => setActiveSection("announcement")}>
            <span className="material-icons">lightbulb</span> Announcement
          </li>
          <li onClick={() => setActiveSection("form")}>
            <span className="material-icons">description</span> Form
          </li>
          <li onClick={() => setActiveSection("poll&Voting")}>
            <span className="material-icons">description</span> Poll&Voting
          </li>
          <li onClick={() => setActiveSection("calendar")}>
            <span className="material-icons">calendar_today</span> Calendar
          </li>
          <li onClick={() => setActiveSection("notifications")}>
            <span className="material-icons">notifications</span> Notification
          </li>
          <li onClick={() => setActiveSection("feedback")}>
            <span className="material-icons">feedback</span> Feedback
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
            <span className="material-icons">notifications</span>
          </div>
        </header>
        <hr />

        {/* Render sections dynamically */}
        {activeSection === "dashboard" && (
          <div className="content-grid">
            <div className="box announcements">
              <h2>Announcement</h2>
              <div className="announcement-item">
                <p><strong>UI Visuals</strong></p>
                <p>Meeting</p>
                <p>
                  There is a sprinkler that appears to be broken shooting out
                  water in front of my home.
                </p>
              </div>
              <div className="announcement-item">
                <p><strong>Gaming</strong></p>
                <p>Pool closed for maintenance...</p>
                <p>
                  From its medieval origins to the digital era, learn everything
                  there is to know about the ubiquitous lorem ipsum passage.
                </p>
              </div>
              <div className="announcement-item">
                <p><strong>AI Learner</strong></p>
                <p>Ready for the events</p>
                <p>
                  From its medieval origins to the digital era, learn everything
                  there is to know about the ubiquitous lorem ipsum passage.
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
                  <input type="radio" name="poll" value="Afternoon" defaultChecked />
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

              <div>
                <label>
                  <input
                    type="text"
                    placeholder="Enter event"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
              </div>

              <div className="button-container">
                <button onClick={handleAddEvent}>Add</button>
                <button onClick={handleUpdateEvent}>Update</button>
                <button onClick={handleDeleteEvent}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "announcement" && (
          <div className="box announcements">
            <h2>Announcement</h2>
            <div className="announcement-item">
              <p><strong>UI Visuals</strong></p>
              <p>There is a sprinkler that appears to be broken shooting out water in front of my home.</p>
            </div>
            <div className="announcement-item">
              <p><strong>Gaming</strong></p>
              <p>
                From its medieval origins to the digital era, learn everything
                there is to know about the ubiquitous lorem ipsum passage.
              </p>
            </div>
            <div className="announcement-item">
              <p><strong>AI Learner</strong></p>
              <p>
                From its medieval origins to the digital era, learn everything
                there is to know about the ubiquitous lorem ipsum passage.
              </p>
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
                  <input className="form-1" type="text" placeholder="Enter community name" />
                </label>
              </div>
              <div className="form1">
                <label>
                  Name:
                  <input className="form-1" type="text" placeholder="Enter your name" />
                </label>
              </div>
              <div className="form2">
                <label>
                  Email:
                  <input className="form-1" type="email" placeholder="Enter your email" />
                </label>
              </div>
              <div className="form3">
                <label>
                  <div className="h3">Feedback:</div>
                  <textarea className="form-1" placeholder="Name, Why you choose this community?"></textarea>
                </label>
              </div>
              <div className="form-button">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        )}

        {/* {activeSection === "calendar" && (
          <div className="box calendar-section">
            <h2>Events</h2>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>

            <ul>
              <li>Event 1: Meeting at 10 AM</li>
            </ul>
          </div>
        )} */}
        {activeSection === "calendar" && (
  <div className="box calendar-section">
    <h2>Events</h2>
    <Calendar onChange={setSelectedDate} value={selectedDate} />
    <p>Selected Date: {selectedDate.toLocaleDateString()}</p>

    <div className="form">
      <div className="form-group">
        <label>Date:</label>
        <input 
          type="text" 
          value={selectedDate.toLocaleDateString()} 
          disabled
        />
      </div>
      <div className="form-group">
        <label>Event:</label>
        <input 
          type="text" 
          placeholder="Enter event name"
          // Add your state and event handler here for event input
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          placeholder="Enter event description"
          // Add your state and event handler here for description input
        ></textarea>
      </div>
      <div className="form-buttons">
        <button
          onClick={() => {
            // Handle Add functionality here
          }}
        >
          Add Event
        </button>
        <button
          onClick={() => {
            // Handle Update functionality here
          }}
        >
          Update Event
        </button>
        <button
          onClick={() => {
            // Handle Delete functionality here
          }}
        >
          Delete Event
        </button>
      </div>
    </div>

    <ul>
      <li>Event 1: Meeting at 10 AM</li>
      {/* Display other events here */}
    </ul>
  </div>
)}


        {activeSection === "notifications" && (
          <div className="box notifications-section">
            <h2>Notifications</h2>
            <p>You have 3 new notifications</p>
          </div>
        )}

        {activeSection === "feedback" && (
          <div className="box feedback-section">
            <h2>Feedback</h2>
            <p>View or submit feedback process.</p>
          </div>
        )}

        {activeSection === "settings" && (
          <div className="box settings-section">
            <h2>Settings</h2>
            <p>Account settings process.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainDas;
