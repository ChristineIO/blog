import { faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
const PostButtons = () => {
    return (
        <div className='post-btn'>
            <Link to='/create-post' className='auth-btn'>Create Post</Link>
            <Link to='/posts' className='auth-btn'>Posts</Link>
            <Link to='/spaces' className='auth-btn'><FontAwesomeIcon icon={faUserGroup}/> Spaces</Link>
        </div>
    )
}

export default PostButtons