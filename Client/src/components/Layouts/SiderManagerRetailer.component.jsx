import { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UserOutlined } from '@ant-design/icons';
import {
    MdOutlineDashboard,
    MdOutlineLogout,
    MdOutlineHome
} from 'react-icons/md';
import { BsBox } from 'react-icons/bs';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';
import { CiImport } from 'react-icons/ci';

import { getInfoMyRetailerApi } from '../../api/retailerApi';

import { unsetUser } from '../../redux/userSlice';

const { Sider } = Layout;
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
    const retailer = useSelector((state) => state.retailer.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getInfoMyRetailerApi().then((res) => {
            dispatch({
                type: 'retailer/setRetailer',
                payload: res.data.retailer
            });
        });
    }, [dispatch]);

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
                navigate('/login');
                break;
            case 'profile':
                navigate('./profile');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Sider
                className="hidden md:block"
                theme="light"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >
                <div className="flex h-full flex-col justify-between">
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
                    <Menu
                        mode="inline"
                        onClick={(e) => handleClick(e)}
                        selectable={false}
                        items={[
                            {
                                key: '6',
                                icon: <MdOutlineHome size={18} />,
                                label: 'Về trang chủ'
                            },
                            {
                                key: '7',
                                icon: <MdOutlineLogout size={18} />,
                                label: 'Đăng xuất'
                            }
                        ]}
                    />
                </div>
            </Sider>
        </>
    );
}

export default SiderManagerRetailer;
