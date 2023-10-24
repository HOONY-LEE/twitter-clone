import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Switcher, Title, Wrapper, Form } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoobleButton from "../components/google-btn";


export default function CreateAccount() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === 'name') {
            setName(value);
        } else if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value)
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            // create an account
            // set the name of the user
            // redirect to the home page
            if(isLoading || name === '' || email === '' || password === '') {
                return
            }
            const credentials = await createUserWithEmailAndPassword(auth, email, password);           
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName : name,
            });
            navigate("/");

        } catch (error) {
            if(error instanceof FirebaseError) {
                setError(error.message)
            }        
        } finally  {
            setIsLoading(false)
        }

    }

    return <Wrapper>
        <Title>Join Twitter</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
            <Input onChange={onChange} name="email"  value={email} placeholder="Email" type="email" required />
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
            <Input onChange={onChange} type="submit" value={isLoading ? "Loading..." : "Create Account"} />
        </Form>
        {error !== "" ? <Error>{error}</Error>: null}
        <Switcher>
          아미 계정이 있으신가요?&nbsp;&nbsp;
          <Link to="/login">로그인하기</Link>
        </Switcher>
        <GithubButton></GithubButton>
        <GoobleButton></GoobleButton>
    </Wrapper>
}