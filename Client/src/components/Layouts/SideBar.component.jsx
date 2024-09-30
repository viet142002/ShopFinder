import { Menu, Avatar, Badge } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { MdOutlineNotifications } from 'react-icons/md';
import {
    LoginOutlined,
    ShareAltOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import { unsetUser } from '~/redux/userSlice';
import { setNotifications, setOneNotify } from '~/redux/notificationSlice';
import { getNotifications } from '~/api/notificationApi';

import { notification } from '~/utils/index';

import socket from '../../socket';
import SidebarContainer from './SideBarContainer';
import { useAuth } from '~/hooks/useAuth';

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

    const { data, isAuth } = useAuth();
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
            case 'cart':
                navigate('/cart');
                break;
            case 'notification':
                navigate('/notification');
                break;
            case 'order':
                return navigate('/order');
            case 'list-shared':
                return navigate('/list-shared');
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
            const { avatar, fullname, logo } = data.from;
            if (data.type === 'ORDER') {
                notification({
                    icon: logo,
                    body: data.message,
                    title: 'Thông báo mới'
                });
            } else {
                notification({
                    icon: avatar,
                    body: `${fullname} ${data.message}`,
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
                                      src={data?.avatar?.path || '/avt-default.jpg'}
                                  />,
                                  [
                                      getItem('Thông tin cá nhân', 'profile'),
                                      getItem('Đơn hàng của bạn', 'order'),
                                      getItem('Lịch sử chia sẻ', 'list-shared'),
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
