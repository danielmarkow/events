import { v4 as uuidv4 } from 'uuid';
import {database} from "../firebaseConfig";
import {ref, set} from "firebase/database";

import {Navigate, useNavigate} from "react-router-dom";

import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import {useContext} from "react";
import {UserContext} from "../context/userContext";

const eventSchema = yup.object({
  name: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  eventAttendanceMode: yup.string(),
  eventStatus: yup.string().required(),
  locationType: yup.string().required(),
  locationName: yup.string().required(),
  addressStreetAddress: yup.string(),
  addressLocality: yup.string().required(),
  addressPostalCode: yup.number().required(),
  addressRegion: yup.string().required(),
  description: yup.string().required(),
  offersUrl: yup.string().url(),
  offersPrice: yup.number(),
  offersAvailability: yup.string(),
  offersValidFrom: yup.date(),
  performerType: yup.string().required(),
  performerName: yup.string().required(),
  organizerType: yup.string().required(),
  organizerName: yup.string().required(),
  organizerUrl: yup.string().url(),
})

function EventForm() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(eventSchema)
  });

  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext);

  async function onSubmit(data) {
    const eventId = uuidv4();
    set(ref(database, 'events/' + eventId), {
      name: data.name,
      startDate: String(data.startDate),
      endDate: String(data.endDate),
      eventAttendanceMode: data.eventAttendanceMode,
      eventStatus: data.eventStatus,
      locationType: data.locationType,
      locationName: data.locationName,
      addressStreetAddress: data.addressStreetAddress,
      addressLocality: data.addressLocality,
      addressPostalCode: data.addressPostalCode,
      addressRegion: data.addressRegion,
      description: data.description,
      offersUrl: data.offersUrl,
      offersPrice: data.offersPrice,
      offersAvailability: data.offersAvailability,
      offersValidFrom: data.offersValidFrom,
      performerType: data.performerType,
      performerName: data.performerName,
      organizerType: data.organizerType,
      organizerName: data.organizerName,
      organizerUrl: data.organizerUrl,
    })
        .then(() => {
          alert("added successfully")
        })
        .catch((err) => {console.log(err)});

    console.log(data);
    navigate("/admin");
  }

  if (!currentUser) {
    return <Navigate to={"/"} />
  }

  return (
      <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Event</h2>
          <div>
            <label
                htmlFor="name"
            >Event Name</label>
            <input
                id="name"
                type="text"
                {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <label
            >Attendance Mode</label>
            <div>
              <select {...register("eventAttendanceMode")}>
                <option value="OfflineEventAttendanceMode">Offline</option>
                <option value="OnlineEventAttendanceMode">Online</option>
                <option value="MixedEventAttendanceMode">Mixed</option>
              </select>
            </div>
            <p>{errors.eventAttendanceMode?.message}</p>
          </div>
          <div>
            <label
                htmlFor="startDate"
            >Start Date</label>
            <input
                id="startDate"
                type="datetime-local"
                {...register("startDate")}
            />
            <p>{errors.startDate?.message}</p>
          </div>
          <div>
            <label
                htmlFor="endDate"
            >End Date</label>
            <input
                id="endDate"
                type="datetime-local"
                {...register("endDate")}
            />
            <p>{errors.endDate?.message}</p>
          </div>
          <div>
            <label
            >Event Status</label>
            <div>
              <select {...register("eventStatus")}>
                <option value="EventScheduled">Scheduled</option>
                <option value="EventRescheduled">Rescheduled</option>
                <option value="EventPostponed">Postponed</option>
                <option value="EventMovedOnline">Movend Online</option>
                {/*TODO EventCancelled correct?*/}
                <option value="EventCancelled">Cancelled</option>
              </select>
            </div>
            <p>{errors.eventStatus?.message}</p>
          </div>
          <div>
            <label
            >Location Type</label>
            <div>
              <select {...register("locationType")}>
                <option value="entertainmentBusiness">Entertainment Business</option>
                <option value="exerciseCourse">Exercise Course</option>
                <option value="foodEstablishment">Food Establishment</option>
                <option value="foodEvent">Food Event</option>
                <option value="fromLocation">From Location</option>
                <option value="homeLocation">Home Location</option>
                <option value="itemLocation">Item Location</option>
                <option value="sportsActivityLocation">Sports Activity Location</option>
                <option value="sportsEvent">Sport Event</option>
                <option value="toLocation">To Location</option>
                <option value="workLocation">Work Location</option>
              </select>
            </div>
            <p>{errors.eventStatus?.message}</p>
          </div>
          <div>
            <label
                htmlFor="locationName"
            >Location Name</label>
            <input
                id="locationName"
                type="text"
                {...register("locationName")}
            />
            <p>{errors.locationName?.message}</p>
          </div>
          <div>
            <label
                htmlFor="addressStreetAddress"
            >Street Address</label>
            <input
                id="addressStreetAddress"
                type="text"
                {...register("addressStreetAddress")}
            />
            <p>{errors.addressStreetAddress?.message}</p>
          </div>
          <div>
            <label
                htmlFor="addressLocality"
            >Address Locality</label>
            <input
                id="addressLocality"
                type="text"
                {...register("addressLocality")}
            />
            <p>{errors.addressLocality?.message}</p>
          </div>
          <div>
            <label
                htmlFor="addressPostalCode"
            >Address Postal Code</label>
            <input
                id="addressPostalCode"
                type="number"
                {...register("addressPostalCode")}
            />
            <p>{errors.addressPostalCode?.message}</p>
          </div>
          <div>
            <label
                htmlFor="addressRegion"
            >Address Region</label>
            <input
                id="addressRegion"
                type="text"
                {...register("addressRegion")}
            />
            <p>{errors.addressRegion?.message}</p>
          </div>
          <div>
            <label
                htmlFor="description"
            >Event Description</label>
            <textarea
                id="description"
                {...register("description")}
            ></textarea>
            <p>{errors.description?.message}</p>
          </div>
          <div>
            <label
                htmlFor="offersUrl"
            >Offers Url</label>
            <input
                id="offersUrl"
                type="url"
                {...register("offersUrl")}
            />
            <p>{errors.offersUrl?.message}</p>
          </div>
          <div>
            <label
                htmlFor="offersPrice"
            >Offers Price (€)</label>
            <input
                id="offersPrice"
                type="number"
                {...register("offersPrice")}
            />
            <p>{errors.offersPrice?.message}</p>
          </div>
          <div>
            <label
                htmlFor="offersAvailability"
            >Offers Availability</label>
            <div>
              <select {...register("offersAvailability")}>
                <option value="BackOrder">BackOrder</option>
                <option value="Discontinued">Discontinued</option>
                <option value="InStock">InStock</option>
                <option value="InStoreOnly">InStoreOnly</option>
                <option value="LimitedAvailability">LimitedAvailability</option>
                <option value="OnlineOnly">OnlineOnly</option>
                <option value="OutOfStock">OutOfStock</option>
                <option value="PreOrder">PreOrder</option>
                <option value="PreSale">PreSale</option>
                <option value="SoldOut">SoldOut</option>
              </select>
            </div>
          </div>
          <div>
            <label
                htmlFor="offersValidFrom"
            >Offer Valid From</label>
            <input
                id="offersValidFrom"
                type="datetime-local"
                {...register("offersValidFrom")}
            />
            <p>{errors.offersValidFrom?.message}</p>
          </div>
          <div>
            <label
            >Performer Type</label>
            <div>
              <select {...register("performerType")}>
                <option value="PerformingGroup">PerformingGroup</option>
                <option value="MusicGroup">MusicGroup</option>
              </select>
            </div>
            <p>{errors.performerType?.message}</p>
          </div>
          <div>
            <label
                htmlFor="performerName"
            >Performer Name</label>
            <input
                id="performerName"
                type="text"
                {...register("performerName")}
            />
            <p>{errors.performerName?.message}</p>
          </div>
          <div>
            <label
            >Organizer Type</label>
            <div>
              <select {...register("organizerType")}>
                <option value="Test1">Test1</option>
                <option value="Test2">Test2</option>
              {/*  TODO add missing options*/}
              </select>
            </div>
            <p>{errors.organizerType?.message}</p>
          </div>
          <div>
            <label
                htmlFor="organizerName"
            >Organizer Name</label>
            <input
                id="organizerName"
                type="text"
                {...register("organizerName")}
            />
            <p>{errors.organizerName?.message}</p>
          </div>
          <div>
            <label
                htmlFor="organizerUrl"
            >Link Organizer</label>
            <input
                id="organizerUrl"
                type="text"
                {...register("organizerUrl")}
            />
            <p>{errors.organizerUrl?.message}</p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
      </>
  );
}

export default EventForm;