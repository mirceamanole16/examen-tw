import { useEffect, useState } from "react";
import ParticipantList from "./ParticipantList";
import MeetingList from "./MeetingList";
import { useNavigate } from "react-router-dom";

export const Meeting = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };
  const [meetings, setMeetings] = useState([]);
  const [meeting, setMeeting] = useState({
    id: -1,
    description: "",
    url: ""
  });
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    getMeetings();
  }, [meeting]);

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

  const createMeeting = (e) => {
    e.preventDefault();

    const description = e.target.description.value;
    const url = e.target.url.value;

    if (description.length > 0) {
      const req = `http://localhost:8080/meeting`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          description: description,
          url: url
        }),
      }).then((response) => {
        if (response.status === 201) {
          console.log("Meeting was inserted");
          getMeetings();
        } else if (response.status === 500) {
          console.log("Meeting was not inserted");
        }
      });
    }
  };

  const deleteMeeting = (id) => {
    const req = `http://localhost:8080/meeting/${id}/`;
    fetch(req, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 201) {
        console.log("Meeting was deleted");
      } else if (response.status === 500) {
        console.log("Meeting was not deleted");
      } else if (response.status === 204) {
        console.log("Meeting was deleted");
        getMeetings();
      }
    });
  };

  const fetchData = (id) => {
    const req = `http://localhost:8080/meeting/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setMeeting(json);
          setDescription(json.description);
          setUrl(json.url);
        });
      }
    });
  };

  const editMeeting = (e) => {
    const description2 = e.target.modifyDescription.value;
    const url2 = e.target.modifyUrl.value;

    const req = `http://localhost:8080/meeting/${meeting.id}/`;
    fetch(req, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        description: description2,
        url: url2
      }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("Meeting was modified");
        getMeetings();
      } else if (response.status === 500) {
        console.log("Meeting was not modified");
      }
    });
  };

  const handleView = (id) => {
    const req = `http://localhost:8080/participant/meeting/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setParticipants(json);
        });
      }
    });
  };

  return (
    <div>
      <div className="left">
        <button className="button-30" onClick={backHome}>
          Back Home
        </button>
        <form className="form" onSubmit={createMeeting}>
          <label className="description">Meeting Description</label>
          <input className='input' type="text" name="description" placeholder="description" />
          <label className="description">Meeting URL</label>
          <input className='input' type="url" name="url" placeholder="Url" />
          <button className="button-30">Create Meeting</button>
        </form>

        <form className="form2" onSubmit={editMeeting}>
          <label className="description">
            Modify meeting description
          </label>
          <input
            className='input'
            type="text"
            name="modifyDescription"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="description">Modify URL</label>
          <input
            className='input'
            type="url"
            name="modifyUrl"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="button-30">Modify Meeting</button>
        </form>
      </div>

      <div className="right">
        <MeetingList
          meetings={meetings}
          handleDelete={deleteMeeting}
          editMeeting={fetchData}
          viewParticipants={handleView}
        />
      </div>
      <div className="right">
        <ParticipantList participants={participants} all={true} />
      </div>
    </div>
  );
};
