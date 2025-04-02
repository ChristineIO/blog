import axios from "axios"
import { verifyUser } from "../api"
import Button from "../components/Button"
import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(user)
        if (!response) {
            setError(true)
        } else if (response) {
            sessionStorage.setItem("User", response)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response}`
            navigate('/home')
        }
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            {error ? <div className="error-box">
                <h1>Account not found </h1>
            </div> : <></>}
            <div className="auth-box">
                <form className="auth-box-content" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <InputField label="Email" type="email" name="email" maxLength={40} onChange={handleChange} />
                    <InputFieldPassword label="Password" type="password" name="password" maxLength={40} onChange={handleChange} />
                    <Button type="submit" text="Login" className="btn" />
                </form>
            </div>
        </>
    )
}

export default LoginPage