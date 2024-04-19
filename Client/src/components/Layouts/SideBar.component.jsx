import { Menu, Avatar, Badge } from 'antd';
import { useEffect } from 'react';
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

import { unsetUser } from '../../redux/userSlice';
import { setNotifications, setOneNotify } from '../../redux/notificationSlice';
import { getNotifications } from '@api/notificationApi';

import { notification } from '@utils/notification';

import socket from '../../socket';
import SidebarContainer from './SideBarContainer';
import { returnUrl } from '@utils/returnUrl';

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

    const { data, isAuth } = useSelector((state) => state.user);
    const { countNotRead } = useSelector((state) => state.notification);

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
            icon: (
                <Badge
                    count={countNotRead}
                    size="small"
                    overflowCount={99}
                    style={{
                        backgroundColor: 'transparent',
                        color: 'black',
                        boxShadow: 'none'
                    }}
                >
                    <MdOutlineNotifications size={18} />
                </Badge>
            ),
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
                if (!data?.pendingRetailer?.status) {
                    navigate('/register-retailer');
                    break;
                }
                if (data.pendingRetailer.status === 'pending') {
                    navigate('/register-retailer-pending');
                    break;
                }
                if (data.pendingRetailer.status === 'rejected') {
                    navigate(`/register-retailer-pending`);
                    break;
                }
                if (
                    data.role === 'retailer' &&
                    data.pendingRetailer.status === 'approved'
                ) {
                    navigate(
                        `/retailer/${data.pendingRetailer.retailer}/dashboard`
                    );
                    break;
                }
                navigate('/register-retailer');
                break;
            case 'cart':
                navigate('/cart');
                break;
            case 'notification':
                navigate('/notification');
                break;
            case 'order':
                return navigate('/order');
            default:
                break;
        }
    };

    useEffect(() => {
        if (!isAuth) return;
        getNotifications({ toUser: data._id }).then((res) => {
            dispatch(setNotifications(res.data));
        });
        socket.on('notification', (data) => {
            const { avatar, firstname, lastname, logo } = data.from;
            if (data.type === 'ORDER') {
                notification({
                    icon: logo,
                    body: data.message,
                    title: 'Thông báo mới'
                });
            } else {
                notification({
                    icon: avatar,
                    body: `${firstname} ${lastname} ${data.message}`,
                    title: 'Thông báo mới'
                });
            }
            dispatch(setOneNotify(data));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <SidebarContainer
            MenuTop={
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={pathname.split('/')[1] || 'home'}
                    onClick={handleClick}
                    items={menuItemsUpper}
                />
            }
            MenuBottom={
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
                                      alt="avatar"
                                      className="flex-shrink-0 -translate-x-[calc(50%-10px)]"
                                      size={35}
                                      src={returnUrl({ user: data })}
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
            }
            {...props}
        />
    );
}

export default SideBar;
