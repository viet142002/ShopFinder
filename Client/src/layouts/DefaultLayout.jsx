import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import 'leaflet/dist/leaflet.css';

import SideBar from '../components/Layouts/SideBar.component';

const { Content } = Layout;

const DefaultLayout = () => {
    return (
        <Layout className="h-dvh">
            <SideBar className="hidden md:block z-[9999] overflow-hidden" />
            <Content className="relative overflow-auto">
                <Outlet />
            </Content>
        </Layout>
    );
};

export default DefaultLayout;
