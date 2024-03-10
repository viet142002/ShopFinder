import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import { Spin } from 'antd';

import Map from '../../components/Map/Map.component';
import HeaderMap from '../../components/Layouts/HeaderMap.component';
import SiderMarkSelect from '../../components/SiderMarkSelect/SiderMarkSelect.component';

function HomePage({ children }) {
    const p = useSelector((state) => state.routing.fixedLocation);
    const markSelected = useSelector((state) => state.routing.markSelected);

    return (
        <>
            <HeaderMap />
            {p.lat !== 0 ? (
                <Map />
            ) : (
                <div className="absolute h-20 w-full left-1/2 top-1/2 -translate-x-1/2">
                    <Spin
                        tip="Đang lấy vị trí..."
                        size="large"
                        style={{
                            margin: '0px'
                        }}
                    >
                        <div className="content" />
                    </Spin>
                </div>
            )}

            {markSelected.lng && (
                <SiderMarkSelect markSelected={markSelected} />
            )}
            {children}
        </>
    );
}

export default HomePage;
