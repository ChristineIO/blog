import { logoutUser } from "../../api"
import { useNavigate } from "react-router-dom"

const LogoutButton = () => {
    let navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        navigate('/home')
    }

    return (

        <button onClick={handleLogout} className='auth-btn'>Logout</button>
    )
}

export default LogoutButton