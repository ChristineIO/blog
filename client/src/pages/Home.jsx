import { Link } from 'react-router-dom';
import Post from '../components/Post'
import ToggleButton from '../components/Buttons/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Dropdown from '../components/Dropdown/Dropdown'
import HomeLink from '../components/HomeLink';
import LogoutButton from '../components/Buttons/LogoutButton'
import { useEffect, useState } from 'react'
import { getCookie } from 'react-use-cookie';
import { checkAuth } from '../api';
import PostButtons from '../components/PostButtons';

const Home = () => {
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
    useEffect(() => {
        const fetchAuth = async () => {
            let userAuth = await checkAuth()
            if (userAuth.data.success) {
                setAuthBtn(false);
                setLogout(true);
            } else if (!userAuth.data.success){
                setLogout(false);
                setAuthBtn(true);
            }
        };

        fetchAuth();
    }, [])
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
                
                <PostButtons />

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
                    <button className='toggle-theme menu' onClick={menuVisible}><FontAwesomeIcon icon={faBars} style={{ color: '#A61723' }} /></button>
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