import { MdOutlineLocationOn, MdOutlineShareLocation } from 'react-icons/md';
import { useSelector } from 'react-redux';

import Actions from './Actions/Actions';

function OverviewInfo({ info }) {
    const p = useSelector((state) => state.routing.markSelected);
    return (
        <>
            <Actions info={info} />

            <div className="overview-info mx-10 space-y-2">
                <div className="flex items-center gap-x-2">
                    <MdOutlineLocationOn size={30} className="text-blue-500" />
                    <p>
                        {info.address.more},{info.address.ward},{' '}
                        {info.address.district}, {info.address.province}
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdOutlineShareLocation
                        size={30}
                        className="text-blue-500"
                    />
                    <p>
                        {p.lat}, {p.lng}
                    </p>
                </div>
            </div>
        </>
    );
}

export default OverviewInfo;
