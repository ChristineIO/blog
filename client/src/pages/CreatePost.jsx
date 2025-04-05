import axios from "axios"
import Button from "../components/Button"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import './styles/CreatePost.css'
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { checkAuth, createPost, verifyUser } from '../api.js'
import LogoutButton from "../components/Buttons/LogoutButton.jsx"
import Cookies from 'js-cookie'
import authVerify from "../components/authVerify.js"
import MenuButton from "../components/Buttons/MenuButton.jsx"
import Dropdown from "../components/Dropdown/Dropdown.jsx"

const CreatePost = () => {
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
    const [error, setError] = useState(false)
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
    let navigate = useNavigate()
    const createNewPost = async (e) => {
        e.preventDefault()
        let postUser = {
            text: document.querySelector('.post-text').value,
            user: 'rosey22',
            date: new Date().toISOString().split('T')[0],
        }
        let userAuth = await checkAuth()
        if (userAuth.ok) {
            setError(true)
        } else {
            let createPostAction = await createPost(postUser)
            navigate('/posts')
        }

    }

    return (
        <>
            <div className="navbar">
                <HomeLink />
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
            </div>
            <Dropdown />
            {error ? <div className="error-box">
                <h1>Login pls </h1>
            </div> : <></>}
            <form className="post-form">
                <textarea className="post-text" name="text"></textarea>
                <Button type='submit' text='Post' className='btn' onClick={createNewPost} />
            </form>
        </>
    )
}


export default CreatePost