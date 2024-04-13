import { Avatar, Tag } from 'antd';

import HTMLRenderer from '../HTMLRenderer/HTMLRenderer.component';
import RenderAddress from '@components/RenderAddress';

import { typeLocations } from '@utils/typeConstraint';
import { Link } from 'react-router-dom';

function InfoRetailerProfile({ retailer, isShowButtonEdit = true }) {
    return (
        <div className="p-2 md:bg-white">
            <h2 className="text-lg font-medium">Thông tin cửa hàng</h2>
            <div className="mt-2 space-y-2 md:ml-4">
                <div className="flex items-center gap-2">
                    <Avatar
                        size={60}
                        src={
                            import.meta.env.VITE_APP_API_URL +
                            retailer.logo.path
                        }
                    />
                    <div>
                        <h3>{retailer.name}</h3>
                        <p>{retailer.createdAt}</p>
                    </div>
                </div>
                <div>
                    <span>Địa chỉ: </span>
                    <RenderAddress
                        address={retailer?.location?.address}
                        className="inline"
                    />
                </div>
                <p>
                    <span>Email: </span>
                    <span>{retailer.email}</span>
                </p>
                <p>
                    <span>Điện thoại: </span>
                    <span>{retailer.phone}</span>
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
                    className="rounded-md bg-white p-2 md:bg-gray-100"
                    htmlString={retailer.description}
                />
                {isShowButtonEdit && (
                    <div className="mt-4 flex justify-center">
                        <Link to={'../edit-retailer'} className=" px-4 py-2">
                            Chỉnh sửa thông tin
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoRetailerProfile;
