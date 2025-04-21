// import React, { useEffect, useState } from 'react';
// import useAuthStore from "../Store/authStore";
// import axios from 'axios';
// import { toast } from "sonner";
// 
// const TimeTrack = () => {
//   const { communityName } = useAuthStore();
//   const [attendanceDate, setAttendanceDate] = useState('');
//   const [attendees, setAttendees] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState('');
// 
//   // Fetch members when component mounts
//   useEffect(() => {
//     const fetchCommunityMembers = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/api/auth/members/${communityName}`);
//         const formatted = res.data.map((user) => ({
//           id: user._id,
//           name: user.username,
//           status: 'Not Marked'
//         }));
//         setAttendees(formatted);
//       } catch (err) {
//         console.error('Failed to fetch community members:', err);
//       }
//     };
// 
//     if (communityName) {
//       fetchCommunityMembers();
//     }
//   }, [communityName]);
// 
//   // Fetch events and attendance when attendanceDate changes
//   useEffect(() => {
//     const fetchEventsAndAttendance = async () => {
//       if (!attendanceDate) {
//         setEvents([]);
//         setSelectedEvent('');
//         setAttendees((prev) => prev.map((attendee) => ({ ...attendee, status: 'Not Marked' })));
//         return;
//       }
// 
//       try {
//         // Fetch events
//         const eventsRes = await axios.get('http://localhost:4000/api/a3/events');
//         const eventsOnDate = eventsRes.data.events.filter((event) => {
//           const eventDate = new Date(event.date).toISOString().split('T')[0];
//           return eventDate === attendanceDate;
//         });
//         setEvents(eventsOnDate);
//         setSelectedEvent(eventsOnDate.length > 0 ? eventsOnDate[0].title : '');
// 
//         // Fetch attendance
//         const attendanceRes = await axios.get(`http://localhost:4000/api/a5/${communityName}/${attendanceDate}`);
//         const savedAttendance = attendanceRes.data.attendance;
//         if (savedAttendance && savedAttendance.attendees) {
//           setAttendees((prev) =>
//             prev.map((attendee) => {
//               const savedAttendee = savedAttendance.attendees.find((a) => a.name === attendee.name);
//               return savedAttendee
//                 ? { ...attendee, status: savedAttendee.status }
//                 : { ...attendee, status: 'Not Marked' };
//             })
//           );
//         }
//       } catch (err) {
//         console.error('Failed to fetch events or attendance:', err);
//         setEvents([]);
//         setSelectedEvent('');
//         if (err.response && err.response.status === 404) {
//           // No attendance found, reset statuses
//           setAttendees((prev) => prev.map((attendee) => ({ ...attendee, status: 'Not Marked' })));
//         } else {
//           toast.error('Failed to fetch data. Please try again.');
//         }
//       }
//     };
// 
//     fetchEventsAndAttendance();
//   }, [attendanceDate, communityName]);
// 
//   const handleAttendance = (id, newStatus) => {
//     setAttendees(
//       attendees.map((attendee) =>
//         attendee.id === id ? { ...attendee, status: newStatus } : attendee
//       )
//     );
//   };
// 
//   const handleSaveAttendance = async () => {
//     if (!communityName || !attendanceDate || attendees.length === 0) {
//       toast.error('Please select a date and ensure attendees are loaded.');
//       return;
//     }
// 
//     const attendanceData = {
//       community_name: communityName,
//       date: new Date(attendanceDate),
//       attendees: attendees.map(({ name, status }) => ({
//         name,
//         status,
//         updatedAt: new Date()
//       }))
//     };
// 
//     try {
//       const res = await axios.post('http://localhost:4000/api/a5/add', attendanceData);
//       console.log('Attendance saved successfully:', res.data);
//       toast.success('Attendance Saved Successfully');
//     } catch (err) {
//       console.error('Failed to save attendance:', err);
//       toast.error('Failed to save attendance. Please try again.');
//     }
//   };
// 
//   const handleUpdateAttendance = () => {
//     console.log('Updating attendance:', { date: attendanceDate, event: selectedEvent, attendees });
//     toast.success('Attendance Updated');
//   };
// 
//   const handleDeleteAttendance = () => {
//     setAttendees(
//       attendees.map((attendee) => ({ ...attendee, status: 'Not Marked' }))
//     );
//     setAttendanceDate('');
//     setSelectedEvent('');
//     toast.success('Attendance Cleared');
//   };
// 
//   const handlePrint = () => {
//     const printContent = document.getElementById('attendance-table-printable').outerHTML;
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Attendance Report - ${selectedEvent || 'No Event'} - ${attendanceDate}</title>
//           <style>
//             table { width: 100%; border-collapse: collapse; }
//             th, td { padding: 12px; text-align: center; border: 1px solid #ddd; }
//             th { background-color: #f5f5f5; }
//             @media print { .no-print { display: none; } }
//           </style>
//         </head>
//         <body>
//           <h2>Attendance Report - ${selectedEvent || 'No Event'} - ${attendanceDate || 'No Date'}</h2>
//           ${printContent}
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.print();
//   };
// 
//   return (
//     <div className="box time-track-section">
//       <h2>Event Attendance Tracker</h2>
//       <div className="date-input">
//         <label htmlFor="eventDate">Select Event Date: </label>
//         <input
//           type="date"
//           id="eventDate"
//           value={attendanceDate}
//           onChange={(e) => setAttendanceDate(e.target.value)}
//         />
//       </div>
//       <div className="event-input">
//         <label htmlFor="eventName">Select Event: </label>
//         <select
//           id="eventName"
//           value={selectedEvent}
//           onChange={(e) => setSelectedEvent(e.target.value)}
//           disabled={!events.length}
//         >
//           {events.length === 0 ? (
//             <option value="">No events on this date</option>
//           ) : (
//             events.map((event) => (
//               <option key={event._id} value={event.title}>
//                 {event.title}
//               </option>
//             ))
//           )}
//         </select>
//       </div>
//       <table className="attendance-table" id="attendance-table-printable">
//         <thead>
//         <tr>
//           <th>SN</th>
//           <th>Name</th>
//           <th>Status</th>
//           <th className="no-print">Attendance</th>
//         </tr>
//         </thead>
//         <tbody>
//         {attendees.map((attendee, index) => (
//           <tr key={attendee.id}>
//             <td>{index + 1}</td>
//             <td>{attendee.name}</td>
//             <td>{attendee.status}</td>
//             <td className="no-print">
//               <div className="attendance-buttons">
//                 <button
//                   className={`attendance-btn ${attendee.status === 'Absent' ? 'active' : ''}`}
//                   onClick={() => handleAttendance(attendee.id, 'Absent')}
//                 >
//                   x
//                 </button>
//                 <button
//                   className={`attendance-btn ${attendee.status === 'Present' ? 'active' : ''}`}
//                   onClick={() => handleAttendance(attendee.id, 'Present')}
//                 >
//                   ✓
//                 </button>
//                 <button
//                   className={`attendance-btn ${attendee.status === 'Late' ? 'active' : ''}`}
//                   onClick={() => handleAttendance(attendee.id, 'Late')}
//                 >
//                   !
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//       <div className="attendance-actions">
//         <button className="action-btn save-btn" onClick={handleSaveAttendance}>Save</button>
//         <button className="action-btn update-btn" onClick={handleUpdateAttendance}>Update</button>
//         <button className="action-btn delete-btn" onClick={handleDeleteAttendance}>Delete</button>
//         <button className="action-btn print-btn" onClick={handlePrint}>Print</button>
//       </div>
//     </div>
//   );
// };
// 
// export default TimeTrack;





import React, { useEffect, useState } from 'react';
import useAuthStore from "../Store/authStore";
import axios from 'axios';
import { toast } from "sonner";

const TimeTrack = () => {
  const { communityName } = useAuthStore();
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    const fetchCommunityMembers = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/auth/members/${communityName}`);
        const formatted = res.data.map((user) => ({
          id: user._id,
          name: user.username,
          status: 'Not Marked'
        }));
        setAttendees(formatted);
      } catch (err) {
        console.error('Failed to fetch community members:', err);
      }
    };

    if (communityName) {
      fetchCommunityMembers();
    }
  }, [communityName]);

  useEffect(() => {
    const fetchEventsAndAttendance = async () => {
      if (!attendanceDate) {
        setEvents([]);
        setSelectedEvent('');
        setAttendees((prev) => prev.map((attendee) => ({ ...attendee, status: 'Not Marked' })));
        return;
      }

      setEvents([]);
      setSelectedEvent('');

      try {
        const eventsRes = await axios.get('http://localhost:4000/api/a3/events', {
          params: { t: new Date().getTime() } // Prevent caching
        });

        const eventsData = eventsRes.data.events || eventsRes.data || [];

        const eventsOnDate = eventsData.filter((event) => {
          try {
            let eventDateStr = event.date;
            if (eventDateStr && typeof eventDateStr === 'object' && eventDateStr.$date) {
              eventDateStr = eventDateStr.$date;
            }
            if (typeof eventDateStr === 'string' && eventDateStr.includes('T')) {
              eventDateStr = eventDateStr.split('T')[0];
            }

            const eventDate = new Date(eventDateStr);
            const selectedDate = new Date(attendanceDate);

            // Set both to local date at midnight
            const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

            return eventDateOnly.getTime() === selectedDateOnly.getTime();
          } catch (e) {
            console.warn(`Error parsing event date: ${JSON.stringify(event.date)}`, e);
            return false;
          }
        });

        setEvents(eventsOnDate);
        setSelectedEvent(eventsOnDate.length > 0 ? eventsOnDate[0].title : '');
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setEvents([]);
        setSelectedEvent('');
        toast.error('Failed to fetch events. Please try again.');
      }

      try {
        const attendanceRes = await axios.get(`http://localhost:4000/api/a5/${communityName}/${attendanceDate}`);
        const savedAttendance = attendanceRes.data.attendance;
        if (savedAttendance && savedAttendance.attendees) {
          setAttendees((prev) =>
            prev.map((attendee) => {
              const savedAttendee = savedAttendance.attendees.find((a) => a.name === attendee.name);
              return savedAttendee
                ? { ...attendee, status: savedAttendee.status }
                : { ...attendee, status: 'Not Marked' };
            })
          );
        }
      } catch (err) {
        console.error('Failed to fetch attendance:', err);
        if (err.response && err.response.status === 404) {
          setAttendees((prev) => prev.map((attendee) => ({ ...attendee, status: 'Not Marked' })));
        } else {
          toast.error('Failed to fetch attendance. Please try again.');
        }
      }
    };

    fetchEventsAndAttendance();
  }, [attendanceDate, communityName]);

  const handleAttendance = (id, newStatus) => {
    setAttendees(
      attendees.map((attendee) =>
        attendee.id === id ? { ...attendee, status: newStatus } : attendee
      )
    );
  };

  const handleSaveAttendance = async () => {
    if (!communityName || !attendanceDate || attendees.length === 0) {
      toast.error('Please select a date and ensure attendees are loaded.');
      return;
    }

    const attendanceData = {
      community_name: communityName,
      date: new Date(attendanceDate),
      attendees: attendees.map(({ name, status }) => ({
        name,
        status,
        updatedAt: new Date()
      }))
    };

    try {
      const res = await axios.post('http://localhost:4000/api/a5/add', attendanceData);
      console.log('Attendance saved successfully:', res.data);
      toast.success('Attendance Saved Successfully');
    } catch (err) {
      console.error('Failed to save attendance:', err);
      toast.error('Failed to save attendance. Please try again.');
    }
  };

  const handleUpdateAttendance = async () => {
    if (!communityName || !attendanceDate || attendees.length === 0) {
      toast.error('Please select a date and ensure attendees are loaded.');
      return;
    }

    const attendanceData = {
      community_name: communityName,
      date: new Date(attendanceDate),
      attendees: attendees.map(({ name, status }) => ({
        name,
        status,
        updatedAt: new Date()
      }))
    };

    try {
      const res = await axios.put('http://localhost:4000/api/a5/update', attendanceData);
      console.log('Attendance updated successfully:', res.data);
      toast.success('Attendance Updated Successfully');
    } catch (err) {
      console.error('Failed to update attendance:', err);
      toast.error('Failed to update attendance. Please try again.');
    }
  };

  const handleDeleteAttendance = async () => {
    if (!communityName || !attendanceDate) {
      toast.error('Please select a date to delete attendance.');
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:4000/api/a5/${communityName}/${attendanceDate}`);
      console.log('Attendance deleted successfully:', res.data);
      setAttendees(
        attendees.map((attendee) => ({ ...attendee, status: 'Not Marked' }))
      );
      setAttendanceDate('');
      setSelectedEvent('');
      toast.success('Attendance Deleted Successfully');
    } catch (err) {
      console.error('Failed to delete attendance:', err);
      toast.error('Failed to delete attendance. Please try again.');
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('attendance-table-printable').outerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Attendance Report - ${selectedEvent || 'No Event'} - ${attendanceDate}</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px; text-align: center; border: 1px solid #ddd; }
            th { background-color: #f5f5f5; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <h2>Attendance Report - ${selectedEvent || 'No Event'} - ${attendanceDate || 'No Date'}</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="box time-track-section">
      <h2>Event Attendance Tracker</h2>
      <div className="date-input">
        <label htmlFor="eventDate">Select Event Date: </label>
        <input
          type="date"
          id="eventDate"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
        />
      </div>
      <div className="event-input">
        <label htmlFor="eventName">Select Event: </label>
        <select
          id="eventName"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          disabled={!events.length}
        >
          {events.length === 0 ? (
            <option value="">No events on this date</option>
          ) : (
            events.map((event) => (
              <option key={event._id} value={event.title}>
                {event.title}
              </option>
            ))
          )}
        </select>
      </div>
      <table className="attendance-table" id="attendance-table-printable">
        <thead>
        <tr>
          <th>SN</th>
          <th>UserName</th>
          <th>Status</th>
          <th className="no-print">Attendance</th>
        </tr>
        </thead>
        <tbody>
        {attendees.map((attendee, index) => (
          <tr key={attendee.id}>
            <td>{index + 1}</td>
            <td>{attendee.name}</td>
            <td>{attendee.status}</td>
            <td className="no-print">
              <div className="attendance-buttons">
                <button
                  className={`attendance-btn ${attendee.status === 'Absent' ? 'active' : ''}`}
                  onClick={() => handleAttendance(attendee.id, 'Absent')}
                >
                  x
                </button>
                <button
                  className={`attendance-btn ${attendee.status === 'Present' ? 'active' : ''}`}
                  onClick={() => handleAttendance(attendee.id, 'Present')}
                >
                  ✓
                </button>
                <button
                  className={`attendance-btn ${attendee.status === 'Late' ? 'active' : ''}`}
                  onClick={() => handleAttendance(attendee.id, 'Late')}
                >
                  !
                </button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="attendance-actions">
        <button className="action-btn save-btn" onClick={handleSaveAttendance}>Save</button>
        <button className="action-btn update-btn" onClick={handleUpdateAttendance}>Update</button>
        <button className="action-btn delete-btn" onClick={handleDeleteAttendance}>Delete</button>
        <button className="action-btn print-btn" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default TimeTrack;

