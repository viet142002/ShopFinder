import { Menu } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { MdOutlineNotifications } from 'react-icons/md';
import {
    MdOutlineReport,
    MdOutlineDashboard,
    MdOutlineLogout
} from 'react-icons/md';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';

import { unsetUser } from '@redux/userSlice';
import SidebarContainer from './SideBarContainer';

function SiderManage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (item) => {
        switch (item.key) {
            case 'dashboard':
                navigate('/admin/dashboard');
                break;
            case 'retailer':
                navigate('/admin/retailer');
                break;
            case 'reports':
                navigate('/admin/reports');
                break;
            case 'users':
                navigate('/admin/users');
                break;
            case 'information':
                navigate('/admin/information');
                break;
            case '6':
                dispatch(unsetUser());
                navigate('/login');
                break;
            default:
                break;
        }
    };

    const items = [
        {
            key: 'dashboard',
            icon: <MdOutlineDashboard size={18} />,
            label: 'Tổng quan',
            name: 'dashboard'
        },
        {
            key: 'retailer',
            icon: <VscGitPullRequestGoToChanges size={18} />,
            label: 'Cửa hàng',
            name: 'retailer'
        },
        {
            key: 'reports',
            icon: <MdOutlineReport size={18} />,
            label: 'Báo cáo',
            name: 'reports'
        },
        {
            key: 'users',
            icon: <MdOutlineReport size={18} />,
            label: 'Quản lý người dùng',
            name: 'users'
        },
        {
            key: 'information',
            icon: <MdOutlineReport size={18} />,
            label: 'Quản lý thông tin cộng đồng',
            name: 'information'
        }
    ];

    const MenuTop = (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={
                items.findIndex(
                    (item) => item.name === location.pathname.split('/')[2]
                ) +
                1 +
                ''
            }
            onClick={(e) => handleClick(e)}
            items={items}
        />
    );

    const MenuBottom = (
        <Menu
            mode="inline"
            onClick={(e) => handleClick(e)}
            selectable={false}
            items={[
                // {
                //     key: '5',
                //     icon: <UserOutlined />,
                //     label: 'Tài khoản'
                // },
                {
                    key: '6',
                    icon: <MdOutlineLogout size={18} />,
                    label: 'Đăng xuất'
                }
            ]}
        />
    );

    return (
        <>
            <SidebarContainer MenuTop={MenuTop} MenuBottom={MenuBottom} />
        </>
    );
}

export default SiderManage;
