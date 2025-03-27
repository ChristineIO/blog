import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
import Button from "../components/Button"

const SignupPage = () => {
    return (
        <>
            <div className="auth-box">

                <div className="auth-box-content">
                    <h1>Sign Up</h1>
                    <InputField label="Username" name="username" type="text"/>
                    <InputField label="Email" name="email" type="email"/>
                    <InputFieldPassword label="Password" name="password" type="password"></InputFieldPassword>
                    <Button type='submit' text="Register" className="btn"/>
                </div>
            </div>
        </>
    )
}

export default SignupPage