import Post from '../components/Post'

const Home = () => {
    console.log("HGGF")
    return (
        <div>
            <div className='navbar'>

                <div className='logo'>
                    <h1>Blog</h1>
                </div>

                <div className='auth-buttons'>
                    <a>Sign up</a>
                    <a>Login</a>
                </div>

                <div className='posts'>
                    <Post />
                </div>
            </div>
        </div>
    )
}

export default Home;