import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import { getProductsFromDistributor } from '@api/productApi';
import CardProduct from '@components/CardProduct/CardProduct.component';

function ProductsPage() {
    const { state } = useLocation();
    const { id } = useParams();
    const [data, setData] = useState({
        products: [],
        total: 0,
        page: 1,
        isLoading: true
    });

    useEffect(() => {
        getProductsFromDistributor({ distributor: id })
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
    }, [id]);

    return (
        <>
            <Layout.Header className="flex items-center justify-center bg-transparent">
                <h1 className="text-center text-xl">
                    Danh sách sản phẩm của cửa hàng
                </h1>
            </Layout.Header>

            {state?.type === 'Information' && (
                <div className="">
                    <Link to={'./add-product'}>
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
                        <CardProduct product={product} key={index} />
                    ))}
                </div>
            ) : (
                <h1>No products found</h1>
            )}
        </>
    );
}

export default ProductsPage;
