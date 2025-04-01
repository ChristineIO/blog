import { verifyUser } from "../api"
import Button from "../components/Button"
import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(e)
        navigate('/home')

        if (response.status !== 200) {
            alert("Account could not be created!")
        }
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="auth-box">
                <form className="auth-box-content" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <InputField label="Email" type="email" name="email" />
                    <InputFieldPassword label="Password" type="password" name="password" />
                    <Button type="submit" text="Login" className="btn" />
                </form>
            </div>
        </>
    )
}

export default LoginPage