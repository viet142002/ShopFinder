import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import 'leaflet/dist/leaflet.css';

import SideBar from '../components/Layouts/SideBar.component';
import HeaderLayout from '@components/Layouts/Header.component';
import { useMobile } from '@hooks/useMobile';
import { useSelector } from 'react-redux';

const { Content } = Layout;

const DefaultLayout = () => {
    const { isMobile } = useMobile();
    const { collapsed } = useSelector((state) => state.sidebar);

    return (
        <Layout hasSider>
            <SideBar />
            <Layout>
                {isMobile && <HeaderLayout />}
                <Content
                    className={
                        isMobile
                            ? 'relative min-h-svh overflow-x-hidden pt-[4rem]'
                            : 'min-h-svh'
                    }
                    style={{
                        marginLeft: isMobile ? 0 : collapsed ? 70 : 200,
                        transition: 'all 0.2s'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
