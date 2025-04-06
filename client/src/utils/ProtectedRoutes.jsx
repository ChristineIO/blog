import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../api';

const ProtectedRoutes = () => {
    const navigate = useNavigate();

    //null -loading
    //false- not verified
    //true- verified!
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const auth = await checkAuth();
            if (!auth.data.success) {
                navigate('/login');
                console.log('not verified')
            } else if (auth.data.success) {
                setIsAuth(auth);
            }
        };

        verifyAuth();
    }, [navigate]);

    if (isAuth == null) {
        return <h1 style={{fontSize: '55px', textAlign: 'center', fontFamily: 'Delius', justifySelf: 'center', alignSelf: 'center'}}>Loading...</h1>;
    }

    return <Outlet />;
};

export default ProtectedRoutes;