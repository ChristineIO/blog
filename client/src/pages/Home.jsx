import { Link } from 'react-router-dom';
import Post from '../components/Post'

const Home = () => {
    return (
        <div>
            <div className='navbar'>

                <div className='logo'>
                    <h1><Link to='/' className='logo'>Blog</Link></h1>
                </div>
                    <Link to='/blogs' className='auth-btn post-btn'>Posts</Link>

                <div className='auth-buttons'>
                    <Link to='/signup' className='auth-btn'>Sign up</Link>
                    <Link to='/login' className='auth-btn'>Login</Link>
                </div>
            </div>
            <div className='posts'>
                <Post />
            </div>
        </div>
    )
}

export default Home;