import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"



export default function Home() {

    const navigate = useNavigate()
    const logOut = () => {
        auth.signOut();
        navigate("/login");
        
    }
    return <>
        <h1><button onClick={logOut}>Logout</button></h1>
        <h1>안녕하세요. {auth.currentUser?.displayName}</h1>
    </>
}