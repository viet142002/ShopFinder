import { useState, useEffect } from 'react';
import { Table, Layout, Tag, Button, Input, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useNavigate, Link, useParams } from 'react-router-dom';
import CardProduct from '../../../components/CardProduct/CardProduct.component';

import { MdAdd } from 'react-icons/md';

import { getProductsFromDistributor } from '../../../api/productApi';
import { typeStatus } from '../../../utils/typeConstraint';

const columns = [
    {
        title: 'Ảnh sản phẩm',
        dataIndex: 'images',
        key: 'images',
        render: (images) => {
            return (
                <img
                    className="rounded-md object-cover"
                    src={import.meta.env.VITE_APP_API_URL + images[0].path}
                    alt="product"
                    width="100"
                />
            );
        }
    },
    {
        title: 'Mã sản phẩm',
        dataIndex: '_id',
        key: '_id',
        render: (id) => {
            return <Link to={`./detail/${id}`}>{id}</Link>;
        }
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            return (
                <Tag
                    color={
                        typeStatus.find((item) => item.value === status).color
                    }
                >
                    {typeStatus.find((item) => item.value === status).label}
                </Tag>
            );
        }
    }
];

function ManageProduct() {
    const [data, setData] = useState({
        products: [],
        total: 0,
        page: 1
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const onSearch = (value) => {
        fetchProducts({ search: value, distributor: id, status: 'all' });
    };

    console.log('🚀 ~ ManageProduct ~ data:', data);
    const fetchProducts = async (values) => {
        await getProductsFromDistributor(values).then((res) =>
            setData(res.data)
        );
    };

    useEffect(() => {
        fetchProducts({ distributor: id, status: 'all' });
    }, [id]);

    return (
        <section className="space-y-2 p-5">
            <Layout.Header className="flex items-center justify-between space-x-2 bg-white p-2">
                <Tooltip title="Thêm sản phẩm">
                    <Button
                        type="primary"
                        className="flex items-center bg-blue-500"
                        icon={<MdAdd size={18} />}
                        onClick={() => {
                            navigate('./add-product');
                        }}
                    >
                        Thêm
                    </Button>
                </Tooltip>
                <Input.Search
                    placeholder="Tên sản phẩm..."
                    allowClear
                    onSearch={onSearch}
                    style={{
                        width: 200
                    }}
                />
            </Layout.Header>
            <Layout.Content>
                <Table
                    className="hidden md:block"
                    columns={columns}
                    dataSource={data.products}
                    rowKey="_id"
                />

                <div className="grid grid-cols-2 gap-2 md:hidden">
                    {data.products.map((product, index) => (
                        <CardProduct product={product} key={index} />
                    ))}
                </div>
            </Layout.Content>
            <Layout.Footer className="flex justify-end">
                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    className="flex items-center bg-blue-500"
                >
                    Xuất file
                </Button>
            </Layout.Footer>
        </section>
    );
}

export default ManageProduct;
