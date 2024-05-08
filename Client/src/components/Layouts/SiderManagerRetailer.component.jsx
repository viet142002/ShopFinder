import { useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UserOutlined } from '@ant-design/icons';
import { MdOutlineDashboard, MdOutlineLogout } from 'react-icons/md';
import { BsBox } from 'react-icons/bs';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';
import { CiImport } from 'react-icons/ci';

import { unsetUser } from '@redux/userSlice';
import socket from '../../socket';
import { notification } from '@utils/notification';
import SidebarContainer from './SideBarContainer';

const items = [
    {
        key: 'dashboard',
        icon: <MdOutlineDashboard size={18} />,
        label: 'Tổng quan'
    },
    {
        key: 'product',
        icon: <BsBox size={18} />,
        label: 'Sản phẩm'
    },
    {
        key: 'order',
        icon: <VscGitPullRequestGoToChanges size={18} />,
        label: 'Đơn hàng'
    },
    {
        key: 'import-product',
        icon: <CiImport size={18} />,
        label: 'Nhập hàng'
    },
    {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Thông tin cửa hàng'
    }
];

const itemsNotQuantity = [
    {
        key: 'dashboard',
        icon: <MdOutlineDashboard size={18} />,
        label: 'Tổng quan'
    },
    {
        key: 'product',
        icon: <BsBox size={18} />,
        label: 'Sản phẩm'
    },
    {
        key: 'order',
        icon: <VscGitPullRequestGoToChanges size={18} />,
        label: 'Đơn hàng'
    },
    {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Thông tin cửa hàng'
    }
];

const itemsOnlyPickup = [
    {
        key: 'dashboard',
        icon: <MdOutlineDashboard size={18} />,
        label: 'Tổng quan'
    },
    {
        key: 'product',
        icon: <BsBox size={18} />,
        label: 'Sản phẩm'
    },
    {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Thông tin cửa hàng'
    }
];

function SiderManagerRetailer() {
    const { retailer } = useSelector((state) => state.retailer.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (item) => {
        switch (item.key) {
            case 'dashboard':
                navigate('./dashboard');
                break;
            case 'product':
                navigate('./product');
                break;
            case 'order':
                navigate('./order');
                break;
            case 'import-product':
                navigate('./import-product');
                break;
            case '6':
                navigate('/');
                break;
            case '7':
                dispatch(unsetUser());
                navigate('/login-retailer');
                break;
            case 'profile':
                navigate('./profile');
                break;
            default:
                break;
        }
    };

    const MenuTop = (
        <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            selectedKeys={
                location.pathname === '/retailer'
                    ? ['dashboard']
                    : [location.pathname.split('/')[3]]
            }
            onClick={(e) => handleClick(e)}
            items={
                retailer.mode === 'normal'
                    ? items
                    : retailer.mode === 'only-pickup'
                      ? itemsOnlyPickup
                      : itemsNotQuantity
            }
        />
    );

    const MenuBottom = (
        <Menu
            mode="inline"
            onClick={(e) => handleClick(e)}
            selectable={false}
            items={[
                {
                    key: '7',
                    icon: <MdOutlineLogout size={18} />,
                    label: 'Đăng xuất'
                }
            ]}
        />
    );

    useEffect(() => {
        socket.on('order', (data) => {
            notification({
                title: 'Có đơn hàng mới',
                icon: 'https://via.placeholder.com/150',
                message: `Bạn có một đơn hàng mới từ ${data?.user?.firstname} ${data?.user?.lastname}`
            });
        });
        socket.emit('join-retailer', {
            retailerId: retailer._id,
            name: retailer.name
        });
        return () => {
            socket.off('order');
        };
    }, [retailer._id, retailer.name]);

    return (
        <>
            <SidebarContainer MenuTop={MenuTop} MenuBottom={MenuBottom} />
        </>
    );
}

export default SiderManagerRetailer;
