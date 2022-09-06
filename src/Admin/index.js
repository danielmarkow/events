import {useNavigate, Navigate} from "react-router-dom";

import {useContext} from "react";
import {UserContext} from "../context/userContext";

function Admin() {
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);

    if (!currentUser) {
      return <Navigate to="/" />
    }

    return (
        <>
          <section>
              <h1>Admin</h1>
          </section>
          <section>
            <div>
              <button
                  onClick={() => navigate("/admin/create-event")}>Create Event</button>
            </div>
          </section>
        </>
    );
}

export default Admin;