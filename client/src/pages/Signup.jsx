import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
import Button from "../components/Button"
import { FaGoogle } from "react-icons/fa"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { createUser } from "../api"
import { useState } from "react"

const SignupPage = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        googleLogout()
    }

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await createUser(user)
        navigate('/home')
        
        if (response.status !== 200) {
            alert("Account could not be created!")
        }
    }

    function handleChange(e) {
        setUser({ ... user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="auth-box">
                <form className="auth-box-content" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <InputField name='username' type='text' label='Username'
                    onChange={handleChange} maxLength={16}/>
                    <InputField name='email' type='email' label='Email' onChange={handleChange}
                    maxLength={55}/>
                    <InputFieldPassword name='password' type='password' label='Password' onChange={handleChange} maxLength={20}/>
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