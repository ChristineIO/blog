import { useState, useEffect } from "react"
import HomeLink from "../components/HomeLink"
import ToggleButton from "../components/Buttons/ToggleButton"
import { Link } from "react-router-dom"
import LogoutButton from "../components/Buttons/LogoutButton"
import truncateText from "../components/truncateText"
import { checkAuth } from "../api"
import MenuButton from "../components/Buttons/MenuButton"
import Dropdown from "../components/Dropdown/Dropdown"
import ReactMarkdown from 'react-markdown'

const Posts = () => {
    const [posts, setPost] = useState([])
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
    const [filterOption, setFilterOption] = useState("all");
    let URL = import.meta.env.VITE_URL
    if (import.meta.env.VITE_NODE_ENV == "dev") {
        URL = import.meta.env.VITE_DEV_URL
    }
    const now = new Date()
    const filteredPosts = [...posts]
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // im adding this to sort the newest first regardles
        .filter(post => {
            const postDate = new Date(post.date);
            console.log(`post date = ${postDate}`)

            if (filterOption === "recent") {
                const diffHours = (now - postDate) / (1000 * 60 * 60);
                return diffHours <= 24;
            }

            if (filterOption === "week") {
                const diffDays = (now - postDate) / (1000 * 60 * 60 * 24);
                return diffDays <= 7;
            }

            if (filterOption === "month") {
                return postDate.getMonth() === now.getMonth() &&
                    postDate.getFullYear() === now.getFullYear();
            }

            return true;
        });
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
        fetch(`${URL}/posts`)
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
            <div className="filter-option">
                <select name="Filter" onChange={(e) => setFilterOption(e.target.value)} value={filterOption} className="filter">
                    <option disabled>Filter</option>
                    <option value="all">All</option>
                    <option value="recent">Recent</option>
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                </select>
            </div>
            <div className="posts">
                {filteredPosts.map((post) => (
                    <div className='post' key={post._id}>
                        <Link to={`/posts/${post._id}`}>
                            <div className='post-content'>
                                <ReactMarkdown>{truncateText(post.text, 70)}</ReactMarkdown>
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