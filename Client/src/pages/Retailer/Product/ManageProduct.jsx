import { useState, useEffect } from 'react';
import { Table, Layout, Tag, Button, Input, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';

import { getProductsApi } from '../../../api/productApi';
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
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const onSearch = (value) => {
        fetchProducts(value);
    };

    const fetchProducts = async (value) => {
        try {
            const data = await getProductsApi(value);
            setProducts(data);
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="p-5 space-y-2">
            <Layout.Header className="bg-white flex justify-between items-center space-x-2">
                <Tooltip title="Thêm sản phẩm">
                    <Button
                        type="primary"
                        className="bg-blue-500 flex items-center"
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
                <Table columns={columns} dataSource={products} rowKey="_id" />
            </Layout.Content>
            <Layout.Footer className="flex justify-end">
                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    className="bg-blue-500 flex items-center"
                >
                    Xuất file
                </Button>
            </Layout.Footer>
        </section>
    );
}

export default ManageProduct;
