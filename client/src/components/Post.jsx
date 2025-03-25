import { useState, useEffect } from "react"
const Post = ({post: propPost}) => {
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch("http://localhost:5000")
            .then((response) => response.json())
            .then((data) => setPost(data))
    }, [])

    return (
        <>
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
        </>
    )
}

export default Post;