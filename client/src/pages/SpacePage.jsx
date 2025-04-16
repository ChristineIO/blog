import { useEffect } from "react";
import HomeLink from "../components/HomeLink";
import PostButtons from "../components/PostButtons";
import ToggleButton from "../components/Buttons/ToggleButton";
import './styles/SpacePage.css'
import Dropdown from "../components/Dropdown/Dropdown";
import MenuButton from "../components/Buttons/MenuButton";

const SpacePage = () => {
    let rawPosts = sessionStorage.getItem('spacePosts')
    let posts = JSON.parse(rawPosts)
    let spaceName = sessionStorage.getItem('spaceName')
    console.log('spaceName is ' + spaceName)
    console.log('posts are ' + posts)
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
                                <div className="post-content">
                                    <p>{post.text}</p>
                                </div>
                                <div className="post-info">
                                    <div className="user">
                                        <p>{post.user || 'Unknown User'}</p>
                                    </div>
                                    <div className="date">
                                        <p>{new Date(post.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <div className="no-posts"><h1>No posts yet</h1></div>}
                </div>
            </div>
        </>
    )
}

export default SpacePage;