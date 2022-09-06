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
                        <li
                            onClick={() => navigate("/")}
                        >Events</li>
                        {!currentUser && <li>
                            <a
                                aria-current="page"
                                onClick={() => navigate("/signup")}
                            >Sign Up</a>
                        </li>}
                        {!currentUser && <li>
                            <a
                                aria-current="page"
                                onClick={() => navigate("/signin")}
                            >Sign In</a>
                        </li>}
                        {currentUser && <li>
                            <a
                                onClick={logOut}
                            >Log Out</a>
                        </li>}
                        {currentUser && <li>
                            <a
                                onClick={() => navigate("/admin")}
                            >Admin</a>
                        </li>}
                    </ul>
            </nav>
       </>
    );
}