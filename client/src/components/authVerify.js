import { useEffect } from 'react';
import { checkAuth } from '../api';

const authVerify = () => {
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
}

export default authVerify