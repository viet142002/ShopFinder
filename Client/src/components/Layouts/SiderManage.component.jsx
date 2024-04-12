import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdOutlineNotifications } from 'react-icons/md';
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
            case '1':
                navigate('./dashboard');
                break;
            case '2':
                navigate('./request');
                break;
            case '3':
                navigate('./report');
                break;
            case '4':
                navigate('./notification');
                break;
            case '5':
                navigate('./store');
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
            key: '1',
            icon: <MdOutlineDashboard size={18} />,
            label: 'Tổng quan',
            name: 'dashboard'
        },
        {
            key: '2',
            icon: <VscGitPullRequestGoToChanges size={18} />,
            label: 'Yêu cầu',
            name: 'request'
        },
        {
            key: '3',
            icon: <MdOutlineReport size={18} />,
            label: 'Báo cáo',
            name: 'report'
        },
        {
            key: '4',
            icon: <MdOutlineNotifications size={18} />,
            label: 'Thông báo',
            name: 'notification'
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
                {
                    key: '5',
                    icon: <UserOutlined />,
                    label: 'Tài khoản'
                },
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
