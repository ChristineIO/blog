import { Link } from 'react-router-dom';
import Post from '../components/Post'
import ToggleButton from '../components/Buttons/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Dropdown from '../components/Dropdown/Dropdown'
import HomeLink from '../components/HomeLink';
import LogoutButton from '../components/Buttons/LogoutButton';


const Home = () => {
    let menuIsVisible = false;
    let menuVisible = () => {
        if (!menuIsVisible) {
            document.getElementById('dropdown-list').style.display = 'grid'
            menuIsVisible = true
        } else if (menuIsVisible) {
            document.getElementById('dropdown-list').style.display = 'none'
            menuIsVisible = false
        }
    }

    return (
        <div>
            
            <div className='navbar'>
                <div className='logo'>
                    <HomeLink />
                </div>
                <div className='post-btn'>
                    <Link to='/create-post' className='auth-btn'>Create Post</Link>
                    <Link to='/posts' className='auth-btn'>Posts</Link>
                </div>

                <div className='auth-buttons'>
                    <ToggleButton />
                    <Link to='/signup' className='auth-btn'>Sign up</Link>
                    <Link to='/login' className='auth-btn'>Login</Link>
                    <LogoutButton />
                    <button className='toggle-theme menu' onClick={menuVisible}><FontAwesomeIcon icon={faBars} style={{color: '#A61723'}}/></button>
                </div>
            </div>
            <div>
                <Dropdown />
            </div>
            <div className='posts'>
                <Post />
            </div>
        </div>
    )
}

export default Home