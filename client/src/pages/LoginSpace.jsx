import HomeLink from "../components/HomeLink"
import PostButtons from "../components/PostButtons"
import ToggleButton from "../components/Buttons/ToggleButton"
import { Link, useNavigate } from "react-router-dom"
import LogoutButton from "../components/Buttons/LogoutButton"
import Dropdown from "../components/Dropdown/Dropdown"
import { useEffect, useState } from 'react'
import { checkAuth, getSpaces } from "../api"
import MenuButton from "../components/Buttons/MenuButton"
import './styles/LoginSpace.css'
import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
import Button from "../components/MyButton"

const LoginSpace = () => {
    let navigate = useNavigate()
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
    async function handleSubmit(e) { 
        e.preventDefault()
        let data = {
            name: e.target.name.value, 
            password: e.target.password.value
        }
        let response = await getSpaces(data)
        let posts = response.data.posts
        let stringPosts = JSON.stringify(posts)
        
        let spaceName = response.data.name
        console.log(`response.data is ${stringPosts} abd ${spaceName}`)
        sessionStorage.setItem('spacePosts', stringPosts)
        sessionStorage.setItem('spaceName', spaceName)
        navigate(`/spaces/${spaceName}`)
    }
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
                    <form className="login-space-form" onSubmit={handleSubmit}>
                        <InputField type='text' name='name' label='Name of Space' maxLength={12} />
                        <InputFieldPassword type='password' label='Space Password' name='password' />
                        <Button type='submit' text='Login' className='btn' />
                        <p style={{ display: "block" }}>Create a space? <Link to='/signup' style={{ textDecoration: 'none', color: 'var(--indian-red)' }}>Signup</Link></p>
                    </form>
                </div>
            </div>

        </>
    )
}

export default LoginSpace