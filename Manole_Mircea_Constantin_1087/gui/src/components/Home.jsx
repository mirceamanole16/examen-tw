import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const meetingForm = () => {
    navigate("/meeting");
  };

  const participantForm = () => {
    navigate("/participant");
  };

  return (
    <div className="home">
      <div className="div1">
        <button className="button-30" onClick={meetingForm}>
          Meetings
        </button>
      </div>
      <div className="div1">
        <button className="button-30" onClick={participantForm}>
          Participants
        </button>
      </div>
    </div>
  );
};
