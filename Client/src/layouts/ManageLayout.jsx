import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import SiderManage from '../components/Layouts/SiderManage.component';
import SiderManageRetailer from '../components/Layouts/SiderManagerRetailer.component';
import { useMobile } from '~/hooks/useMobile';
import HeaderLayout from '~/components/Layouts/Header.component';
import { useSelector } from 'react-redux';

const { Content } = Layout;

function ManageLayout({ role = 'admin' }) {
    const { isMobile } = useMobile();
    const { collapsed } = useSelector((state) => state.sidebar);
    return (
        <Layout hasSider>
            {role === 'retailer' ? <SiderManageRetailer /> : <SiderManage />}
            {isMobile && <HeaderLayout />}
            <Content
                className="min-h-svh overflow-x-hidden"
                style={{
                    marginLeft: isMobile ? 0 : collapsed ? 70 : 200,
                    transition: 'all 0.2s',
                    marginTop: isMobile && '4rem'
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    );
}

export default ManageLayout;
