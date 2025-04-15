import HomeLink from "../components/HomeLink"
import PostButtons from "../components/PostButtons"
import ToggleButton from "../components/Buttons/ToggleButton"
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom"
import LogoutButton from "../components/Buttons/LogoutButton"
import Dropdown from "../components/Dropdown/Dropdown"
import { useEffect, useState } from 'react'
import { checkAuth, createSpace, getSpaces } from "../api"
=======
import { Link } from "react-router-dom"
import LogoutButton from "../components/Buttons/LogoutButton"
import Dropdown from "../components/Dropdown/Dropdown"
import { useEffect, useState } from 'react'
import { checkAuth } from "../api"
>>>>>>> c20b9a3d8af957dc566e5b6b383dcf922289d29b
import MenuButton from "../components/Buttons/MenuButton"
import './styles/LoginSpace.css'
import InputField from "../components/InputField"
import InputFieldPassword from "../components/InputFieldPassword"
<<<<<<< HEAD
import Button from "../components/MyButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"


const LoginSpace = () => {
    let navigate = useNavigate()
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
    const [login, setLogin] = useState(1)
    const [error, setError] = useState(false)
    let stateText = login ? 'Login to Space' : 'Create Space'
=======

const LoginSpace = () => {
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
>>>>>>> c20b9a3d8af957dc566e5b6b383dcf922289d29b
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
<<<<<<< HEAD
    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            name: e.target.name.value,
            password: e.target.password.value
        }
        try {
            let response = await getSpaces(data)
            let posts = response.data.posts
            let stringPosts = JSON.stringify(posts)

            let spaceName = response.data.name
            console.log(`response.data is ${stringPosts} abd ${spaceName}`)
            sessionStorage.setItem('spacePosts', stringPosts)
            sessionStorage.setItem('spaceName', spaceName)
            navigate(`/spaces/${spaceName}`)
        }
        catch (error) {
            console.log(error)
            setError(true)
        }
    }
    async function createNewSpace(e) {
        e.preventDefault()
        let data = {
            name: e.target.name.value,
            password: e.target.password.value
        }
        let response = await createSpace(data)
        if (response.data.success) {
            navigate(`/home`)
        } else {
            setError(true)
        }
    }
=======

>>>>>>> c20b9a3d8af957dc566e5b6b383dcf922289d29b
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
<<<<<<< HEAD
            {error ? <div className="error-box">
                <h1>Please try again </h1>
            </div> : <></>}
            <div className="space-form">
                <Button text={<FontAwesomeIcon icon={faUserPlus}/>} className='btn' style={{ width: '15%' }} onClick={() => {
                    setLogin(!login)
                }} />
                {login ? <div className="login-space">
                    <h1>Login To Space</h1>
                    <form className="login-space-form" onSubmit={handleSubmit}>
                        <InputField type='text' name='name' label='Name of Space' maxLength={12} />
                        <InputFieldPassword type='password' label='Space Password' name='password' />
                        <Button type='submit' text='Login' className='btn' />
                    </form>
                </div> : <div className="login-space">
                    <h1>Create Space</h1>
                    <form className="login-space-form" onSubmit={createNewSpace}>
                        <InputField type='text' name='name' label='Name of Space' maxLength={12} />
                        <InputFieldPassword type='password' label='Space Password' name='password' />
                        <Button type='submit' text='Create' className='btn' />
                    </form>
                </div>}
=======
            <div className="space-form">
                <div className="login-space">
                    <h1>Login To Space</h1>
                    <form className="login-space-form" action="/login" method="POST">
                        <InputField type='text' name='space' label='Name of Space' maxLength={12} />
                        <InputFieldPassword type='password' label='Space Password' name='password'/>
                    </form>
                </div>
>>>>>>> c20b9a3d8af957dc566e5b6b383dcf922289d29b
            </div>

        </>
    )
}

export default LoginSpace