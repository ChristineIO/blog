import { logoutUser } from "../../api"
import { useNavigate } from "react-router-dom"

const LogoutButton = ({classMarkup = 'auth-btn'}) => {

    let navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        window.location.reload()
    }

    return (

        <button onClick={handleLogout} className={classMarkup}>Logout</button>  
    )
}

export default LogoutButton