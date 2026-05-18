import React from "react";
import RoomCard from "./RoomCard";
import "../../styles/RoomSelect/roomSelect.css";

const RoomList = ({ rooms = [] }) => {
  return (
    <div className="rooms-grid">
      {rooms.map((room) => (
        <RoomCard key={room.roomNumber} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
