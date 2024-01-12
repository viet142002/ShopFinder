import { Menu, Layout } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

function HeaderLayout() {
    const [collapsed, setCollapsed] = useState(true);

    const isLogin = false;

    const navigate = useNavigate();

    const handleClick = (item) => {
        switch (item.key) {
            case 'logout':
                navigate('/');
                break;
            case 'login':
                navigate('/login');
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
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Cửa hàng gần đây',
                            onClick: () => handleClick({ key: '1' })
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
                            key: '5',
                            icon: <UploadOutlined />,
                            label: 'Quản lý cửa hàng'
                        }
                    ]}
                />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
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
                            key: isLogin ? 'logout' : 'login',
                            icon: <UploadOutlined />,
                            label: isLogin ? 'Đăng xuất' : 'Đăng nhập'
                        }
                    ]}
                />
            </div>
        </Sider>
    );
}

export default HeaderLayout;
