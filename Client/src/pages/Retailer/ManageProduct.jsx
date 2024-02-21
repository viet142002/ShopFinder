import { useState, useEffect } from 'react';
import { Table, Layout, Space, Button, Input, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';

const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'productID',
        key: 'productID'
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
        dataIndex: 'stock',
        key: 'stock'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status'
    }
];

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const onSearch = (value) => {
        setSearch(value);
    };

    useEffect(() => {
        // Call API to get products
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
