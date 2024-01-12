import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import Map from '../components/Map/Map.component';
import SideBar from '../components/Layouts/SideBar.component';
import HeaderMap from '../components/Layouts/HeaderMap.component';
import SiderMarkSelect from '../components/SiderMarkSelect/SiderMarkSelect.component';

const { Content } = Layout;

const DefaultLayout = () => {
    const p = useSelector((state) => state.routing.current);
    return (
        <Layout>
            {/* <HeaderLayout /> */}
            <SideBar />
            <Content>
                <div className="relative overflow-hidden">
                    {p.lat !== 0 ? <Map /> : 'loading'}
                    <HeaderMap />
                    <SiderMarkSelect />
                    <Outlet />
                </div>
            </Content>
            {/* <FooterLayout /> */}
        </Layout>
    );
};

export default DefaultLayout;
