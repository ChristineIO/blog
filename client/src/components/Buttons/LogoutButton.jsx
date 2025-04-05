import { logoutUser } from "../../api"
import { redirect, useNavigate } from "react-router-dom"

const LogoutButton = ({classMarkup = 'auth-btn'}) => {

    let navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        redirect('/')
    }

    return (

        <button onClick={handleLogout} className={classMarkup}>Logout</button>  
    )
}

export default LogoutButton