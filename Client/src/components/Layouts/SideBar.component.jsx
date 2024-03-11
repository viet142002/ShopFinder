import { Menu, Layout } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import {
    MdOutlineNotifications,
    MdOutlineStoreMallDirectory,
    MdOutlineLogout,
    MdShare
} from 'react-icons/md';
import { TbShoppingCart, TbShoppingCartCopy } from 'react-icons/tb';

const { Sider } = Layout;

import { unsetUser } from '../../redux/userSlice';

function SideBar({ ...props }) {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(true);

    const { data, isAuth } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const handleClick = (item) => {
        switch (item.key) {
            case 'home':
                navigate('/');
                break;
            case 'logout':
                dispatch(unsetUser());
                navigate('/login');
                break;
            case 'login':
                navigate('/login');
                break;
            case 'share-store':
                navigate('/share-store');
                break;
            case 'retailer-manager':
                if (!isAuth) {
                    navigate('/login');
                    break;
                }
                if (data.role === 'retailer') {
                    navigate('/retailer/dashboard');
                    break;
                }
                if (data.isPendingRetailer === true) {
                    navigate('/register-retailer-pending');
                    break;
                }
                navigate('/register-retailer');
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
            {...props}
        >
            <div className="demo-logo-vertical" />
            <div className="flex h-full flex-col justify-between">
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={'home'}
                    onClick={handleClick}
                    items={[
                        {
                            key: 'home',
                            icon: <HiOutlineViewfinderCircle size={18} />,
                            label: 'Cửa hàng gần đây'
                        },
                        {
                            key: 'order',
                            icon: <TbShoppingCartCopy size={18} />,
                            label: 'Đơn hàng'
                        },
                        {
                            key: 'cart',
                            icon: <TbShoppingCart size={18} />,
                            label: 'Giỏ hàng'
                        },
                        {
                            key: 'notification',
                            icon: <MdOutlineNotifications size={18} />,
                            label: 'Thông báo'
                        },
                        {
                            key: 'share-store',
                            icon: <MdShare size={18} />,
                            label: 'Chia sẻ cửa hàng'
                        },
                        {
                            key: 'retailer-manager',
                            icon: <MdOutlineStoreMallDirectory />,
                            label:
                                data.role === 'retailer'
                                    ? 'Quản lý cửa hàng'
                                    : 'Đăng ký cửa hàng'
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
                            icon: <MdOutlineLogout size={18} />,
                            label: isAuth ? 'Đăng xuất' : 'Đăng nhập'
                        }
                    ]}
                />
            </div>
        </Sider>
    );
}

export default SideBar;
