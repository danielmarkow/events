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
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a
                    className="navbar-brand pointer"
                    onClick={() => navigate("/")}
                >Events</a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {!currentUser && <li className="nav-item">
                        <a
                            className="nav-link active pointer"
                            aria-current="page"
                            onClick={() => navigate("/signup")}
                        >Sign Up</a>
                    </li>}
                    {!currentUser && <li className="nav-item">
                        <a
                            className="nav-link active pointer"
                            aria-current="page"
                            onClick={() => navigate("/signin")}
                        >Sign In</a>
                    </li>}
                    {currentUser && <li className="nav-item">
                        <a
                            className="nav-link active pointer"
                            aria-current="page"
                            onClick={logOut}
                        >Log Out</a>
                    </li>}
                    {currentUser && <li className="nav-item">
                        <a
                            className="nav-link active pointer"
                            aria-current="page"
                            onClick={() => navigate("/admin")}
                        >Admin</a>
                    </li>}
                </ul>
                {/*<button*/}
                {/*    type="button" className="btn btn-secondary"*/}
                {/*    onClick={() => navigate("/signup")}*/}
                {/*>Sign Up</button>*/}
                {/*<button*/}
                {/*    type="button" className="btn btn-secondary"*/}
                {/*    onClick={() => navigate("/signin")}*/}
                {/*>Sign In</button>*/}
                {/*<button*/}
                {/*    type="button" className="btn btn-secondary"*/}
                {/*    onClick={logOut}*/}
                {/*>Log out</button>*/}
            </div>
        </nav>
    );
}