import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import {database} from "../firebaseConfig";
import {onValue, ref} from "firebase/database";

function EventList() {
  const [events, setEvents] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    return onValue(ref(database, "/events"), querySnapShot => {
      let data = querySnapShot.val();
      let eventEntries = {...data};
      // console.log(eventEntries)
      setEvents(eventEntries);
    })
  }, [])

  if (Object.keys(events).length === 0) {
    return (
        <div>
          No events yet. Sign in to create one.
        </div>
    );
  }

  return (
      <div id="events-container">
        <div>
          {Object.keys(events).map((key) => (
              <div key={key}>
                  <strong>{events[key].eventAttendanceMode}</strong>
                  <h3>{events[key].name}</h3>
                  <div>{events[key].startDate}</div>
                  <p>{events[key].description}</p>
                  <button
                      onClick={() => navigate("/" + key)}
                  >Event Details</button>
              </div>
          ))}
        </div>
      </div>
  );
}

export default EventList;