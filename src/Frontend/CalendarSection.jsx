import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useAuthStore from "./Store/authStore";
import axios from "axios";
import { toast } from "sonner";


const API_URL = "http://localhost:4000/api/a3/events";

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const { token } = useAuthStore();

  // Fetch events from the API
  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
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

  // Filter events for the selected date
  const getDateEvents = () => {
    const selectedDateStr = selectedDate.toLocaleDateString("en-CA");
    return events.filter((ev) => {
      const eventDateStr = new Date(ev.date).toLocaleDateString("en-CA");
      return eventDateStr === selectedDateStr;
    });
  };

  return (
    <div className="eventcal-container">
      <h2 className="eventcal-title">Events Calendar</h2>
      <div className="eventcal-layout">
        <div className="eventcal-wrapper">
          <div className="eventcal-scoped">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date }) => {
                const dateStr = date.toLocaleDateString("en-CA");
                const hasEvents = events.some((ev) => {
                  const eventDateStr = new Date(ev.date).toLocaleDateString("en-CA");
                  return eventDateStr === dateStr;
                });
                return hasEvents ? <div className="eventcal-indicator"></div> : null;
              }}
            />
          </div>
        </div>
        <div className="eventcal-events-panel">
          <h3 className="eventcal-events-title">
            Events on {selectedDate.toLocaleDateString()}
          </h3>
          {getDateEvents().length > 0 ? (
            <ul className="eventcal-events-list">
              {getDateEvents().map((ev) => (
                <li key={ev._id} className="eventcal-event-item">
                  <span className="eventcal-event-title">{ev.title}</span>
                  {ev.description && (
                    <span className="eventcal-event-description">: {ev.description}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="eventcal-no-events">No events scheduled for this date</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;