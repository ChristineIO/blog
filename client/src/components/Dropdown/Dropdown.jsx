import './Dropdown.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { checkAuth } from '../../api'
import LogoutButton from '../Buttons/LogoutButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faUsersRays } from '@fortawesome/free-solid-svg-icons'

const Dropdown = ({ style }) => {
    const [authBtn, setAuthBtn] = useState(true)
    const [logout, setLogout] = useState(false)
    const [space, setSpace] = useState(false)
    let currentSpace = sessionStorage.getItem('spaceName')
    
    useEffect(() => {
        if (currentSpace) {
            setSpace(true)
        }
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
    return (
        <>
            <div className="dropdown" style={style}>
                <div id='dropdown-list'>
                
                    <Link to='/create-post' className='dropdown-item'>Create Post</Link>
                    <Link to='/posts' className='dropdown-item'>Posts</Link>
                    <Link to='/spaces' className='dropdown-item'><FontAwesomeIcon icon={faUserGroup} /> Spaces</Link>
                    {space ? <Link to={`/spaces/${currentSpace}`} className='dropdown-item'><FontAwesomeIcon icon={faUsersRays} />   {currentSpace}</Link> : <></>}
                    {authBtn ?
                        <>
                            <Link to='/signup' className='dropdown-item'>Sign up</Link>
                            <Link to='/login' className='dropdown-item'>Login</Link>
                        </>
                        :
                        <>
                            <Link to='/profile' className=' dropdown-item'>Profile</Link>
                        </>
                    }
                    {logout ? <LogoutButton classMarkup='dropdown-item' /> : <></>}
                </div>
            </div>
        </>
    )
}

export default Dropdown