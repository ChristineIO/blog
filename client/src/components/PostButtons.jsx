import { Link } from "react-router-dom"
const PostButtons = () => {
    return (
        <div className='post-btn'>
            <Link to='/create-post' className='auth-btn'>Create Post</Link>
            <Link to='/posts' className='auth-btn'>Posts</Link>
        </div>
    )
}

export default PostButtons