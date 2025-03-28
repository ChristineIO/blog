import { useState, useEffect } from "react"
import HomeLink from "../components/HomeLink"
import ToggleButton from "../components/Buttons/ToggleButton"
const Posts = () => {
    const [posts, setPost] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/posts")
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
            ))}
            </div>
        </>
    )
}

export default Posts