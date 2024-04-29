import { useEffect, useState } from 'react';
import { Button, Space, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { getProductByIdApi } from '@api/productApi';
import { typeStatus } from '@utils/typeConstraint';
import MyCarousel from '@components/Carousel/Carousel.component';
import DisplayRates from '@components/DisplayRate/DisplayRate.component';

function ManagerProductDetail() {
    const { productId, id: retailerId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductByIdApi(productId).then((res) => setProduct(res.data));
    }, [productId]);

    return (
        <section>
            <div className="my-4 flex items-center justify-center md:my-8">
                <h1 className="text-xl font-bold">Chi tiết sản phẩm</h1>
            </div>
            <div className="mx-auto grid w-[95%] gap-4 md:w-[90%] md:grid-cols-3">
                {product && (
                    <section className="rounded-lg md:col-span-2 md:bg-white md:p-2 md:shadow-card">
                        <h2 className="mb-2 text-lg font-bold">
                            Thông tin sản phẩm
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <MyCarousel images={product?.images} />
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">
                                    {product?.name}
                                </h3>
                                <small>{product?._id}</small>
                                <div
                                    className="mt-2 rounded-md bg-white p-2 text-sm md:bg-gray-100"
                                    dangerouslySetInnerHTML={{
                                        __html: product?.description
                                    }}
                                />
                                <Space>
                                    <p>
                                        <span>Giá: </span>
                                        <span className="font-semibold">
                                            {product?.price.toLocaleString(
                                                'it-IT',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }
                                            )}
                                        </span>
                                    </p>
                                    <p>
                                        <span>Giảm giá: </span>
                                        <span className="font-semibold">
                                            {product?.discount}%
                                        </span>
                                    </p>
                                </Space>

                                <p>
                                    <span>Danh mục: </span>
                                    <span className="font-semibold">
                                        {product?.category}
                                    </span>
                                </p>
                                <p></p>
                                <span>Trạng thái: </span>
                                <span className="font-semibold">
                                    <Tag
                                        color={
                                            typeStatus.find(
                                                (status) =>
                                                    status.value ===
                                                    product?.status
                                            )?.color
                                        }
                                    >
                                        {
                                            typeStatus.find(
                                                (status) =>
                                                    status.value ===
                                                    product?.status
                                            )?.label
                                        }
                                    </Tag>
                                </span>
                                <p>
                                    <span>Số lượng: </span>
                                    <span className="font-semibold">
                                        {product?.quantity}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-center md:justify-end">
                            <Button
                                onClick={() =>
                                    navigate(
                                        `/retailer/${retailerId}/product/edit-product/${productId}`
                                    )
                                }
                                disabled={product?.status === 'blocked'}
                            >
                                Chỉnh sửa
                            </Button>
                        </div>
                    </section>
                )}
                <section className="md:col-span-1">
                    <div className="rounded-lg bg-white py-2 shadow-card">
                        <DisplayRates productId={productId} />
                    </div>
                </section>
            </div>
        </section>
    );
}

export default ManagerProductDetail;
