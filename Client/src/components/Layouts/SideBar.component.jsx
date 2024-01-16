import { Menu, Layout } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ShopOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

import { unsetUser } from '../../redux/userSlice';

function HeaderLayout() {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(true);

    const { user, isAuth } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const handleClick = (info) => {
        switch (info.key) {
            case 'logout':
                dispatch(unsetUser());
                navigate('/login');
                break;
            case 'login':
                console.log('login');
                navigate('/login');
                break;
            case 'retailer-manager':
                break;
            default:
                break;
        }
    };

    return (
        <Sider
            theme="light"
            className="bg-opacity-50"
            trigger={null}
            collapsible
            collapsedWidth={70}
            collapsed={collapsed}
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
        >
            <div className="demo-logo-vertical" />
            <div className="flex h-full flex-col justify-between">
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={handleClick}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Cửa hàng gần đây'
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Đơn hàng'
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'Giỏ hàng'
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined />,
                            label: 'Thông báo'
                        },
                        {
                            key: 'retailer-manager',
                            icon: <ShopOutlined />,
                            label:
                                user.role === 'retailer'
                                    ? 'Quản lý'
                                    : 'Đăng ký bán hàng'
                        }
                    ]}
                />
                <Menu
                    theme="light"
                    mode="inline"
                    onClick={handleClick}
                    items={[
                        {
                            key: '5',
                            icon: <UserOutlined />,
                            label: 'nav 1'
                        },
                        {
                            key: '6',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2'
                        },
                        {
                            key: isAuth ? 'logout' : 'login',
                            icon: <UploadOutlined />,
                            label: isAuth ? 'Đăng xuất' : 'Đăng nhập'
                        }
                    ]}
                />
            </div>
        </Sider>
    );
}

export default HeaderLayout;
