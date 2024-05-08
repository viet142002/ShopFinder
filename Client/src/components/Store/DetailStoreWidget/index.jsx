import { Drawer } from 'antd';
import { memo } from 'react';

import InfoRetailerProfile from '@components/Profile/InfoStoreProfile.component';
import MyCarousel from '@components/Carousel/Carousel.component';
import ActionStore from '@components/Store/ActionStore';
import MiniMap from '@components/Map/MiniMap';

function DetailStoreWidget({
    open,
    onClose,
    data = {},
    setStores,
    stores,
    type = 'retailer'
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
                            store={data}
                            isShowButtonEdit={false}
                        />
                        <div className="flex justify-center">
                            <ActionStore
                                storeId={data._id}
                                setStores={setStores}
                                stores={stores}
                                type={type}
                            />
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
}

const MemoDetailStoreWidget = memo(DetailStoreWidget);
export default MemoDetailStoreWidget;
