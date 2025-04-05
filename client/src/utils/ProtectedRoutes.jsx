import { Outlet, useNavigate } from 'react-router-dom'
import { checkAuth } from '../api'

const ProtectedRoutes = async () => {
    let navigate = useNavigate()
    const userAuth = await checkAuth()
    return userAuth ? <Outlet /> : navigate('/login')
}

export default ProtectedRoutes