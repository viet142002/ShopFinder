import { Navigate, useLocation } from 'react-router-dom';

import { getToken } from '../redux/storage';
import { useSelector } from 'react-redux';

function ProtectRoute({ access = 'customer', children }) {
    const location = useLocation();
    const token = getToken();
    const user = useSelector((state) => state.user);

    if (!token)
        return (
            <Navigate
                to={`/login?redirect=${location.pathname}`}
                state={{ from: location }}
            />
        );
    if (access === 'admin') {
        if (user.data.role !== 'admin')
            return (
                <Navigate
                    to={`/login?redirect=${location.pathname}`}
                    state={{ from: location }}
                />
            );
    }
    if (access === 'retailer') {
        if (user.data.role !== 'retailer')
            return (
                <Navigate
                    to={`/login?redirect=${location.pathname}`}
                    state={{ from: location }}
                />
            );
    }
    return children;
}

export default ProtectRoute;
