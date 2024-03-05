import { useEffect, useState } from 'react';
import { Button, Layout, Space, Carousel, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import CommentProduct from '../../../components/Comments/CommentProduct.component';

import { getProductByIdApi } from '../../../api/productApi';
import { typeStatus } from '../../../utils/typeConstraint';
import ButtonBack from '../../../components/ActionsButton/ButtonBack.component';

function ManagerProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductByIdApi(id);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    return (
        <section className="px-8 py-4">
            <ButtonBack />
            <Layout.Header className="bg-transparent flex justify-between items-center mb-2">
                <h1 className="text-xl font-semibold">Chi tiết sản phẩm</h1>
            </Layout.Header>
            <Layout.Content className="grid grid-cols-3 gap-4">
                <section className="bg-white col-span-2 p-2">
                    <h2 className="text-xl font-bold mb-2">
                        Thông tin sản phẩm
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Carousel autoplay>
                            {product?.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={'http://localhost:3001' + image.path}
                                    alt="product"
                                    loading="lazy"
                                    className="object-cover rounded-md"
                                />
                            ))}
                        </Carousel>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">
                                {product?.name}
                            </h3>
                            <small>{product?._id}</small>
                            <div
                                className="text-sm mt-2 bg-gray-100 p-2 rounded-md"
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
                                navigate(`/retailer/product/edit-product/${id}`)
                            }
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </section>
                <section className="bg-white col-span-1 p-2">
                    <CommentProduct />
                </section>
            </Layout.Content>
        </section>
    );
}

export default ManagerProductDetail;
