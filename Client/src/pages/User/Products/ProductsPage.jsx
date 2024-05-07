import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import { getProducts } from '@api/productApi';
import { CardProduct } from '@components/Card';

function ProductsPage() {
    const { state } = useLocation();
    const { storeId } = useParams();
    const [data, setData] = useState({
        products: [],
        total: 0,
        page: 1,
        isLoading: true
    });

    useEffect(() => {
        getProducts({ distributor: storeId })
            .then((res) => {
                setData((prev) => ({
                    products: [...prev.products, ...res.data.products],
                    total: res.data.total,
                    page: prev.page + 1,
                    isLoading: false
                }));
            })
            .finally(() => {
                setData((prevData) => ({
                    ...prevData,
                    isLoading: false
                }));
            });
    }, [storeId]);

    return (
        <>
            <Layout.Header className="flex items-center justify-center bg-transparent">
                <h1 className="text-center text-xl font-bold">
                    Danh sách sản phẩm của cửa hàng
                </h1>
            </Layout.Header>

            {state?.type === 'Information' && (
                <div className="flex justify-center p-4">
                    <Link to={`/stores/${storeId}/add-product`}>
                        <Button type="primary" className="bg-blue-500">
                            Đóng góp
                        </Button>
                    </Link>
                </div>
            )}

            {data.isLoading ? (
                <h1>Loading...</h1>
            ) : data.products && data.products.length > 0 ? (
                <div className="mx-auto grid w-[calc(100%-30px)] grid-cols-2 gap-[15px] md:grid-cols-5 md:gap-8">
                    {data.products.map((product, index) => (
                        <CardProduct
                            product={product}
                            storeId={storeId}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <h2 className="text-center text-lg font-medium">
                    Không có sản phẩm nào trong cửa hàng
                </h2>
            )}
        </>
    );
}

export default ProductsPage;
