import { v4 as uuidv4 } from 'uuid';
import {database} from "../firebaseConfig";
import {ref, set} from "firebase/database";

import {useForm} from "react-hook-form";

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const eventSchema = yup.object({
    name: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    eventAttendanceMode: yup.string(),
    eventStatus: yup.string().required(),
    locationType: yup.string().required(),
})

export function EventForm() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(eventSchema)
    });

    async function onSubmit(data) {
        const eventId = uuidv4();
        set(ref(database, 'events/' + eventId), {
            name: data.name,
            startDate: String(data.startDate),
            endDate: String(data.endDate),
            eventAttendanceMode: data.eventAttendanceMode,
        })
            .then(() => {
                alert("added successfully")
            })
            .catch((err) => {console.log(err)});

        console.log("submit");
        console.log(data);
    }

    return (
        <>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    >Start Date</label>
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
                    </div>
                    <p>{errors.eventStatus?.message}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}