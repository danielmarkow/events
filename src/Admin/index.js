import {useNavigate, Outlet, Navigate} from "react-router-dom";

import {useContext} from "react";
import {UserContext} from "../context/userContext";

function Admin() {
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext)

    if (!currentUser) {
      return <Navigate to="/" />
    }

    return (
        <>
            <h1>Admin</h1>
            <button
                onClick={() => navigate("/admin/create-event")}>Create Event</button>
            <Outlet />
        </>
    );
}

export default Admin;