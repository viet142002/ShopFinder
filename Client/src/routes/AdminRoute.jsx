import { Navigate, useLocation } from 'react-router-dom';

import { getToken } from '../redux/storage';

function AdminRoute({ children }) {
    const location = useLocation();
    const token = getToken();
    if (!token) return <Navigate to="/login" state={{ from: location }} />;
    return children;
}

export default AdminRoute;
