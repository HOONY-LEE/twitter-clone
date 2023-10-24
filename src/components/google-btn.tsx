import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";



const Button = styled.span`
    background-color: white;
    font-weight: 600;
    margin-top: 10px;
    padding: 10px 20px;
    border-radius: 50px;
    width: 100%;
    color: black;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Logo = styled.img`
    height: 25px;
`;


export default function GoobleButton() {
    
    const navigate = useNavigate()
    
    const onClick = async() => {    
        
        try {
            const provider = new GoogleAuthProvider
            await signInWithPopup(auth, provider)
            navigate("/")        
        } catch (error) {
            console.error(error)   
        }
    }
    
    return <>
        <Button onClick={onClick}>
            <Logo src="/github.svg"/>
            Continue with Google
        </Button>
    </> 
}