import { 
    useNavigate
} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";


export default function Navbar() {
    const navigate = useNavigate();
    
    async function logOut() {
        try {
            await signOut(auth);
            navigate("/");
        } catch {
            alert("log out failed")
        }
    }

    return (
        <nav>
            <div>
                <button
                    onClick={() => navigate("/signup")}
                >Sign Up</button>
                <button
                    onClick={() => navigate("/signin")}
                >Sign In</button>
                <button
                    onClick={logOut}
                >Log out</button>
            </div>
        </nav>
    );
}