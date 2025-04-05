import { logoutUser } from "../../api"
import { redirect, useNavigate } from "react-router-dom"

const LogoutButton = () => {
    let navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        redirect('/')
    }

    return (

        <button onClick={handleLogout} className='auth-btn'>Logout</button>
    )
}

export default LogoutButton