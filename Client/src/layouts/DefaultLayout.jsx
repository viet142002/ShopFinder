import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import 'leaflet/dist/leaflet.css';

import SideBar from '../components/Layouts/SideBar.component';

const { Content } = Layout;

const DefaultLayout = () => {
    return (
        <Layout className="h-dvh">
            <SideBar className="z-[9999] hidden overflow-hidden md:block" />
            <Content className="relative overflow-y-auto overflow-x-hidden">
                <Outlet />
            </Content>
        </Layout>
    );
};

export default DefaultLayout;
