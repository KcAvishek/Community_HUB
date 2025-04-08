import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAddEvent = () => {
    if (!eventTitle.trim()) {
      alert("Please enter event title");
      return;
    }

    const newEvent = {
      id: Date.now(),
      date: new Date(selectedDate),
      title: eventTitle,
      description: eventDesc
    };

    setEvents([...events, newEvent]);
    resetForm();
    alert("Event added!");
  };

  const handleUpdateEvent = () => {
    if (!editingId) {
      alert("No event selected to update");
      return;
    }

    setEvents(events.map(ev => 
      ev.id === editingId 
        ? { ...ev, title: eventTitle, description: eventDesc } 
        : ev
    ));
    
    resetForm();
    alert("Event updated!");
  };

  const handleDeleteEvent = () => {
    if (!editingId) {
      alert("No event selected to delete");
      return;
    }

    setEvents(events.filter(ev => ev.id !== editingId));
    resetForm();
    alert("Event deleted!");
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setEventTitle(event.title);
    setEventDesc(event.description);
  };

  const resetForm = () => {
    setEditingId(null);
    setEventTitle("");
    setEventDesc("");
  };

  const getDateEvents = () => {
    return events.filter(
      ev => ev.date.toDateString() === selectedDate.toDateString()
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
                ev => ev.date.toDateString() === date.toDateString()
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
              <button 
                className="cs-btn cs-add-btn"
                onClick={handleAddEvent}
              >
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
            {getDateEvents().map(ev => (
              <li key={ev.id} className="cs-event-item">
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
          <p className="cs-no-events">No events scheduled for this date</p>
        )}
      </div>
    </div>
  );
};

export default CalendarSection;