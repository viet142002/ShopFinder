import { useState, useEffect } from 'react';
import {
    Table,
    Layout,
    Tag,
    Button,
    Input,
    Tooltip,
    Select,
    Space
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { CardProduct } from '~/components/Card';

import { getProducts } from '~/api/productApi';
import { STATUS } from '~/constants';
import { useRetailer } from '~/hooks';
import { formatPrice } from '~/utils';

const columns = [
    {
        width: 150,
        title: 'Ảnh sản phẩm',
        dataIndex: 'images',
        key: 'images',
        render: (images) => {
            return (
                <img
                    className="h-[110px] w-[150px] rounded-md object-cover"
                    src={images[0].path}
                    alt="product"
                />
            );
        }
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => {
            return (
                <Link to={`/retailer/product/detail/${record._id}`}>
                    {record.name}
                </Link>
            );
        }
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        render: (price) => formatPrice(price)
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            return (
                <Tag color={STATUS.PRODUCT[status].COLOR}>
                    {STATUS.PRODUCT[status].LABEL}
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
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        data: { _id: id }
    } = useRetailer();
    const navigate = useNavigate();

    const handleChange = (item, value) => {
        setSearchParams((prev) => {
            prev.set(item, value);
            return prev;
        });
    };

    useEffect(() => {
        getProducts({
            distributor: id,
            status: searchParams.get('status') || 'all',
            name: searchParams.get('search') || '',
            page: searchParams.get('page') || 1,
            order: {
                quantity: searchParams.get('order') || -1
            }
        }).then((res) => setData(res.data));
    }, [id, searchParams]);

    return (
        <section className="mx-4 max-w-[1200px] space-y-2 lg:mx-auto">
            <div className="flex items-center justify-between space-x-2 bg-transparent py-8">
                <Tooltip title="Thêm sản phẩm">
                    <div className="hidden items-center md:flex">
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
                    </div>
                    <div className="flex items-center md:hidden">
                        <Button
                            type="primary"
                            className="bg-blue-500"
                            icon={<MdAdd size={18} />}
                            onClick={() => {
                                navigate('./add-product');
                            }}
                        />
                    </div>
                </Tooltip>
                <Space.Compact>
                    <Select
                        className="w-24 md:w-auto"
                        onChange={(value) => handleChange('status', value)}
                        name="status"
                        defaultValue={searchParams.get('status') || 'all'}
                    >
                        <Select.Option value="all">Tất cả</Select.Option>
                        <Select.Option value="draft">Nháp</Select.Option>
                        <Select.Option value="available">Có sẵn</Select.Option>
                        <Select.Option value="sold-out">Hết hàng</Select.Option>
                        <Select.Option value="stop">
                            Ngừng kinh doanh
                        </Select.Option>
                        <Select.Option value="only-display">
                            Chỉ hiển thị
                        </Select.Option>
                        <Select.Option value="blocked">Bị chặn</Select.Option>
                    </Select>
                    <Input.Search
                        placeholder="Tên sản phẩm..."
                        allowClear
                        onSearch={(value) => handleChange('search', value)}
                        style={{
                            width: 200
                        }}
                    />
                </Space.Compact>
            </div>
            <div>
                <Table
                    className="hidden md:block"
                    columns={columns}
                    dataSource={data.products}
                    rowKey="_id"
                    pagination={{
                        pageSize: 10,
                        total: data.total,
                        current: data.page
                    }}
                    onChange={(pagination, _, order) => {
                        handleChange('page', pagination.current);
                        handleChange(
                            'order',
                            order.order === 'ascend' ? 1 : -1
                        );
                    }}
                />

                <div className="grid grid-cols-2 gap-2 md:hidden">
                    {data.products.map((product, index) => (
                        <CardProduct product={product} key={index} />
                    ))}
                </div>
            </div>
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
