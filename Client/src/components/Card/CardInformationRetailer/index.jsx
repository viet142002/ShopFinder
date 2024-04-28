import { useEffect, useState } from 'react';
import { Avatar, Rate } from 'antd';

import { Link, useParams } from 'react-router-dom';

import { getDistributorByProductIdApi } from '../../../api/productApi';

export function CardInformationRetailer() {
    const { productId, storeId } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        getDistributorByProductIdApi(productId).then((res) => {
            setData(res.data);
        });
    }, [productId]);

    return (
        <section className="flex flex-wrap gap-4 rounded-md bg-gray-200 p-2">
            <div className="flex-1">
                <Link to={`/stores/${storeId}`}>
                    <div className="flex h-full min-w-[400px] items-center gap-2 md:min-w-fit">
                        <Avatar
                            size={60}
                            src={
                                data.distributor?.logo
                                    ? `${import.meta.env.VITE_APP_API_URL}${
                                          data.distributor.logo.path
                                      }`
                                    : `${
                                          import.meta.env
                                              .VITE_APP_LOGO_RETAILER_DEFAULT
                                      }`
                            }
                        />
                        <div>
                            <h2 className="text-lg font-medium">
                                {data.distributor?.name || 'Name Retailer'}
                            </h2>
                            <Rate value={data.averageRate} disabled />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="grid flex-1 grid-cols-2">
                <div className="col-span-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <p className="text-[1rem] text-gray-500">Sản phẩm:</p>
                        <p className="text-right text-red-500">
                            {data.totalProduct}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[1rem] text-gray-500">Đánh giá:</p>
                        <p className="text-right text-red-500">
                            {data.totalRate}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
