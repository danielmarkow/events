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
        <section>
          {Object.keys(events).map((key) => (
              <aside key={key}>
                  <strong>{events[key].eventAttendanceMode}</strong>
                  <h3>{events[key].name}</h3>
                  <div>{events[key].startDate}</div>
                  {/* TODO add short description field?*/}
                  <p>{events[key].description.slice(0,100) + "..."}</p>
                  <button
                      onClick={() => navigate("/" + key)}
                  >Event Details</button>
              </aside>
          ))}
        </section>
  );
}

export default EventList;