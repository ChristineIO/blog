import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useParams, useNavigate } from "react-router-dom"
import { deletePost, getSpacePost, checkAuth } from "../api";
import HomeLink from "../components/HomeLink"
import ToggleButton from "../components/Buttons/ToggleButton"
import Button from "../components/MyButton";
import './styles/Post.css'

const OneSpacePost = () => {
    const [post, setPost] = useState({})
    const [auth, setAuth] = useState(false)
    let params = useParams()
    let id = params.id;
    let navigate = useNavigate()

    useEffect(() => {
        async function loadPost() {
            let response = await getSpacePost(id)
            let postData = response.posts
            if (postData) {
                setPost(postData[0])
            } else {
                return <h1>Blog Does Not Exist</h1>
            }
            let authUser = await checkAuth()
            const token = authUser.data.token
            const decode_user = jwtDecode(token.toString())
            const username = decode_user.username
            if(postData[0].user === username && authUser.data.success) {
                setAuth(true)
            }
            else {
                setAuth(false)
            }
        }
        loadPost()
    }, [])

    const deletePostAction = async () => {
        await deletePost(id)
        navigate('/posts')
    }

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
                        <p>{post.text || 'Unknown Content'}</p>
                    </div>
                    <div className='post-info'>
                        <div className='user'>
                            <p>{post.user || 'Unknown User'}</p>
                        </div>
                        <div className='date'>
                            <p>{new Date(post.date).toLocaleDateString() || 'Unknown Date'}</p>
                        </div>
                    </div>
                </div>
            </div>
            {auth ? <div className="delete-btn">

                <Button text='Delete Post' className='btn' onClick={deletePostAction} />
            </div> : <></>}
        </>
    )
}

export default OneSpacePost