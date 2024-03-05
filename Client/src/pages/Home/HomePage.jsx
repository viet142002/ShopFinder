import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';

import Map from '../../components/Map/Map.component';
import HeaderMap from '../../components/Layouts/HeaderMap.component';
import SiderMarkSelect from '../../components/SiderMarkSelect/SiderMarkSelect.component';

function HomePage() {
    const p = useSelector((state) => state.routing.fixedLocation);
    const markSelected = useSelector((state) => state.routing.markSelected);

    return (
        <>
            <HeaderMap />
            {p.lat !== 0 ? <Map /> : 'loading'}
            {markSelected.lng && (
                <SiderMarkSelect markSelected={markSelected} />
            )}
        </>
    );
}

export default HomePage;
