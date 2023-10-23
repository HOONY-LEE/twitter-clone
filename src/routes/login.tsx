import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input`
    padding:  10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;
export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        const response =  await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
        console.log(response)
    }

    return <Wrapper>
    <Title>Sign In Twitter</Title>
    <Form onSubmit={onSubmit}>
        <Input onChange={onChange} placeholder="email" name="email" value={email} type="email" />
        <Input onChange={onChange} placeholder="password" name="password" value={password} type="password"/>
        <Input type="submit" value="로그인하기"/>
    </Form>
    </Wrapper>
}