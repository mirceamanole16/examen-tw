const MeetingList = ({
    meetings,
    handleDelete,
    editMeeting,
    viewParticipants,
  }) => {
    return (
      <div className="meeting-list">
        {meetings.map((meeting) => (
          <div className="preview-meeting" key={meeting.id}>
            <div className="textHolder">
              <p>Meeting Id: {meeting.id}</p>
              <p>Description: {meeting.description}</p>
              <p>URL: {meeting.url}</p>
              <p>Created At: {meeting.createdAt}</p>
            </div>
            <div className="buttonHolder">
              <button
                className="button-30"
                onClick={() => handleDelete(meeting.id)}
              >
                Delete Meeting
              </button>
              <button
                className="button-30"
                onClick={() => editMeeting(meeting.id)}
              >
                Modify Meeting
              </button>
              <button
                className="button-30"
                onClick={() => viewParticipants(meeting.id)}
              >
                View Participants
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MeetingList;
  