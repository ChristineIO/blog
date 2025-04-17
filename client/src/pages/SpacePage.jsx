import { useEffect, useState } from "react";
import { getSpace } from "../api";
import { Link, useNavigate } from "react-router-dom";
import HomeLink from "../components/HomeLink";
import PostButtons from "../components/PostButtons";
import ToggleButton from "../components/Buttons/ToggleButton";
import './styles/SpacePage.css'
import Dropdown from "../components/Dropdown/Dropdown";
import MenuButton from "../components/Buttons/MenuButton";
import truncateText from "../components/truncateText";

const SpacePage = () => {
    const [posts, setPosts] = useState([])
    let spaceName = sessionStorage.getItem('spaceName')

    useEffect(() => {
        async function loadSpaceData() {
            let data = spaceName;
            let response = await getSpace(data)
            let spacePosts = response.data.space.posts
            setPosts(spacePosts)
        }
        loadSpaceData()
    }, [])

    return (
        <>
            <div className="navbar">
                <div className='logo'>
                    <HomeLink />
                </div>
                <PostButtons />
                <div className='auth-buttons'>
                    <ToggleButton />
                    <MenuButton />
                </div>
            </div>
            <>
                <Dropdown style={{ display: 'block' }} />
            </>
            <div className="space-page">
                <h1 className="space-name">{spaceName}</h1>
                <div className="posts">
                    {posts.length > 0 ? posts.map((post, index) => {
                        return (
                            <div className="post" key={index}>
                                <Link to={`/spaces/posts/${post._id}`}>
                                <div className="post-content">
                                    <p>{truncateText(post.text, 33)}</p>
                                </div>
                                <div className="post-info">
                                    <div className="user">
                                        <p>{post.user || 'Unknown User'}</p>
                                    </div>
                                    <div className="date">
                                        <p>{new Date(post.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        )
                    }) : <div className="no-posts"><h1>No posts yet</h1></div>}
                </div>
            </div>
        </>
    )
}

export default SpacePage;