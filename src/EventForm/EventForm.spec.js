import {render, screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import EventForm from "./EventForm";
import {UserContextProvider} from "../context/userContext";


describe("EventForm", () => {
  render (
      <BrowserRouter>
        <UserContextProvider>
          <EventForm />
        </UserContextProvider>
      </BrowserRouter>
  );

  it("onSubmit is called when all fields pass validation", () => {
    const eventName = screen.getByRole('textbox', {
      name: /Event Name/i
    });
    user.type(eventName, "As I Lay Dying Live in Concert");
  });
})
