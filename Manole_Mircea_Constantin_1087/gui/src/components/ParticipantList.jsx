const ParticipantList = ({ participants, handleDelete, editParticipant, all }) => {
    return (
      <div className="participant-list">
        {participants.map((participant) => (
          <div className="preview-meeting" key={participant.id}>
            <div className="textHolder">
              <p>Name: {participant.name}</p>
              <p>Meeting: {participant.MeetingId}</p>
            </div>
            {!all && (
              <div className="buttonHolder">
                <button
                  className="button-30"
                  onClick={() => handleDelete(participant.id)}
                >
                  Delete participant
                </button>
                <button
                  className="button-30"
                  onClick={() => editParticipant(participant.id)}
                >
                  Modify participant
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ParticipantList;
  