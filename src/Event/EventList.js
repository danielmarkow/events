import {useEffect, useState} from "react";

import {database} from "../firebaseConfig";
import {onValue, ref} from "firebase/database";

function EventList() {
  const [events, setEvents] = useState({});

  useEffect(() => {
    return onValue(ref(database, "/events"), querySnapShot => {
      let data = querySnapShot.val();
      let eventEntries = {...data};
      console.log(eventEntries)
      setEvents(eventEntries);
    })
  }, [])

  return (
      <div id="events-container">
        <div className="row mb-2">
          {Object.keys(events).map((key) => (
              <div className="col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">{events[key].eventAttendanceMode}</strong>
                  <h3 className="mb-0">{events[key].name}</h3>
                  <div className="mb-1 text-muted">{events[key].startDate}</div>
                  <p className="card-text mb-auto">{events[key].description}</p>
                  <a className="stretched-link">Event Details</a>
                </div>
                  <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg"
                         role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                         focusable="false"><title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                    </svg>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default EventList;