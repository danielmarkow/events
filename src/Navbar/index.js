import {useNavigate} from "react-router-dom";

import {useContext} from "react";
import {UserContext} from "../context/userContext";

import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";


export default function Navbar() {
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);

    async function logOut() {
        try {
            await signOut(auth);
            navigate("/");
        } catch {
            alert("log out failed")
        }
    }

    return (
       <>
            <nav>
                    <ul>
                      <div style={{ display: "flex"}}>
                        <div style={{borderRight: "2px solid black", marginRight: "1vw"}}>
                          <li
                              className="navitem"
                              onClick={() => navigate("/")}
                          >Events</li>
                        </div>
                        <div>
                          {!currentUser && <li
                              className="navitem"
                              onClick={() => navigate("/signup")}
                          >


                              Sign Up
                          </li>}
                          {!currentUser && <li
                              className="navitem"
                              onClick={() => navigate("/signin")}
                          >

                              Sign In
                          </li>}
                          {currentUser && <li
                              className="navitem"
                              onClick={logOut}
                          >
                              Log Out
                          </li>}
                          {currentUser && <li
                              className="navitem"
                              onClick={() => navigate("/admin")}
                          >
                              Admin
                          </li>}

                        </div>
                      </div>
                    </ul>
            </nav>
       </>
    );
}