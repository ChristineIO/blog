import HomeLink from "../components/HomeLink"
import PostButtons from "../components/PostButtons"
import ToggleButton from "../components/Buttons/ToggleButton"
import { Link } from "react-router-dom"
import LogoutButton from "../components/Buttons/LogoutButton"
import Dropdown from "../components/Dropdown/Dropdown"
import { useEffect, useState } from 'react'
import { checkAuth } from "../api"
import MenuButton from "../components/Buttons/MenuButton"
import './styles/LoginSpace.css'
import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"

const LoginSpace = () => {
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
    useEffect(() => {
        const fetchAuth = async () => {
            let userAuth = await checkAuth()
            if (userAuth.data.success) {
                setAuthBtn(false);
                setLogout(true);
            } else if (!userAuth.data.success) {
                setLogout(false);
                setAuthBtn(true);
            }
        };

        fetchAuth();
    }, [])

    return (
        <>
            <div className="navbar">
                <div className='logo'>
                    <HomeLink />
                </div>
                <PostButtons />
                <div className='auth-buttons'>
                    <ToggleButton />
                    {
                        authBtn ?
                            <>
                                <Link to='/signup' className='auth-btn'>Sign up</Link>
                                <Link to='/login' className='auth-btn'>Login</Link>
                            </>
                            : <Link to='/profile' className='auth-btn'>Profile</Link>
                    }

                    {logout ? <LogoutButton /> : <></>}
                    <MenuButton />
                </div>
                <><Dropdown /></>
            </div>
            <div className="space-form">
                <div className="login-space">
                    <h1>Login To Space</h1>
                    <form className="login-space-form" action="/login" method="POST">
                        <InputField type='text' name='space' label='Name of Space' maxLength={12} />
                        <InputFieldPassword type='password' label='Space Password' name='password'/>
                    </form>
                </div>
            </div>

        </>
    )
}

export default LoginSpace