import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getPost } from "../api";
import HomeLink from "../components/HomeLink"
import ToggleButton from "../components/Buttons/ToggleButton";

const OnePost = () => {
    const [post, setPost] = useState({})
    let params = useParams()
    let id = params.id;

    useEffect(() => {
        async function loadPost() {
            let data = await getPost(id)
            if (data) {
                setPost(data)
            } else {
                return <h1>Blog Does Not Exist</h1>
            }
        } loadPost()
    }, [])

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <HomeLink />
                </div>
                <div className="post-btn">

                    <Link to='/create-post' className="auth-btn">Create Post</Link>
                    <Link to='/posts' className="auth-btn">Posts</Link>
                </div>
                <ToggleButton />
            </div>
            <div className="posts" style={{ minHeight: '0' }}>
                <div className='post'>
                    <div className='post-content'>
                        <p>{post.text}</p>
                    </div>
                    <div className='post-info'>
                        <div className='user'>
                            <p>{post.user}</p>
                        </div>
                        <div className='date'>
                            <p>{new Date(post.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnePost