import { Link } from 'react-router-dom';
import Post from '../components/Post'

const Home = () => {
    return (
        <div>
            <div className='navbar'>

                <div className='logo'>
                    <h1><Link to='/' className='logo'>Blog</Link></h1>
                </div>

                <div className='auth-buttons'>
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
            <div className='posts'>
                     <Post />
                </div>
        </div>
    )
}

export default Home;