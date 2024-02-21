import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';

import SideBar from '../components/Layouts/SideBar.component';
import HeaderMap from '../components/Layouts/HeaderMap.component';
import Map from '../components/Map/Map.component';
import SiderMarkSelect from '../components/SiderMarkSelect/SiderMarkSelect.component';

const { Content } = Layout;

const DefaultLayout = () => {
    const p = useSelector((state) => state.routing.fixedLocation);
    const markSelected = useSelector((state) => state.routing.markSelected);

    return (
        <Layout className="h-dvh">
            {/* <HeaderLayout /> */}
            <SideBar />
            <Content className="relative overflow-hidden">
                <Outlet />
                {p.lat !== 0 ? <Map /> : 'loading'}
                <HeaderMap />
                {markSelected.lng && (
                    <SiderMarkSelect markSelected={markSelected} />
                )}
            </Content>
            {/* <FooterLayout /> */}
        </Layout>
    );
};

export default DefaultLayout;
