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
      startDate: data.startDate.toLocaleString("de-DE"),
      endDate: data.endDate.toLocaleString("de-DE"),
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
      offersValidFrom: data.offersValidFrom.toLocaleString("de-DE"),
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
            <label
                htmlFor="name"
            >Event Name</label>
            <input
                id="name"
                type="text"
                {...register("name")}
            />
            <p>{errors.name?.message}</p>
            <label
            >Attendance Mode</label>
              <select {...register("eventAttendanceMode")}>
                <option value="OfflineEventAttendanceMode">Offline</option>
                <option value="OnlineEventAttendanceMode">Online</option>
                <option value="MixedEventAttendanceMode">Mixed</option>
              </select>
            <p>{errors.eventAttendanceMode?.message}</p>
            <label
                htmlFor="startDate"
            >Start Date</label>
            <input
                id="startDate"
                type="datetime-local"
                {...register("startDate")}
            />
            <p>{errors.startDate?.message}</p>
            <label
                htmlFor="endDate"
            >End Date</label>
            <input
                id="endDate"
                type="datetime-local"
                {...register("endDate")}
            />
            <p>{errors.endDate?.message}</p>
            <label
            >Event Status</label>
              <select {...register("eventStatus")}>
                <option value="EventScheduled">Scheduled</option>
                <option value="EventRescheduled">Rescheduled</option>
                <option value="EventPostponed">Postponed</option>
                <option value="EventMovedOnline">Movend Online</option>
                {/*TODO EventCancelled correct?*/}
                <option value="EventCancelled">Cancelled</option>
              </select>
            <p>{errors.eventStatus?.message}</p>
            <label
            >Location Type</label>
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
            <p>{errors.eventStatus?.message}</p>
            <label
                htmlFor="locationName"
            >Location Name</label>
            <input
                id="locationName"
                type="text"
                {...register("locationName")}
            />
            <p>{errors.locationName?.message}</p>
            <label
                htmlFor="addressStreetAddress"
            >Street Address</label>
            <input
                id="addressStreetAddress"
                type="text"
                {...register("addressStreetAddress")}
            />
            <p>{errors.addressStreetAddress?.message}</p>
            <label
                htmlFor="addressLocality"
            >Address Locality</label>
            <input
                id="addressLocality"
                type="text"
                {...register("addressLocality")}
            />
            <p>{errors.addressLocality?.message}</p>
            <label
                htmlFor="addressPostalCode"
            >Address Postal Code</label>
            <input
                id="addressPostalCode"
                type="number"
                {...register("addressPostalCode")}
            />
            <p>{errors.addressPostalCode?.message}</p>
            <label
                htmlFor="addressRegion"
            >Address Region</label>
            <input
                id="addressRegion"
                type="text"
                {...register("addressRegion")}
            />
            <p>{errors.addressRegion?.message}</p>
            <label
                htmlFor="description"
            >Event Description</label>
            <textarea
                id="description"
                {...register("description")}
            ></textarea>
            <p>{errors.description?.message}</p>
            <label
                htmlFor="offersUrl"
            >Offers Url</label>
            <input
                id="offersUrl"
                type="url"
                {...register("offersUrl")}
            />
            <p>{errors.offersUrl?.message}</p>
            <label
                htmlFor="offersPrice"
            >Offers Price (€)</label>
            <input
                id="offersPrice"
                type="number"
                {...register("offersPrice")}
            />
            <p>{errors.offersPrice?.message}</p>
            <label
                htmlFor="offersAvailability"
            >Offers Availability</label>
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
            <label
                htmlFor="offersValidFrom"
            >Offer Valid From</label>
            <input
                id="offersValidFrom"
                type="datetime-local"
                {...register("offersValidFrom")}
            />
            <p>{errors.offersValidFrom?.message}</p>
            <label
            >Performer Type</label>
              <select {...register("performerType")}>
                <option value="PerformingGroup">PerformingGroup</option>
                <option value="MusicGroup">MusicGroup</option>
              </select>
            <p>{errors.performerType?.message}</p>
            <label
                htmlFor="performerName"
            >Performer Name</label>
            <input
                id="performerName"
                type="text"
                {...register("performerName")}
            />
            <p>{errors.performerName?.message}</p>
            <label
            >Organizer Type</label>
              <select {...register("organizerType")}>
                <option value="Test1">Test1</option>
                <option value="Test2">Test2</option>
              {/*  TODO add missing options*/}
              </select>
            <p>{errors.organizerType?.message}</p>
            <label
                htmlFor="organizerName"
            >Organizer Name</label>
            <input
                id="organizerName"
                type="text"
                {...register("organizerName")}
            />
            <p>{errors.organizerName?.message}</p>
            <label
                htmlFor="organizerUrl"
            >Link Organizer</label>
            <input
                id="organizerUrl"
                type="text"
                {...register("organizerUrl")}
            />
            <p>{errors.organizerUrl?.message}</p>
          <button type="submit">Submit</button>
        </form>
      </section>
      </>
  );
}

export default EventForm;