import axios from "axios"
import Button from "../components/Button"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import './styles/CreatePost.css'
import { useEffect } from "react"

const CreatePost = () => {
    const createPost = () => {
        let postUser = {
            text: document.querySelector('.post-text').value,
            user: 'testuser',
            date: new Date().toISOString().split('T')[0],
        }
       axios.post('http://localhost:5000/create-post', postUser)
    }

    return (
        <>
            <div className="navbar">
                <HomeLink />
                <ToggleButton />
            </div>
            <form className="post-form">
                <textarea className="post-text" name="text"></textarea>
                <Button type='submit' text='Post' className='btn' onClick={createPost}/>
            </form>
        </>
    )
}


export default CreatePost