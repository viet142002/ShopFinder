import { useSelector } from 'react-redux';
import SearchLocation from '../SearchLocation/SearchLocation.component';

function HeaderMap() {
    const showRouting = useSelector((state) => state.routing.showRouting);
    return (
        <header className="absolute left-1/2 z-[999] mt-[20px] -translate-x-1/2">
            {!showRouting && <SearchLocation />}
        </header>
    );
}

export default HeaderMap;
