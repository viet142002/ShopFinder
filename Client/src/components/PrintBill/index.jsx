import React from 'react';

import { formatPrice } from '@utils/formatPrice';
import { formatDate } from '@utils/formatDate';

const PrintBill = React.forwardRef(function PrintBill({ bill, products }, ref) {
    const { more, ward, district, province } =
        bill?.distributor?.location?.address || {};
    const {
        more: moreBill,
        ward: wardBill,
        district: districtBill,
        province: provinceBill
    } = bill?.shippingAddress || {};

    return (
        <div ref={ref}>
            <div
                style={{
                    width: '80mm'
                }}
            >
                <div className="bg-red-300">
                    <div className="mx-2">
                        <h2 className="text-center text-lg font-bold">
                            {bill?.distributor?.name}
                        </h2>
                        <p className="text-center">
                            {more && `${more}, `}{' '}
                            {`${ward}, ${district}, ${province}`}
                        </p>
                    </div>

                    <div className="m-2">
                        <h1 className="mb-2 text-center text-lg font-bold">
                            Hoá đơn bán hàng
                        </h1>
                        <p>Mã HD: {bill._id}</p>
                        <p>Ngày lặp: {formatDate(new Date())}</p>
                        <p>Khách hàng: {bill?.fullName}</p>
                        <p>SDT: {bill?.phone}</p>
                        <p>
                            Địa chỉ: {moreBill && `${moreBill}, `}
                            {`${wardBill}, ${districtBill}, ${provinceBill}`}
                        </p>
                    </div>
                    <div>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="w-[5%]"></th>
                                    <th className="w-[45%]">Tên sản phẩm</th>
                                    <th className="w-[12.5%]">Giá</th>
                                    <th className="w-[5%]">SL</th>
                                    <th className="w-[12.5%]">T.Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item?.product?.name}</td>
                                        <td>{formatPrice(item?.price)}</td>
                                        <td>{item?.quantity}</td>
                                        <td>
                                            {formatPrice(
                                                item?.price * item?.quantity
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="m-2">
                        <p className="flex justify-between">
                            <span>Giá sản phẩm:</span>
                            <span>{formatPrice(bill?.itemsPrice)}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Phí vận chuyển:</span>
                            <span>{formatPrice(bill?.shippingPrice)}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Tổng tiền:</span>
                            <span>{formatPrice(bill?.totalPrice)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PrintBill;
