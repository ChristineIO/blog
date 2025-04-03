import { useState, useEffect } from "react"
import HomeLink from "../components/HomeLink"
import ToggleButton from "../components/Buttons/ToggleButton"
import { Link } from "react-router-dom"
import LogoutButton from "../components/Buttons/LogoutButton"
const Posts = () => {
    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

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
                <LogoutButton />
            </div>
            <div className="posts">
                {posts.map((post) => (
                    <div className='post' key={post._id}>
                        <Link to={`/posts/${post._id}`}>
                            <div className='post-content'>
                                <p>{truncateText(post.text, 100)}</p>
                            </div>
                            <div className='post-info'>
                                <div className='user'>
                                    <p>{post.user || 'Unknown User'}</p>
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