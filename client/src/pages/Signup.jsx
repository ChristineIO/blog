import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
import Button from "../components/MyButton"
import { FaGoogle } from "react-icons/fa"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { createUser } from "../api"
import { useState } from "react"

const SignupPage = () => {
    const [error, setError] = useState(false)
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
        if (!response.data.error) {
            navigate('/home')
        } else if (response.data.error) {
            setError(true)
        }
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            {error ? <div className="error-box">
                <h1>Account can't be created. Try new email or username </h1>
            </div> : <></>}
            <div className="auth-box">
                <form className="auth-box-content" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <InputField name='username' type='text' label='Username'
                        onChange={handleChange} maxLength={16} />
                    <InputField name='email' type='email' label='Email' onChange={handleChange}
                        maxLength={90} />
                    <InputFieldPassword name='password' type='password' label='Password' onChange={handleChange} maxLength={40} />
                    <Button type='submit' text='Register' className='btn' style={{ marginBottom: '25px' }} />
                </form>
            </div>
        </>
    )
}

export default SignupPage