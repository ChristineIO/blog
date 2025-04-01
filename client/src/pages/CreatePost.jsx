import axios from "axios"
import Button from "../components/Button"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import './styles/CreatePost.css'
import { useEffect } from "react"
import { createPost } from '../api.js'

const CreatePost = () => {
    const createNewPost = () => {
        let postUser = {
            text: document.querySelector('.post-text').value,
            user: 'rosey22',
            date: new Date().toISOString().split('T')[0],
        }
        createPost(postUser)
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