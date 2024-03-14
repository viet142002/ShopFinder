import { Menu, Layout, Avatar } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import {
    MdOutlineNotifications,
    MdOutlineStoreMallDirectory
} from 'react-icons/md';
import {
    LoginOutlined,
    ShareAltOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;

import { unsetUser } from '../../redux/userSlice';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}

function SideBar({ ...props }) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(true);

    const { data, isAuth } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const menuItemsUpper = [
        {
            key: 'home',
            icon: <HiOutlineViewfinderCircle size={18} />,
            label: 'Cửa hàng gần đây'
        },
        {
            key: 'cart',
            icon: <ShoppingCartOutlined />,
            label: 'Giỏ hàng'
        },
        {
            key: 'notification',
            icon: <MdOutlineNotifications size={18} />,
            label: 'Thông báo'
        },
        {
            key: 'share-store',
            icon: <ShareAltOutlined />,
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
    ];

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
            case 'profile':
                navigate('/profile');
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
                    selectedKeys={pathname.split('/')[1] || 'home'}
                    onClick={handleClick}
                    items={menuItemsUpper}
                />
                <Menu
                    theme="light"
                    mode="vertical"
                    selectedKeys={pathname.split('/')[1]}
                    onClick={handleClick}
                    subMenuOpenDelay={0.15}
                    items={[
                        isAuth
                            ? getItem(
                                  'Hồ sơ',
                                  'profiles',
                                  <Avatar
                                      className="flex-shrink-0 -translate-x-[calc(50%-10px)]"
                                      size={35}
                                      src={
                                          import.meta.env.VITE_APP_API_URL +
                                          (data.avatar
                                              ? data.avatar.path
                                              : '/images/avatar-default.png')
                                      }
                                  />,
                                  [
                                      getItem('Thông tin cá nhân', 'profile'),
                                      getItem('Đơn hàng của bạn', 'order'),
                                      getItem('Đăng xuất', 'logout')
                                  ]
                              )
                            : {
                                  key: 'login',
                                  icon: <LoginOutlined />,
                                  label: 'Đăng nhập'
                              }
                    ]}
                />
            </div>
        </Sider>
    );
}

export default SideBar;
