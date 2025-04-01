import { useState, useEffect } from "react"
import HomeLink from "../components/HomeLink"
import ToggleButton from "../components/Buttons/ToggleButton"
import { Link } from "react-router-dom"
const Posts = () => {
    const [posts, setPost] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then((res) => res.json())
            .then((data) => setPost(data))
    }, [])

    return (
        <>
            <div className="navbar">
                <HomeLink />
                <ToggleButton />
            </div>
            <div className="posts">
                {posts.map((post) => (
                    <div className='post' key={post.id}>
                        <Link to={`/posts/${post._id}`}>
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
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Posts