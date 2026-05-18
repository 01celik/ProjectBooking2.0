import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/RoomSelect/roomSelect.css";

export default function RoomPageModifyBar() {
  // 1. Dropdown popup states
  const [activePopup, setActivePopup] = useState(null); // values can be: null, 'date', or 'guest'

  // 2. Booking Data States (Mirrored exactly from BookingBox)
  const [fromDate, setFromDate] = useState("2026-05-06");
  const [toDate, setToDate] = useState("2026-05-07");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const navigate = useNavigate();

  // 3. Toggle functions
  const toggleDatePicker = (e) => {
    e.stopPropagation();
    setActivePopup(activePopup === "date" ? null : "date");
  };

  const toggleGuestPicker = (e) => {
    e.stopPropagation();
    setActivePopup(activePopup === "guest" ? null : "guest");
  };

  // 4. Date selection handling logic
  function handleDateClick(day, month) {
    const formattedDate = `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (!fromDate || toDate) {
      setFromDate(formattedDate);
      setToDate(null);
    } else {
      if (formattedDate > fromDate) {
        setToDate(formattedDate);
      } else {
        setFromDate(formattedDate);
      }
    }
  }

  // 5. Date UI Formatter
  function formatDate(dateString) {
    if (!dateString) return "";

    const [, month, day] = dateString.split("-");
    const monthNames = {
      "05": "May",
      "06": "June",
    };

    return `${parseInt(day)} ${monthNames[month]}`;
  }

  // 6. Update Button Fetch Request (Triggers on 'Update' click)
  async function handleBookingSearch() {
    try {
      const bookingData = {
        fromDate,
        toDate,
        noOfBedsRequired: adults + children,
        rooms,
      };

      const response = await fetch(
        "http://localhost:3000/room/getAvailableRoom",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch rooms");
      }

      // Refreshing/Navigating target page state payload
      navigate("/roomSelect", {
        state: {
          availableRooms: data,
          bookingData,
        },
      });
    } catch (error) {
      console.error("Booking search error:", error);
      alert(error.message);
    }
  }

  return (
    <div className="room-page-modify-bar">
      <div className="modify-inner">
        {/* Dates Trigger */}
        <div className="modify-field clickable" onClick={toggleDatePicker}>
          <span className="material-symbols-outlined booking-material-icon">
            calendar_month
          </span>
          <div className="modify-text-group">
            <label>Dates</label>
            <span>
              {fromDate && toDate
                ? `${formatDate(fromDate)} – ${formatDate(toDate)}`
                : "Select dates"}
            </span>
          </div>

          {/* Render Calendar Markup if active */}
          {activePopup === "date" && (
            <div
              className="modify-popup date-snap-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="date-popup">
                <div className="months-wrapper">
                  {/* MAY */}
                  <div className="month-block">
                    <h2>May 2026</h2>
                    <div className="calendar-grid">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>

                      {[...Array(31)].map((_, index) => {
                        const day = index + 1;
                        const currentDate = `2026-05-${String(day).padStart(2, "0")}`;

                        return (
                          <button
                            key={day}
                            onClick={() => handleDateClick(day, 5)}
                            className={
                              currentDate === fromDate || currentDate === toDate
                                ? "selected-date"
                                : ""
                            }
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* JUNE */}
                  <div className="month-block">
                    <h2>June 2026</h2>
                    <div className="calendar-grid">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>

                      {[...Array(30)].map((_, index) => {
                        const day = index + 1;
                        const currentDate = `2026-06-${String(day).padStart(2, "0")}`;

                        return (
                          <button
                            key={day}
                            onClick={() => handleDateClick(day, 6)}
                            className={
                              currentDate === fromDate || currentDate === toDate
                                ? "selected-date"
                                : ""
                            }
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  className="date-done-button"
                  onClick={() => setActivePopup(null)}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guests Trigger */}
        <div className="modify-field clickable" onClick={toggleGuestPicker}>
          <span className="material-symbols-outlined booking-material-icon">
            group
          </span>
          <div className="modify-text-group">
            <label>Guests</label>
            <span>
              {adults + children} guest{adults + children > 1 ? "s" : ""},{" "}
              {rooms} room{rooms > 1 ? "s" : ""}
            </span>
          </div>

          {/* Render Guest Counter UI if active */}
          {activePopup === "guest" && (
            <div
              className="modify-popup date-snap-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="guest-popup">
                <div className="guest-row">
                  <div>
                    <h3>Adults</h3>
                    <p>Age 18+</p>
                  </div>
                  <div className="counter">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))}>
                      -
                    </button>
                    <span>{adults}</span>
                    <button onClick={() => setAdults(adults + 1)}>+</button>
                  </div>
                </div>

                <div className="guest-row">
                  <div>
                    <h3>Children</h3>
                    <p>Age 0-17</p>
                  </div>
                  <div className="counter">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      -
                    </button>
                    <span>{children}</span>
                    <button onClick={() => setChildren(children + 1)}>+</button>
                  </div>
                </div>

                <div className="guest-row">
                  <div>
                    <h3>Rooms</h3>
                    <p>Number of rooms</p>
                  </div>
                  <div className="counter">
                    <button onClick={() => setRooms(Math.max(1, rooms - 1))}>
                      -
                    </button>
                    <span>{rooms}</span>
                    <button onClick={() => setRooms(rooms + 1)}>+</button>
                  </div>
                </div>

                <button
                  className="guest-done-button"
                  onClick={() => setActivePopup(null)}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Update Search Trigger */}
        <button className="modify-search-btn" onClick={handleBookingSearch}>
          Update
        </button>
      </div>
    </div>
  );
}
