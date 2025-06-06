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

  const { token, user } = useAuthStore();
  const userId = typeof user === 'string' ? user : (user && user._id);

  useEffect(() => {
    if (token) {
      axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setEvents(res.data?.events || []);
        })
        .catch((err) => {
          console.error("Fetch events error:", err);
          toast.error("Failed to fetch events");
        });
    }
  }, [token]);

  const handleAddEvent = async () => {
    if (!eventTitle.trim()) {
      toast.warning("Please enter event title");
      return;
    }

    if (!userId) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      const newEvent = {
        date: selectedDate.toLocaleDateString("en-CA"),
        title: eventTitle,
        description: eventDesc,
        created_by: userId,
      };

      const res = await axios.post(API_URL, newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents([...events, res.data.event]);
      resetForm();
      toast.success("Event added!");
    } catch (err) {
      console.error("Add event error:", err.response?.data || err.message);
      toast.error("Failed to add event: " + (err.response?.data?.message || "Server error"));
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
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(events.map((ev) =>
        ev._id === editingId ? { ...ev, ...res.data.updatedEvent } : ev
      ));
      resetForm();
      toast.success("Event updated!");
    } catch (err) {
      console.error("Update event error:", err.response?.data || err);
      const errorMessage = err.response?.status === 403
        ? "You can only update your own events"
        : "Failed to update event: " + (err.response?.data?.message || "Server error");
      toast.error(errorMessage);
    }
  };

  const handleDeleteEvent = async () => {
    if (!editingId) {
      toast.warning("No event selected to delete");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${editingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(events.filter((ev) => ev._id !== editingId));
      resetForm();
      toast.success("Event deleted!");
    } catch (err) {
      console.error("Delete event error:", err.response?.data || err);
      const errorMessage = err.response?.status === 403
        ? "You can only delete your own events"
        : "Failed to delete event: " + (err.response?.data?.message || "Server error");
      toast.error(errorMessage);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setEventTitle(event.title);
    setEventDesc(event.description || "");
  };

  const resetForm = () => {
    setEditingId(null);
    setEventTitle("");
    setEventDesc("");
  };

  const getDateEvents = () => {
    const selectedDateStr = selectedDate.toLocaleDateString("en-CA");
    return events.filter((ev) => {
      const eventDateStr = new Date(ev.date).toLocaleDateString("en-CA");
      return eventDateStr === selectedDateStr;
    });
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
              const dateStr = date.toLocaleDateString("en-CA");
              const hasEvents = events.some((ev) => {
                const eventDateStr = new Date(ev.date).toLocaleDateString("en-CA");
                return eventDateStr === dateStr;
              });
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
              value={selectedDate.toLocaleDateString("en-CA")}
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
                <button className="cs-btn cs-update-btn" onClick={handleUpdateEvent}>
                  Update
                </button>
                <button className="cs-btn cs-delete-btn" onClick={handleDeleteEvent}>
                  Delete
                </button>
                <button className="cs-btn cs-cancel-btn" onClick={resetForm}>
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
          Events on {selectedDate.toLocaleDateString("en-CA")}:
        </h3>

        {getDateEvents().length > 0 ? (
          <ul className="cs-events-list">
            {getDateEvents().map((ev) => {
              const eventCreatorId = typeof ev.created_by === 'string' ? ev.created_by : (ev.created_by && ev.created_by._id);
              return (
                <li key={ev._id} className="cs-event-item">
                  <div className="cs-event-content">
                    <h4 className="cs-event-title">{ev.title}</h4>
                    {ev.description && (
                      <p className="cs-event-desc">{ev.description}</p>
                    )}
                  </div>
                  {eventCreatorId === userId && (
                    <button className="cs-edit-btn" onClick={() => handleEdit(ev)}>
                      Edit
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="cs-no-events">No events scheduled for this date</p>
        )}
      </div>
    </div>
  );
};

export default CalendarSection;

