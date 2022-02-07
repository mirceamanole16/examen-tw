import { useEffect, useState } from "react";
import ParticipantList from "./ParticipantList";
import { useNavigate } from "react-router-dom";

export const Participant = () => {
    const navigate = useNavigate();
  
    const backHome = () => {
      navigate("/");
    };
    const [participants, setParticipants] = useState([]);
    const [participant, setParticipant] = useState({
      id: -1,
      name: ""
    });
    const [name, setName] = useState("");

    const [meeting, setMeetings] = useState([]);
  
    useEffect(() => {
      getParticipants();
      getMeetings();
    }, [participant]);
  
    const getMeetings = () => {
      const req = `http://localhost:8080/meeting`;
      fetch(req).then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            setMeetings(json);
          });
        } else {
          setMeetings([]);
        }
      });
    };
  
    const getParticipants = () => {
      const req = `http://localhost:8080/participant`;
      fetch(req).then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            setParticipants(json);
          });
        } else {
          setParticipants([]);
        }
      });
    };
  
    const createParticipant = (e) => {
      e.preventDefault();
  
      const name = e.target.name.value;
      const meeting = e.target.meetingPost.value;
  
      if (name.length > 0) {
        const req = `http://localhost:8080/participant`;
        fetch(req, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            name: name,
            MeetingId: meeting
          }),
        }).then((response) => {
          if (response.status === 201) {
            console.log("Participant was inserted");
            getParticipants();
          } else if (response.status === 500) {
            console.log("Participant was not inserted");
          }
        });
      }
    };
  
    const deleteParticipant = (id) => {
      const req = `http://localhost:8080/participant/${id}/`;
      fetch(req, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("Participant was deleted");
        } else if (response.status === 500) {
          console.log("Participant was not deleted");
        } else if (response.status === 204) {
          getParticipants();
          console.log("Participant was deleted");
        }
      });
    };
  
    const fetchData = (id) => {
      const req = `http://localhost:8080/participant/${id}`;
      fetch(req).then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            setParticipant(json);
            setName(json.name);
          });
        }
      });
    };
  
    const editParticipant = (e) => {
      const name2 = e.target.modifyName.value;
  
      const req = `http://localhost:8080/participant/${participant.id}/`;
      fetch(req, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: name2
        }),
      }).then((response) => {
        if (response.status === 201) {
          console.log("Participant was modified");
          getParticipants();
        } else if (response.status === 500) {
          console.log("Participant was not modified");
        }
      });
    };
  
    return (
      <div>
        <div className="left">
          <button className="button-30" onClick={backHome}>
            Back Home
          </button>
          <form className="form" onSubmit={createParticipant}>
            <label>Name</label>
            <input className='input' type="text" name="name" placeholder="name" />
            <select className='select' id="meeting" name="meetingPost">
              {meeting.map((meet) => (
                <option value={meet.id} key={meet.id}>
                  {meet.description}
                </option>
              ))}
            </select>
            <button className="button-30">Create Participant</button>
          </form>
  
          <form className="form2" onSubmit={editParticipant}>
            <label>Name</label>
            <input
              className='input'
              type="text"
              name="modifyName"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="button-30">Modify Participant</button>
          </form>
        </div>
  
        <div className="right">
          <ParticipantList
            participants={participants}
            handleDelete={deleteParticipant}
            editParticipant={fetchData}
            all={false}
          />
        </div>
      </div>
    );
  };
  