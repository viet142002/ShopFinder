import { useEffect, useState } from 'react';
import { Button, Layout, Space, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import CommentProduct from '../../../components/Comments/CommentProduct.component';

import { getProductByIdApi } from '../../../api/productApi';
import { typeStatus } from '../../../utils/typeConstraint';
import ButtonBack from '../../../components/ActionsButton/ButtonBack.component';
import MyCarousel from '../../../components/Carousel/Carousel.component';

function ManagerProductDetail() {
    const { idProduct } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductByIdApi(idProduct).then((res) => setProduct(res.data));
    }, [idProduct]);

    return (
        <section className="px-8 py-4">
            <ButtonBack />
            <Layout.Header className="mb-2 flex items-center justify-between bg-transparent">
                <h1 className="text-xl font-semibold">Chi tiết sản phẩm</h1>
            </Layout.Header>
            <Layout.Content className="grid grid-cols-3 gap-4">
                <section className="col-span-2 bg-white p-2">
                    <h2 className="mb-2 text-xl font-bold">
                        Thông tin sản phẩm
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <MyCarousel images={product?.images} />
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                {product?.name}
                            </h3>
                            <small>{product?._id}</small>
                            <div
                                className="mt-2 rounded-md bg-gray-100 p-2 text-sm"
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
                                                status.value === product?.status
                                        )?.color
                                    }
                                >
                                    {
                                        typeStatus.find(
                                            (status) =>
                                                status.value === product?.status
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
                    <div className="">
                        <Button
                            onClick={() =>
                                navigate(`./../../edit-product/${idProduct}`)
                            }
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </section>
                <section className="col-span-1 bg-white p-2">
                    <CommentProduct />
                </section>
            </Layout.Content>
        </section>
    );
}

export default ManagerProductDetail;
