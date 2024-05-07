import { Avatar, Tag } from 'antd';
import { Link } from 'react-router-dom';

import HTMLRenderer from '../HTMLRenderer/HTMLRenderer.component';
import RenderAddress from '@components/RenderAddress';

import { typeLocations, formatTime } from '@utils/index';

function InfoStoreProfile({ store, isShowButtonEdit = true, isUser = false }) {
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
                    <span>
                        {
                            typeLocations.find(
                                (item) => item.value === store.type
                            ).label
                        }
                    </span>
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
                        {store.status === 'normal' ||
                        store.status === 'approved' ? (
                            <Tag color="success">Hoạt động</Tag>
                        ) : (
                            <Tag color="error">Chưa duyệt / Cấm</Tag>
                        )}
                    </span>
                </p>

                <Link
                    to={`/stores/${store._id}/products`}
                    className="mr-4 block text-right"
                >
                    Xem sản phẩm
                </Link>

                <p>Mô tả cửa hàng:</p>
                <HTMLRenderer
                    className="rounded-md bg-white p-2 md:bg-gray-100"
                    htmlString={store.description}
                />
                {isShowButtonEdit && (
                    <div className="mt-4 flex justify-center">
                        <Link
                            to={
                                isUser
                                    ? `/edit-store/${store._id}`
                                    : '../edit-retailer'
                            }
                            className=" px-4 py-2"
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
