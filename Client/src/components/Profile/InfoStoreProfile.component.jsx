import { Avatar, Button, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import HTMLRenderer from '../HTMLRenderer/HTMLRenderer.component';
import RenderAddress from '~/components/RenderAddress';

import { formatTime, handleFetch } from '~/utils/index';
import { TYPE } from '~/constants';

import { deleteStore } from '~/api/communityApi';
/**
 * InfoStoreProfile component for admin
 * @param {Object} store object data
 * @param {Boolean} [isShowButtonEdit=true] whether show button edit
 * @param {Boolean} [isRetailer=true] is retailer
 * @return {JSX.Element}
 */
function InfoStoreProfile({
    store,
    isShowButtonEdit = true,
    isRetailer = true
}) {
    const navigate = useNavigate();
    const handleRemove = async () => {
        const data = await handleFetch(() => deleteStore(store._id));

        if (data) {
            navigate(-1);
        }
    };

    return (
        <div className="overflow-hidden rounded-lg p-2 md:bg-white">
            <h2 className="text-lg font-medium">Thông tin cửa hàng</h2>
            <div className="mt-2 space-y-2 md:ml-4">
                <Link to={`/stores/${store._id}`}>
                    <div className="flex items-center gap-2">
                        <Avatar
                            size={60}
                            src={
                                import.meta.env.VITE_APP_API_URL +
                                store?.logo?.path
                            }
                        />
                        <div>
                            <h3>{store.name}</h3>
                            <p>{formatTime(store.createdAt)}</p>
                        </div>
                    </div>
                </Link>
                <div>
                    <span>Địa chỉ: </span>
                    <RenderAddress
                        address={store?.location?.address}
                        className="inline"
                    />
                </div>
                <p>
                    <span>Email: </span>
                    <span>{store.email}</span>
                </p>
                <p>
                    <span>Điện thoại: </span>
                    <span>{store.phone}</span>
                </p>
                <p>
                    <span>Loại cửa hàng: </span>
                    <span>{TYPE.LOCATION[store.type].LABEL}</span>
                </p>
                <p>
                    <span>Chế độ: </span>
                    <span>
                        {store.mode === 'normal' ? (
                            <Tag color="success">Bán trực tuyến và tại chổ</Tag>
                        ) : (
                            <Tag color="processing">Chỉ bản tại chổ</Tag>
                        )}
                    </span>
                </p>

                <p>
                    <span>Trạng thái: </span>
                    <span>
                        {
                            <Tag color="success">
                                {store.status === 'normal'
                                    ? 'Hoạt động'
                                    : 'Chưa duyệt / Cấm'}
                            </Tag>
                        }
                    </span>
                </p>

                <div className="flex justify-end">
                    <Link
                        to={`/stores/${store._id}/products`}
                        state={{ type: store.location.informationType }}
                        className="mr-4 block text-right"
                    >
                        Xem sản phẩm
                    </Link>
                </div>

                <p>Mô tả cửa hàng:</p>
                <HTMLRenderer
                    className="rounded-md bg-white p-2 md:bg-gray-100"
                    htmlString={store.description}
                />
                {isShowButtonEdit && (
                    <div className="mt-4 flex justify-center">
                        {store.location.informationType === 'Information' && (
                            <Button
                                onClick={handleRemove}
                                type="primary"
                                danger
                            >
                                Xoá thông tin
                            </Button>
                        )}
                        <Link
                            to={
                                !isRetailer
                                    ? `/edit-store/${store._id}`
                                    : '../edit-retailer'
                            }
                            state={{
                                type:
                                    store.location.informationType ||
                                    'Information'
                            }}
                            className="px-4 py-2"
                        >
                            Chỉnh sửa thông tin
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoStoreProfile;
