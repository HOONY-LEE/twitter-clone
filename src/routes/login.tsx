import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Error, Input, Switcher, Title, Wrapper, Form } from "../components/auth-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
 

    const auth = getAuth()
    const navigate = useNavigate();

    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const  {target: {name, value}} = e
        
        if(name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        
        try {
            
        const response =  await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
        } catch (error) {
            if(error instanceof FirebaseError) {
                setError(error.message)
            }
        } finally {

        }

    }

    return <Wrapper>
    <Title>Sign In Twitter</Title>
    <Form onSubmit={onSubmit}>
        <Input onChange={onChange} placeholder="email" name="email" value={email} type="email" />
        <Input onChange={onChange} placeholder="password" name="password" value={password} type="password"/>
        <Input type="submit" value="로그인하기"/>
    </Form>
    {error !== "" ? <Error>{error}</Error>: null}
    <Switcher>
      아직 계정이 없으신가요?&nbsp;&nbsp;
      <Link to="/create-account">계정 생성하기</Link>
    </Switcher>
    <Switcher>
      비밀번호를 잊어버리셨나요?&nbsp;&nbsp;
      <Link to="/find-password">비밀번호 찾기</Link>
    </Switcher>
    <GithubButton></GithubButton>
    <GoogleButton></GoogleButton>
    </Wrapper>
}