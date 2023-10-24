import { useState } from 'react'
import { Form, Input, Wrapper } from '../components/auth-components'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


export default function FindPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const sendEmail = async (e:React.FormEvent) => {
        e.preventDefault()
        
        
        try {
        
          const response = await sendPasswordResetEmail(auth, email)
          navigate("/");
          
        } catch (error) {
            alert(error)
        }
    }  

    return <>
        <Wrapper>
            <Form>
                가입한 이메일을 적어주세요.
                <Input onChange={onChange} type='email' name='email' value={email} placeholder='Email'></Input>
                <Input onClick={sendEmail} type='submit' value='인증 메일 전송하기'></Input>
            </Form>
        </Wrapper>
    </>
}