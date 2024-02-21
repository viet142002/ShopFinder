import { useSelector } from 'react-redux';
// import 'leaflet/dist/leaflet.css';

// import Map from '../../components/Map/Map.component';
import HeaderMap from '../../components/Layouts/HeaderMap.component';
import SiderMarkSelect from '../../components/SiderMarkSelect/SiderMarkSelect.component';

function HomePage() {
    // const p = useSelector((state) => state.routing.current);
    return (
        <div className="overflow-hidden absolute top-0 left-0 h-dvh">
            {/* {p.lat !== 0 ? <Map /> : 'loading'} */}
            <HeaderMap />
            <SiderMarkSelect />
        </div>
    );
}

export default HomePage;
