import './Dropdown.css'
import { Link } from "react-router-dom"
const Dropdown = ({ style }) => {
    return (
        <>
            <div className="dropdown" style={style}>
                <div id='dropdown-list'>
                    <Link to='/create-post' className='dropdown-item'>Create Post</Link>
                    <Link to='/posts' className='dropdown-item'>Posts</Link>
                    <Link to='/signup' className='dropdown-item'>Sign up</Link>
                    <Link to='/login' className='dropdown-item'>Login</Link>
                </div>
            </div>
        </>
    )
}

export default Dropdown