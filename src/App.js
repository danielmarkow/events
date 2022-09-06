import { 
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./Navbar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Admin from "./Admin";
import EventForm from "./EventForm";
import EventList from "./Event/EventList";
import EventDetail from "./Event/EventDetail";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />}>
        </Route>
        <Route path=":eventId" element={<EventDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create-event" element={<EventForm />} />
      </Routes>

    </>
  );
}