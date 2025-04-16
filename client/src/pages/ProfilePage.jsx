import { use, useEffect, useState } from "react"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import { checkAuth, getPosts, getUserPost, getUserSpacePosts } from "../api"
import { jwtDecode } from "jwt-decode"
import { Link } from "react-router-dom"
import truncateText from "../components/truncateText"
import PostButtons from "../components/PostButtons"
import LogoutButton from "../components/Buttons/LogoutButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import './styles/ProfilePage.css'
import MenuButton from "../components/Buttons/MenuButton"
import Dropdown from "../components/Dropdown/Dropdown"
import Button from "../components/MyButton"

const ProfilePage = () => {
    const [posts, setPosts] = useState([])
    const [spacePosts, setSpacePosts] = useState([])
    const [logout, setLogout] = useState(false)
    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    let currentSpaceName = sessionStorage.getItem('spaceName')
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
            setUser(decode_user.username)
            setDate(decode_user.date)
            console.log(decode_user[0] + ' ' + userPosts[1])
            let userSpacePosts = await getUserSpacePosts(decode_user.username)
            let spaces = userSpacePosts

            const postsByUser = spaces.flatMap(space =>
                space.posts.filter(post => post.user === decode_user.username)
            );
            setSpacePosts(postsByUser)
        }
        loadUserData()
    }, [])
    return (
        <div className="profile-page">
            <div className="navbar">
                <div className="logo">
                    <HomeLink />
                </div>
                <PostButtons />
                <ToggleButton />
                <MenuButton />
                {logout ? <LogoutButton /> : <></>}
            </div>
            <Dropdown />
            <div className="profile">
                <div className="profile-content">
                    <div className="profile-pic"><FontAwesomeIcon icon={faUser} /></div>
                    <div className="profile-info">
                        <div className="info"><span>Username:</span> {user}</div>
                        <div className="info"><span>Profile Created: </span> {date.split('T')[0]}</div>
                    </div>
                </div>
                <h1>Your Posts ({posts.length})</h1>
                <div className="posts">
                    {posts.length > 0 ? posts.map((post) => (
                        <div className='post' key={post._id}>
                            <Link to={`/posts/${post._id}`}>
                                <div className='post-content'>
                                    <p>{truncateText(post.text, 33)}</p>
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
                    )) : <h1 className="no-posts">No posts yet.</h1>}
                </div>
                <h1>Space Posts ({spacePosts.length})</h1>
                <div className="posts">
                    {spacePosts.length > 0 ? spacePosts.map((post, index) => (
                        <div className='post' key={index}>
                            <div className='post-content'>
                                <p>{truncateText(post.text, 33)}</p>
                            </div>
                            <div className='post-info'>
                                <div className='user'>
                                    <p>{post.user || 'Unknown User'}</p>
                                </div>
                                <div className='date'>
                                    <p>{new Date(post.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )) : <h1 className="no-posts">No space posts yet.</h1>}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage