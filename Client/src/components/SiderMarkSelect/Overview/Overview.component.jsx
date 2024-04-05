import { MdOutlineLocationOn, MdOutlineShareLocation } from 'react-icons/md';
import { Divider } from 'antd';
import { useSelector } from 'react-redux';

import Actions from './Actions/Actions';
import ShippingPrice from './ShippingPrice';

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
            <Divider className="my-[16px]" />
            <div className="mx-10">
                <ShippingPrice retailerId={info._id} />
            </div>
        </>
    );
}

export default OverviewInfo;
