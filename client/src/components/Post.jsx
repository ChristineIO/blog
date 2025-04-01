import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Post = ({ post: propPost }) => {
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
            {posts.slice(0, 3).map((post) => (
                <div className='post' key={post.id}>
                    <Link to={`/posts/${post._id}`}>
                        <div className='post-content'>
                            <p>{truncateText(post.text, 70)}</p>
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
        </>
    )
}

export default Post;