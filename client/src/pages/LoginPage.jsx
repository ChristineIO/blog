import Button from "../components/Button"
import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"

const LoginPage = () => {
    return (
        <>
            <div className="auth-box">
            <form className="auth-box-content" action='/login' method="POST">
                <h1>Login</h1>
                <InputField label="Email" type="email" name="email"/>
                <InputFieldPassword label="Password" type="password" name="password" />
                <Button type="submit" text="Login" className="btn"/>
            </form>
        </div>
        </>
    )
}

export default LoginPage