const SignupPage = () => {
    return (
        <>
            <div className="auth-box">
                <div className="auth-box-content">
                    <h1>Sign Up</h1>
                    <div className="input-field">
                        <label>Username</label>
                        <input name="username" type="text" />
                    </div>
                    <div className="input-field">
                        <label>Email</label>
                        <input name="Email" type="email" />
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <input name="Password" type="password" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage