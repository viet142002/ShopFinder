import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import SiderManage from '../components/Layouts/SiderManage.component';
import SiderManageRetailer from '../components/Layouts/SiderManagerRetailer.component';

const { Content } = Layout;

function ManageLayout({ role = 'admin' }) {
    return (
        <Layout hasSider>
            {role === 'retailer' ? <SiderManageRetailer /> : <SiderManage />}
            <Content className="ml-[200px] min-h-svh">
                <Outlet />
            </Content>
        </Layout>
    );
}

export default ManageLayout;
