import React from "react";
import Todo from "./Todo";
import UpcomingEvents from "./UpcomingEvents";

export default function RightNav() {
  return (
    <div className="w-1/6 py-2" style={{ backgroundColor: "#f8f6f4" }}>
      <div className="h-1/2">
        <Todo />
      </div>
      <div className="h-1/2">
        <UpcomingEvents />
      </div>
    </div>
  );
}
