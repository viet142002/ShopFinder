import { Drawer } from 'antd';
import { memo } from 'react';

import InfoRetailerProfile from '@components/Profile/InfoRetailerProfile.component';
import MyCarousel from '@components/Carousel/Carousel.component';
import ActionRequestRetailer from '@components/RequestRetailer/ActionsButton';
import MiniMap from '@components/Map/MiniMap';

function DetailRequestRetailer({
    open,
    onClose,
    data = {},
    setRequests,
    requests
}) {
    return (
        <>
            <Drawer
                title="Thông tin chi tiết"
                closable={false}
                placement="right"
                onClose={onClose}
                open={open}
                width={600}
            >
                {open && (
                    <>
                        <div className="mb-4 h-64 max-w-[535px]">
                            <MiniMap
                                coordinates={{
                                    lat: data.location?.loc?.coordinates[1],
                                    lng: data.location?.loc?.coordinates[0]
                                }}
                            />
                        </div>
                        <MyCarousel images={data.images} />
                        <InfoRetailerProfile
                            retailer={data}
                            isShowButtonEdit={false}
                        />
                        <div className="flex justify-center">
                            <ActionRequestRetailer
                                recordId={data._id}
                                setRequest={setRequests}
                                requests={requests}
                            />
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
}

const MemoDetailRequestRetailer = memo(DetailRequestRetailer);
export default MemoDetailRequestRetailer;
