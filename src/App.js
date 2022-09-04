import { 
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Admin from "./Admin";
import {EventForm} from "./Admin/EventForm";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/create-event" element={<EventForm />} />
        </Route>
      </Routes>
    </>
  );
}