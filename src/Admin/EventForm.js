import {useForm, Controller} from "react-hook-form";

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

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
    offersPrice: yup.string(),
    offersAvailability: yup.string(),
    offersValidFrom: yup.date(),
    performerType: yup.string().required(),
    performerName: yup.string().required(),
    organizerType: yup.string().required(),
    organizerName: yup.string().required(),
    organizerUrl: yup.string().url(),
})

export function EventForm() {
    const { register, handleSubmit, control, formState: {errors} } = useForm({
        resolver: yupResolver(eventSchema)
    });

    // const timePickerProps = {
    //     showArrowButtons: true
    // }

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <div
            style={{ margin: "1vh"}}
        >
            <h1>Veranstaltung erstellen</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bp4-form-group .modifier">
                    <label
                        htmlFor="name"
                    >Name der Veranstaltung</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                    />
                    <p
                    >{errors.name?.message}</p>
                </div>
                <div>
                    <label
                    >Teilnahmemodus auswählen</label>
                    <div>
                        <select {...register("eventAttendanceMode")}>
                            <option value="OfflineEventAttendanceMode">Offline</option>
                            <option value="OnlineEventAttendanceMode">Online</option>
                            <option value="MixedEventAttendanceMode">Gemischt</option>
                        </select>
                    </div>
                    <p>{errors.eventAttendanceMode?.message}</p>
                </div>
                {/*<div style={{display: "flex"}}>*/}
                {/*    <div className="bp4-form-group .modifier">*/}
                {/*        <label*/}
                {/*            className="bp4-label"*/}
                {/*        >Start Datum und Uhrzeit</label>*/}
                {/*        <Controller*/}
                {/*            control={control}*/}
                {/*            name="startDate"*/}
                {/*            render={({field}) => (*/}
                {/*                <DatePicker*/}
                {/*                    onChange={(date) => field.onChange(date)}*/}
                {/*                    selected={field.value}*/}
                {/*                    timePrecision="minute"*/}
                {/*                    timePickerProps={timePickerProps}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        />*/}
                {/*        <p*/}
                {/*            className="val-error"*/}
                {/*        >{errors.startDate?.message}</p>*/}
                {/*    </div>*/}
                {/*    <div className="bp4-form-group .modifier">*/}
                {/*        <label*/}
                {/*            className="bp4-label"*/}
                {/*        >Ende Datum und Uhrzeit</label>*/}
                {/*        <Controller*/}
                {/*            control={control}*/}
                {/*            name="endDate"*/}
                {/*            render={({field}) => (*/}
                {/*                <DatePicker*/}
                {/*                    onChange={(date) => field.onChange(date)}*/}
                {/*                    selected={field.value}*/}
                {/*                    timePrecision="minute"*/}
                {/*                    timePickerProps={timePickerProps}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        />*/}
                {/*        <p*/}
                {/*            className="val-error"*/}
                {/*        >{errors.startDate?.message}</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div>
                    <label
                        htmlFor="addressStreetAddress"
                    >Adresse des Veranstaltungsortes</label>
                    <input
                        id="addressStreetAddress"
                        type="text"
                        {...register("addressStreetAddress")}
                    />
                    <p>{errors.addressStreetAddress?.message}</p>
                </div>
                <div>
                    <label
                        className="bp4-label"
                    >Veranstaltungsstatus</label>
                    <div>
                        <select {...register("eventStatus")}>
                            <option value="EventScheduled">Geplant</option>
                            <option value="EventRescheduled">Umgeplant</option>
                            <option value="EventPostponed">Verschoben</option>
                            <option value="EventMovedOnline">Umgeplant online</option>
                            <option value="EventMovedOnline">Abgesagt</option>
                        </select>
                    </div>
                    <p>{errors.eventStatus?.message}</p>
                </div>
                <div>
                    <label>Veranstaltungsort Typ</label>
                    <div>
                        <select {...register("locationType")}>
                            <option value="entertainmentBusiness">Unterhaltung</option>
                            <option value="exerciseCourse">Training</option>
                            <option value="foodEstablishment">Restaurant</option>
                            <option value="foodEvent">Kulinarisches Ereignis</option>
                            <option value="fromLocation">fromLocation</option>
                            <option value="homeLocation">homeLocation</option>
                            <option value="itemLocation">itemLocation</option>
                            <option value="sportsActivityLocation">sportsActivityLocation</option>
                            <option value="sportsEvent">Sport Veranstaltung</option>
                            <option value="toLocation">toLocation</option>
                            <option value="workLocation">Arbeitsort</option>
                        </select>
                    </div>
                    <p>{errors.locationType?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="name"
                    >Name Veranstaltungsort</label>
                    <input
                        id="locationName"
                        type="text"
                        {...register("locationName")}
                    />
                    <p>{errors.locationName?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="addressLocality"
                    >Adresse Veranstaltungsort</label>
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
                    >PLZ Veranstaltungsort</label>
                    <input
                        id="addressPostalCode"
                        type="text"
                        {...register("addressPostalCode")}
                    />
                    <p>{errors.addressPostalCode?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="addressRegion"
                    >Region Veranstaltungsort</label>
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
                    >Beschreibung Veranstaltung</label>
                    <textarea dir="auto"></textarea>
                </div>
                <div>
                    <label
                        htmlFor="offersUrl"
                    >Link Ticketverkauf</label>
                    <input
                        id="offersUrl"
                        type="text"
                        {...register("offersUrl")}
                    />
                    <p>{errors.offersUrl?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="offersPrice"
                    >Ticket Preis €</label>
                    <input
                        id="offersPrice"
                        type="text"
                        {...register("offersPrice")}
                    />
                    <p>{errors.offersPrice?.message}</p>
                </div>
                <div>
                    <label>Ticket Verfügbarkeit</label>
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
                    <p>{errors.offersAvailability?.message}</p>
                </div>
                {/*<div className="bp4-form-group .modifier">*/}
                {/*    <label*/}
                {/*        className="bp4-label"*/}
                {/*    >Ticket Angebot gültig ab</label>*/}
                {/*    <Controller*/}
                {/*        control={control}*/}
                {/*        name="offersValidFrom"*/}
                {/*        render={({field}) => (*/}
                {/*            <DatePicker*/}
                {/*                onChange={(date) => field.onChange(date)}*/}
                {/*                selected={field.value}*/}
                {/*                timePrecision="minute"*/}
                {/*                timePickerProps={timePickerProps}*/}
                {/*            />*/}
                {/*        )}*/}
                {/*    />*/}
                {/*    <p*/}
                {/*        className="val-error"*/}
                {/*    >{errors.offersValidFrom?.message}</p>*/}
                {/*</div>*/}
                <div>
                    <label>Künster Typ</label>
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
                    >Name Künstler</label>
                    <input
                        id="performerName"
                        type="text"
                        {...register("performerName")}
                    />
                    <p>{errors.performerName?.message}</p>
                </div>
                <div>
                    <label>Organisator Typ</label>
                    <div>
                        <select {...register("organizerType")}>
                            <option value="Test1">Test1</option>
                            <option value="Test2">Test2</option>
                        </select>
                    </div>
                    <p>{errors.organizerType?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="organizerName"
                    >Name Organisator</label>
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
                    >Link Organisator</label>
                    <input
                        id="organizerUrl"
                        type="text"
                        {...register("organizerUrl")}
                    />
                    <p>{errors.organizerUrl?.message}</p>
                </div>
                <div>
                    <button
                        type="submit"
                    >Absenden</button>
                </div>
            </form>
        </div>
    );
}