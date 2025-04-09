// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// 
// 
// const CalendarSection = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventDesc, setEventDesc] = useState("");
//   const [events, setEvents] = useState([]);
//   const [editingId, setEditingId] = useState(null);
// 
//   const handleAddEvent = () => {
//     if (!eventTitle.trim()) {
//       alert("Please enter event title");
//       return;
//     }
// 
//     const newEvent = {
//       id: Date.now(),
//       date: new Date(selectedDate),
//       title: eventTitle,
//       description: eventDesc
//     };
// 
//     setEvents([...events, newEvent]);
//     resetForm();
//     alert("Event added!");
//   };
// 
//   const handleUpdateEvent = () => {
//     if (!editingId) {
//       alert("No event selected to update");
//       return;
//     }
// 
//     setEvents(events.map(ev => 
//       ev.id === editingId 
//         ? { ...ev, title: eventTitle, description: eventDesc } 
//         : ev
//     ));
//     
//     resetForm();
//     alert("Event updated!");
//   };
// 
//   const handleDeleteEvent = () => {
//     if (!editingId) {
//       alert("No event selected to delete");
//       return;
//     }
// 
//     setEvents(events.filter(ev => ev.id !== editingId));
//     resetForm();
//     alert("Event deleted!");
//   };
// 
//   const handleEdit = (event) => {
//     setEditingId(event.id);
//     setEventTitle(event.title);
//     setEventDesc(event.description);
//   };
// 
//   const resetForm = () => {
//     setEditingId(null);
//     setEventTitle("");
//     setEventDesc("");
//   };
// 
//   const getDateEvents = () => {
//     return events.filter(
//       ev => ev.date.toDateString() === selectedDate.toDateString()
//     );
//   };
// 
//   return (
//     <div className="cs-container">
//       <h2 className="cs-title">Community Events Calendar</h2>
//       
//       <div className="cs-main">
//         <div className="cs-calendar-wrapper">
//           <Calendar 
//             onChange={setSelectedDate} 
//             value={selectedDate}
//             className="cs-calendar"
//             tileContent={({ date }) => {
//               const hasEvents = events.some(
//                 ev => ev.date.toDateString() === date.toDateString()
//               );
//               return hasEvents ? <div className="cs-event-dot"></div> : null;
//             }}
//           />
//         </div>
// 
//         <div className="cs-form">
//           <div className="cs-form-group">
//             <label className="cs-label">Selected Date:</label>
//             <input
//               type="text"
//               className="cs-date-input"
//               value={selectedDate.toLocaleDateString()}
//               readOnly
//             />
//           </div>
// 
//           <div className="cs-form-group">
//             <label className="cs-label">Event Title:</label>
//             <input
//               type="text"
//               className="cs-input"
//               value={eventTitle}
//               onChange={(e) => setEventTitle(e.target.value)}
//               placeholder="Enter event name"
//             />
//           </div>
// 
//           <div className="cs-form-group">
//             <label className="cs-label">Description:</label>
//             <textarea
//               className="cs-textarea"
//               value={eventDesc}
//               onChange={(e) => setEventDesc(e.target.value)}
//               placeholder="Event details..."
//               rows="4"
//             />
//           </div>
// 
//           <div className="cs-actions">
//             {editingId ? (
//               <>
//                 <button 
//                   className="cs-btn cs-update-btn"
//                   onClick={handleUpdateEvent}
//                 >
//                   Update
//                 </button>
//                 <button 
//                   className="cs-btn cs-delete-btn"
//                   onClick={handleDeleteEvent}
//                 >
//                   Delete
//                 </button>
//                 <button 
//                   className="cs-btn cs-cancel-btn"
//                   onClick={resetForm}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button 
//                 className="cs-btn cs-add-btn"
//                 onClick={handleAddEvent}
//               >
//                 Add Event
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
// 
//       <div className="cs-events">
//         <h3 className="cs-events-title">
//           Events on {selectedDate.toLocaleDateString()}:
//         </h3>
//         
//         {getDateEvents().length > 0 ? (
//           <ul className="cs-events-list">
//             {getDateEvents().map(ev => (
//               <li key={ev.id} className="cs-event-item">
//                 <div className="cs-event-content">
//                   <h4 className="cs-event-title">{ev.title}</h4>
//                   {ev.description && (
//                     <p className="cs-event-desc">{ev.description}</p>
//                   )}
//                 </div>
//                 <button 
//                   className="cs-edit-btn"
//                   onClick={() => handleEdit(ev)}
//                 >
//                   Edit
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="cs-no-events">No events scheduled for this date</p>
//         )}
//       </div>
//     </div>
//   );
// };
// 
// export default CalendarSection;
// import useAuthStore from "../Store/authStore";















// 
// 
// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import useAuthStore from "../Store/authStore";
// import axios from "axios";
// import { toast } from "sonner";
// 
// const API_URL = "http://localhost:4000/api/a3/events";
// 
// const CalendarSection = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventDesc, setEventDesc] = useState("");
//   const [events, setEvents] = useState([]);
//   const [editingId, setEditingId] = useState(null);
// 
//   const { token, userId } = useAuthStore(); // ✅ Get userId from Zustand store
// 
//   useEffect(() => {
//     if (token) {
//       axios
//         .get(API_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           setEvents(res.data?.events || []);
//         })
//         .catch((err) => {
//           console.error(err);
//           toast.error("Failed to fetch events");
//         });
//     }
//   }, [token]);
// 
//   const handleAddEvent = async () => {
//     if (!eventTitle.trim()) {
//       toast.warning("Please enter event title");
//       return;
//     }
// 
//     try {
//       const newEvent = {
//         date: selectedDate,
//         title: eventTitle,
//         description: eventDesc,
//         created_by: userId, 
//         user_id: user?._id, // ✅ Sending userId but not displaying it
//       };
// 
//       const res = await axios.post(API_URL, newEvent, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
// 
//       setEvents([...events, res.data.event]);
//       resetForm();
//       toast.success("Event added!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add event");
//     }
//   };
// 
//   const handleUpdateEvent = async () => {
//     if (!editingId) {
//       toast.warning("No event selected to update");
//       return;
//     }
// 
//     try {
//       const updated = {
//         title: eventTitle,
//         description: eventDesc,
//       };
// 
//       const res = await axios.put(`${API_URL}/${editingId}`, updated, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
// 
//       setEvents(
//         events.map((ev) =>
//           ev._id === editingId ? res.data.updatedEvent : ev
//         )
//       );
//       resetForm();
//       toast.success("Event updated!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update event");
//     }
//   };
// 
//   const handleDeleteEvent = async () => {
//     if (!editingId) {
//       toast.warning("No event selected to delete");
//       return;
//     }
// 
//     try {
//       await axios.delete(`${API_URL}/${editingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
// 
//       setEvents(events.filter((ev) => ev._id !== editingId));
//       resetForm();
//       toast.success("Event deleted!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete event");
//     }
//   };
// 
//   const handleEdit = (event) => {
//     setEditingId(event._id);
//     setEventTitle(event.title);
//     setEventDesc(event.description);
//   };
// 
//   const resetForm = () => {
//     setEditingId(null);
//     setEventTitle("");
//     setEventDesc("");
//   };
// 
//   const getDateEvents = () => {
//     if (!Array.isArray(events)) return [];
//     return events.filter(
//       (ev) =>
//         new Date(ev.date).toDateString() === selectedDate.toDateString()
//     );
//   };
// 
//   return (
//     <div className="cs-container">
//       <h2 className="cs-title">Community Events Calendar</h2>
// 
//       <div className="cs-main">
//         <div className="cs-calendar-wrapper">
//           <Calendar
//             onChange={setSelectedDate}
//             value={selectedDate}
//             className="cs-calendar"
//             tileContent={({ date }) => {
//               const hasEvents = events.some(
//                 (ev) =>
//                   new Date(ev.date).toDateString() === date.toDateString()
//               );
//               return hasEvents ? <div className="cs-event-dot"></div> : null;
//             }}
//           />
//         </div>
// 
//         <div className="cs-form">
//           <div className="cs-form-group">
//             <label className="cs-label">Selected Date:</label>
//             <input
//               type="text"
//               className="cs-date-input"
//               value={selectedDate.toLocaleDateString()}
//               readOnly
//             />
//           </div>
// 
//           <div className="cs-form-group">
//             <label className="cs-label">Event Title:</label>
//             <input
//               type="text"
//               className="cs-input"
//               value={eventTitle}
//               onChange={(e) => setEventTitle(e.target.value)}
//               placeholder="Enter event name"
//             />
//           </div>
// 
//           <div className="cs-form-group">
//             <label className="cs-label">Description:</label>
//             <textarea
//               className="cs-textarea"
//               value={eventDesc}
//               onChange={(e) => setEventDesc(e.target.value)}
//               placeholder="Event details..."
//               rows="4"
//             />
//           </div>
// 
//           <div className="cs-actions">
//             {editingId ? (
//               <>
//                 <button
//                   className="cs-btn cs-update-btn"
//                   onClick={handleUpdateEvent}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="cs-btn cs-delete-btn"
//                   onClick={handleDeleteEvent}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   className="cs-btn cs-cancel-btn"
//                   onClick={resetForm}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button className="cs-btn cs-add-btn" onClick={handleAddEvent}>
//                 Add Event
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
// 
//       <div className="cs-events">
//         <h3 className="cs-events-title">
//           Events on {selectedDate.toLocaleDateString()}:
//         </h3>
// 
//         {getDateEvents().length > 0 ? (
//           <ul className="cs-events-list">
//             {getDateEvents().map((ev) => (
//               <li key={ev._id} className="cs-event-item">
//                 <div className="cs-event-content">
//                   <h4 className="cs-event-title">{ev.title}</h4>
//                   {ev.description && (
//                     <p className="cs-event-desc">{ev.description}</p>
//                   )}
//                 </div>
//                 <button
//                   className="cs-edit-btn"
//                   onClick={() => handleEdit(ev)}
//                 >
//                   Edit
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="cs-no-events">
//             No events scheduled for this date
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
// 
// export default CalendarSection;










import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useAuthStore from "../Store/authStore";
import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:4000/api/a3/events";

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Get userId and token from Zustand store
  const { token, user } = useAuthStore(); // Assuming 'user' contains the 'userId'

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setEvents(res.data?.events || []);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch events");
        });
    }
  }, [token]);

  const handleAddEvent = async () => {
    if (!eventTitle.trim()) {
      toast.warning("Please enter event title");
      return;
    }

    try {
      const newEvent = {
        date: selectedDate,
        title: eventTitle,
        description: eventDesc,
        created_by: user ? user._id : null,  // Ensure user._id is passed correctly
      };

      const res = await axios.post(API_URL, newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents([...events, res.data.event]);
      resetForm();
      toast.success("Event added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add event");
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingId) {
      toast.warning("No event selected to update");
      return;
    }

    try {
      const updated = {
        title: eventTitle,
        description: eventDesc,
      };

      const res = await axios.put(`${API_URL}/${editingId}`, updated, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(
        events.map((ev) =>
          ev._id === editingId ? res.data.updatedEvent : ev
        )
      );
      resetForm();
      toast.success("Event updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update event");
    }
  };

  const handleDeleteEvent = async () => {
    if (!editingId) {
      toast.warning("No event selected to delete");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${editingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(events.filter((ev) => ev._id !== editingId));
      resetForm();
      toast.success("Event deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setEventTitle(event.title);
    setEventDesc(event.description);
  };

  const resetForm = () => {
    setEditingId(null);
    setEventTitle("");
    setEventDesc("");
  };

  const getDateEvents = () => {
    if (!Array.isArray(events)) return [];
    return events.filter(
      (ev) =>
        new Date(ev.date).toDateString() === selectedDate.toDateString()
    );
  };

  return (
    <div className="cs-container">
      <h2 className="cs-title">Community Events Calendar</h2>

      <div className="cs-main">
        <div className="cs-calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="cs-calendar"
            tileContent={({ date }) => {
              const hasEvents = events.some(
                (ev) =>
                  new Date(ev.date).toDateString() === date.toDateString()
              );
              return hasEvents ? <div className="cs-event-dot"></div> : null;
            }}
          />
        </div>

        <div className="cs-form">
          <div className="cs-form-group">
            <label className="cs-label">Selected Date:</label>
            <input
              type="text"
              className="cs-date-input"
              value={selectedDate.toLocaleDateString()}
              readOnly
            />
          </div>

          <div className="cs-form-group">
            <label className="cs-label">Event Title:</label>
            <input
              type="text"
              className="cs-input"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event name"
            />
          </div>

          <div className="cs-form-group">
            <label className="cs-label">Description:</label>
            <textarea
              className="cs-textarea"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
              placeholder="Event details..."
              rows="4"
            />
          </div>

          <div className="cs-form-group">
            <label className="cs-label">User ID (Logged-in User):</label>
            <input
              type="text"
              className="cs-input"
              value={user ? user._id : "No user logged in"} // Display user_id or fallback text
              readOnly
            />
          </div>

          <div className="cs-actions">
            {editingId ? (
              <>
                <button
                  className="cs-btn cs-update-btn"
                  onClick={handleUpdateEvent}
                >
                  Update
                </button>
                <button
                  className="cs-btn cs-delete-btn"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
                <button
                  className="cs-btn cs-cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="cs-btn cs-add-btn" onClick={handleAddEvent}>
                Add Event
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="cs-events">
        <h3 className="cs-events-title">
          Events on {selectedDate.toLocaleDateString()}:
        </h3>

        {getDateEvents().length > 0 ? (
          <ul className="cs-events-list">
            {getDateEvents().map((ev) => (
              <li key={ev._id} className="cs-event-item">
                <div className="cs-event-content">
                  <h4 className="cs-event-title">{ev.title}</h4>
                  {ev.description && (
                    <p className="cs-event-desc">{ev.description}</p>
                  )}
                </div>
                <button
                  className="cs-edit-btn"
                  onClick={() => handleEdit(ev)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cs-no-events">
            No events scheduled for this date
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarSection;
