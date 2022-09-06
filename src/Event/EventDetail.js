import {useEffect, useState} from "react";

import {useParams} from "react-router-dom";

import {database} from "../firebaseConfig";
import {ref, onValue} from "firebase/database";

function EventDetail() {
  const {eventId} = useParams();
  const [event, setEvent] = useState({});


  useEffect(() => {
    function retrieveEvent() {
      const eventRef = ref(database, "events/" + eventId);
      onValue(eventRef, (snapshot) => {
        const data = snapshot.val();
        setEvent({data});
      })
    };

    retrieveEvent();
  }, [eventId])

  return (
      <div>
        {Object.keys(event).map((key) => (
            <div key={key}>
                <h3>{event[key].name}</h3>
                <h6>{event[key].startDate}, {event[key].addressLocality}</h6>
                <p>{event[key].description}</p>
            </div>
        ))}
      </div>
  );
}

export default EventDetail;