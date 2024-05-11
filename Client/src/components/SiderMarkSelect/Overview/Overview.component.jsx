import { MdOutlineLocationOn, MdOutlineShareLocation } from 'react-icons/md';
import { Divider } from 'antd';
import { useSelector } from 'react-redux';

import Actions from './Actions/Actions';
import ShippingPrice from './ShippingPrice';
import RenderAddress from '~/components/RenderAddress';

function OverviewInfo({ info }) {
    const p = useSelector((state) => state.routing.markSelected);
    return (
        <>
            <Actions info={info} />

            <div className="overview-info space-y-2 px-4 md:px-sideBarMark">
                <div className="flex items-center gap-x-2">
                    <MdOutlineLocationOn size={30} className="text-blue-500" />
                    <RenderAddress address={info.address} />
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
            <div className="px-4 md:px-sideBarMark">
                <ShippingPrice retailerId={info._id} />
            </div>
        </>
    );
}

export default OverviewInfo;
