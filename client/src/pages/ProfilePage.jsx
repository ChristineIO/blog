import { useEffect, useState } from "react"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import { checkAuth, getPosts, getUserPost } from "../api"
import { jwtDecode } from "jwt-decode"
import { Link } from "react-router-dom"
import truncateText from "../components/truncateText"
import PostButtons from "../components/PostButtons"
import LogoutButton from "../components/Buttons/LogoutButton"

const ProfilePage = () => {
    const [posts, setPosts] = useState([])
    const [logout, setLogout] = useState(false)
    useEffect(() => {
        async function loadUserData() {
            const user = await checkAuth()
            if (user) {
                setLogout(true)
            } else {
                setLogout(false)
            }
            const token = user.data.token
            const decode_user = jwtDecode(token.toString())
            const userPosts = await getUserPost(decode_user.username)
            setPosts(userPosts)
            console.log(decode_user.username + ' ' + userPosts[1])
        }
        loadUserData()
    }, [])
    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <HomeLink />
                </div>
                <PostButtons />
                <ToggleButton />
                {logout ? <LogoutButton /> : <></>}
            </div>
            <div className="profile-content"><h1>Your Posts</h1></div>
            <div className="posts">
                {posts.map((post) => (
                    <div className='post' key={post._id}>
                        <Link to={`/posts/${post._id}`}>
                            <div className='post-content'>
                                <p>{truncateText(post.text)}</p>
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

export default ProfilePage