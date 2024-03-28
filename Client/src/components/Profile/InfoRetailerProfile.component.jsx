import { Avatar, Tag } from 'antd';

import HTMLRenderer from '../HTMLRenderer/HTMLRenderer.component';

import { typeLocations } from '../../utils/typeConstraint';

function InfoRetailerProfile({ retailer }) {
    return (
        <div className="bg-white p-2">
            <h2 className="text-lg font-medium">Thông tin cửa hàng</h2>
            <div className="ml-4 mt-2 space-y-2">
                <div className="flex items-center gap-2">
                    <Avatar
                        size={60}
                        src={
                            import.meta.env.VITE_APP_API_URL +
                            retailer.logo.path
                        }
                    />
                    <h3>{retailer.name}</h3>
                </div>
                <p>
                    <span>Địa chỉ: </span>
                    <span>
                        {retailer.location.address.more +
                            (retailer.location.address.more && ', ') +
                            retailer.location.address.ward +
                            ', ' +
                            retailer.location.address.district +
                            ', ' +
                            retailer.location.address.province}
                    </span>
                </p>
                <p>
                    <span>Email: </span>
                    <span>{retailer.owner.email}</span>
                </p>
                <p>
                    <span>Điện thoại: </span>
                    <span>{retailer.owner.phone}</span>
                </p>
                <p>
                    <span>Loại cửa hàng: </span>
                    <span>
                        {
                            typeLocations.find(
                                (item) => item.value === retailer.type
                            ).label
                        }
                    </span>
                </p>
                <p>
                    <span>Chế độ: </span>
                    <span>
                        {retailer.mode === 'normal' ? (
                            <Tag color="success">Bán trực tuyến và tại chổ</Tag>
                        ) : (
                            <Tag color="processing">Chỉ bản tại chổ</Tag>
                        )}
                    </span>
                </p>
                <p>Mô tả cửa hàng:</p>
                <HTMLRenderer
                    className="rounded-md bg-gray-100 p-2"
                    htmlString={retailer.description}
                />
            </div>
        </div>
    );
}

export default InfoRetailerProfile;
