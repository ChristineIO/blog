import axios from "axios"
import Button from "../components/Button"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import './styles/CreatePost.css'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createPost } from '../api.js'

const CreatePost = () => {
    let navigate = useNavigate()
    const createNewPost = async (e) => {
        e.preventDefault()
        let postUser = {
            text: document.querySelector('.post-text').value,
            user: 'rosey22',
            date: new Date().toISOString().split('T')[0],
        }
        await createPost(postUser)
        navigate("/posts")
    }

    return (
        <>
            <div className="navbar">
                <HomeLink />
                <ToggleButton />
            </div>
            <form className="post-form">
                <textarea className="post-text" name="text"></textarea>
                <Button type='submit' text='Post' className='btn' onClick={createNewPost} />
            </form>
        </>
    )
}


export default CreatePost