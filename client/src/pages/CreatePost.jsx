import axios from "axios"
import Button from "../components/Button"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import './styles/CreatePost.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuth, createPost, verifyUser } from '../api.js'
import LogoutButton from "../components/Buttons/LogoutButton.jsx"
import Cookies from 'js-cookie'

const CreatePost = () => {
    const [error, setError] = useState(false)
    let navigate = useNavigate()
    const createNewPost = async (e) => {
        e.preventDefault()
        let postUser = {
            text: document.querySelector('.post-text').value,
            user: 'rosey22',
            date: new Date().toISOString().split('T')[0],
        }
        let createPostAction = await createPost(postUser)
        if (!createPostAction) {
            setError(true)
        } else {
            navigate('/posts')
        }

    }

    return (
        <>
            <div className="navbar">
                <HomeLink />
                <ToggleButton />
                <LogoutButton />
            </div>
            {error ? <div className="error-box">
                <h1>Account not found </h1>
            </div> : <></>}
            <form className="post-form">
                <textarea className="post-text" name="text"></textarea>
                <Button type='submit' text='Post' className='btn' onClick={createNewPost} />
            </form>
        </>
    )
}


export default CreatePost