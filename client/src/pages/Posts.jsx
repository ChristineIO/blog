import { useState, useEffect } from "react"
import HomeLink from "../components/HomeLink"
import ToggleButton from "../components/Buttons/ToggleButton"
import { Link } from "react-router-dom"
import LogoutButton from "../components/Buttons/LogoutButton"
import truncateText from "../components/truncateText"
import { checkAuth } from "../api"
import MenuButton from "../components/Buttons/MenuButton"
import Dropdown from "../components/Dropdown/Dropdown"
const Posts = () => {
    const [posts, setPost] = useState([])
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
    useEffect(() => {
        const fetchAuth = async () => {
            let userAuth = await checkAuth()
            if (userAuth.data.success) {
                setAuthBtn(false);
                setLogout(true);
            } else if (!userAuth.data.success) {
                setLogout(false);
                setAuthBtn(true);
            }
        };

        fetchAuth();
    }, [])
    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then((res) => res.json())
            .then((data) => setPost(data))
    }, [])

    return (
        <>
            <div className="navbar">
                <HomeLink />
                <div className='auth-buttons'>
                    <ToggleButton />
                    {
                        authBtn ?
                            <>
                                <Link to='/signup' className='auth-btn'>Sign up</Link>
                                <Link to='/login' className='auth-btn'>Login</Link>
                            </>
                            : <Link to='/profile' className='auth-btn'>Profile</Link>
                    }

                    {logout ? <LogoutButton /> : <></>}
                    <MenuButton />
                </div>
            </div>
            <Dropdown />
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