import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { getToken } from '../redux/storage';
import { useAuth } from '@hooks/useAuth';

function ProtectRoute({ access = 'customer', children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const token = getToken();
    const { data: user } = useAuth();

    const showConfirm = () => {
        Modal.confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn cần đăng nhập để tiếp tục!',
            centered: true,
            okButtonProps: {
                title: 'Đăng nhập',
                className: 'bg-blue-500 text-white'
            },
            okText: 'Đăng nhập',
            onOk() {
                return navigate(`/login?redirect=${location.pathname}`);
            },
            cancelButtonProps: {
                title: 'Quay lại'
            },
            cancelText: 'Quay lại',
            onCancel() {
                return navigate(-1);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    if (!token) {
        showConfirm();
        return;
    }

    if (!token)
        return (
            <Navigate
                to={`/login?redirect=${location.pathname}`}
                state={{ from: location }}
            />
        );

    if (access === 'admin') {
        if (user.role !== 'admin')
            return (
                <Navigate
                    to={`/login?redirect=${location.pathname}`}
                    state={{ from: location }}
                />
            );
    }

    if (access === 'retailer') {
        if (user.role !== 'retailer')
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
