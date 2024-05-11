import { Layout } from 'antd';
import { useDispatch } from 'react-redux';

import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
import { setCollapsed } from '~/redux/sidebarSlice';

function HeaderLayout() {
    const dispatch = useDispatch();

    const onOpen = () => {
        dispatch(setCollapsed(false));
    };

    return (
        <Header className="fixed left-0 right-0 top-0 z-[9999] bg-white !p-0">
            <div className="flex h-full items-center justify-between px-4">
                <div className="flex items-center">
                    <img
                        src="/logo_removebg.png"
                        alt="logo"
                        className="h-8 w-8"
                    />
                    <span className="text-xl font-bold">ShopFinder</span>
                </div>
                <button onClick={onOpen}>
                    <MenuOutlined className="text-xl" />
                </button>
            </div>
        </Header>
    );
}

export default HeaderLayout;
