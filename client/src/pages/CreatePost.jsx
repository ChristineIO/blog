import axios from "axios"
import Button from "../components/MyButton"
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
    const [buttonVisible, setButtonVisible] = useState(true);
    let [count, setCount] = useState(0)
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

    const characterCount = () => {
        let textarea = document.getElementById('postArea')
        setCount(textarea.value.length)
        console.log(count)
        if (textarea.value.trim().length < 3) {
            setButtonVisible(false);
        } else if (textarea.value.length > 3) {
            setButtonVisible(true);
        }
    };

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
            <form className="post-form" onFocus={characterCount}>
                <textarea id='postArea' className="post-text" name="text" onChange={characterCount} maxLength={800} minLength={2} placeholder="Type here..."></textarea>
                    <p className="word-count"><span id="counter">{count}</span> / 800 </p>
                {buttonVisible ? <Button type='submit' text='Post' id='postBtn' className='btn' onClick={createNewPost} /> : <></>}
            </form>
        </>
    )
}


export default CreatePost