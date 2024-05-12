import { Drawer } from 'antd';
import { memo } from 'react';

import InfoStoreProfile from '~/components/Profile/InfoStoreProfile.component';
import MyCarousel from '~/components/Carousel/Carousel.component';
import ActionStore from '~/components/Store/ActionStore';
import MiniMap from '~/components/Map/MiniMap';

/**
 * DetailStoreWidget component admin
 * @param {Object} props
 * @param {Boolean} props.open open
 * @param {Function} props.onClose close
 * @param {Object} [props.data={}] data
 * @param {Function} props.setStores set stores
 * @param {Array} props.stores stores
 * @param {String} [props.type='retailer'] type
 * @param {Boolean} [props.showButtonEdit=false] show button edit
 * @return {JSX.Element}
 */
function DetailStoreWidget({
    open,
    onClose,
    data = {},
    setStores,
    stores,
    type = 'retailer',
    showButtonEdit = false,
    role = 'retailer'
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
                        <InfoStoreProfile
                            role={role}
                            store={data}
                            isShowButtonEdit={showButtonEdit}
                        />
                        {stores && (
                            <div className="flex justify-center">
                                <ActionStore
                                    storeId={data._id}
                                    setStores={setStores}
                                    stores={stores}
                                    type={type}
                                />
                            </div>
                        )}
                    </>
                )}
            </Drawer>
        </>
    );
}

const MemoDetailStoreWidget = memo(DetailStoreWidget);
export default MemoDetailStoreWidget;
