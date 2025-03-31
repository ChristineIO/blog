import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
import Button from "../components/Button"
import { FaGoogle } from "react-icons/fa"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'

const SignupPage = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        googleLogout()
    }

    return (
        <>
            <div className="auth-box">
                <form className="auth-box-content" action='/signup' method="POST">
                    <h1>Sign Up</h1>
                    <InputField name='username' type='text' label='Username'
                    />
                    <InputField name='email' type='email' label='Email'
                    />
                    <InputFieldPassword name='password' type='passwords' label='Password' />
                    <Button type='submit' text='Register' className='btn' style={{ marginBottom: '25px' }} />
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        console.log(credentialResponse)
                        console.log(jwtDecode(credentialResponse))
                        navigate('/home')
                    }} onError={() => {
                        console.log('error')
                    }} auto_select={true} shape="pill" logo_alignment="left" theme="outline"/>
                </form>
            </div>
        </>
    )
}

export default SignupPage