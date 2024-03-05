import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Form, Input, Button, Image, Row, Col, Table } from 'antd';

import ButtonBack from '../../../components/ActionsButton/ButtonBack.component';
import EditorFormat from '../../../components/EditorFormat/EditorFormat';

import { getProductsApi } from '../../../api/productApi';
import { createWarehouseApi, getWarehouseApi } from '../../../api/warehouseApi';

function ImportWarehouse() {
    const [resultSearch, setResultSearch] = useState([]);
    const [inOutProducts, setInOutProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const { id } = useParams();
    const isAddMode = !id;

    const handleAdd = (record) => {
        setInOutProducts((prev) => {
            return prev.some((item) => item._id === record._id)
                ? prev
                : [
                      ...prev,
                      { ...record, amount: 1, price_import: record.price }
                  ];
        });
    };

    const handleDelete = (record) => {
        setInOutProducts((prev) => {
            return prev.filter((item) => item._id !== record._id);
        });
    };

    const handleAmount = (record, values) => {
        setInOutProducts((prev) => {
            return prev.map((item) => {
                if (item._id === record._id) {
                    return { ...item, [values.field]: values.value };
                }
                return item;
            });
        });
    };

    const handleSave = (values) => {
        const products = inOutProducts.map((item) => {
            return {
                _id: item._id,
                amount: parseInt(item.amount) || 1,
                price_import: parseInt(item.price_import) || item.price
            };
        });

        const data = {
            note: values.note,
            type: 'import',
            products
        };

        createWarehouseApi(data).then((res) => {
            console.log(res);
        });
    };

    const colsImport = [
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <Image
                    className="rounded-md object-cover"
                    src={'http://localhost:3001' + images[0].path}
                    alt="product"
                    width={100}
                />
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <span>
                    {price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </span>
            )
        },
        {
            title: 'Action',
            render: (record) => (
                <Button
                    type="primary"
                    className="bg-blue-500"
                    onClick={() => handleAdd(record)}
                >
                    Thêm
                </Button>
            )
        }
    ];

    const colsImport2 = [
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <Image
                    className="rounded-md object-cover"
                    src={'http://localhost:3001' + images[0].path}
                    alt="product"
                    width={100}
                />
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Giá nhập',
            dataIndex: 'price_import',
            key: 'price_import',
            render: (_, record) => {
                console.log(record);
                return (
                    <Input
                        type="number"
                        defaultValue={record.price}
                        onChange={(e) =>
                            handleAmount(record, {
                                field: 'price_import',
                                value: e.target.value
                            })
                        }
                        size="middle"
                        className="w-28"
                    />
                );
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            values: 0,
            render: (_, record) => (
                <Input
                    type="number"
                    defaultValue={1}
                    onChange={(e) =>
                        handleAmount(record, {
                            field: 'amount',
                            value: e.target.value
                        })
                    }
                    size="middle"
                    className="w-20"
                />
            )
        },
        {
            title: 'Action',
            render: (record) => (
                <>
                    <Button
                        type="primary"
                        className="bg-blue-500"
                        onClick={() => handleDelete(record)}
                    >
                        Xoá
                    </Button>
                </>
            )
        }
    ];

    const colsImport3 = [
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <Image
                    className="rounded-md object-cover"
                    src={'http://localhost:3001' + images[0].path}
                    alt="product"
                    width={100}
                />
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <span>
                    {price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </span>
            )
        },
        {
            title: 'Giá nhập',
            dataIndex: 'price_import',
            key: 'price_import',
            render: (price_import) => (
                <span>
                    {price_import?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </span>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount'
        }
    ];

    useEffect(() => {
        if (isAddMode) {
            getProductsApi(search).then((res) => {
                setResultSearch(res);
            });
        } else {
            getWarehouseApi(id).then((res) => {
                setCreatedAt(res.warehouseReceipt.createdAt);
                setInOutProducts(() =>
                    res.warehouseReceipt.products.map((item) => {
                        return {
                            ...item.product,
                            amount: item.quantity,
                            price_import: item.price_import
                        };
                    })
                );
            });
        }
    }, [isAddMode, id, search]);

    return (
        <section className="py-2 px-4 space-y-2">
            <ButtonBack />
            <Layout.Header className="bg-white flex items-center justify-center">
                <div className="p-3">
                    <h1 className="text-2xl font-semibold">
                        {isAddMode ? 'Tạo phiếu nhập' : 'Thông tin phiếu nhập'}
                    </h1>
                </div>
            </Layout.Header>

            <Layout.Content>
                <Row gutter={{ md: isAddMode ? 20 : 0 }}>
                    <Col md={isAddMode ? 12 : 0} span={isAddMode ? 24 : 0}>
                        <Input.Search
                            placeholder="Tìm kiếm sản phẩm"
                            allowClear
                            onSearch={(value) => setSearch(value)}
                        />

                        <Table
                            dataSource={resultSearch}
                            rowKey={'_id'}
                            columns={colsImport}
                        />
                    </Col>
                    <Col
                        md={isAddMode ? 12 : 24}
                        span={24}
                        className="bg-white"
                    >
                        <h2 className="text-lg font-semibold text-center p-2">
                            Sản phẩm được nhập
                        </h2>
                        <Form layout="vertical" onFinish={handleSave}>
                            <Table
                                dataSource={inOutProducts}
                                rowKey={'_id'}
                                columns={isAddMode ? colsImport2 : colsImport3}
                                pagination={false}
                            />
                            <div className="p-2">
                                <p>
                                    Tổng tiền:{' '}
                                    <span className="font-medium">
                                        {inOutProducts
                                            .reduce(
                                                (total, item) =>
                                                    total +
                                                    item.price_import *
                                                        item.amount,
                                                0
                                            )
                                            .toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                    </span>
                                </p>
                            </div>
                            <Form.Item
                                label="Ghi chú"
                                name="note"
                                className="p-2"
                            >
                                {isAddMode ? (
                                    <EditorFormat />
                                ) : (
                                    <div
                                        className="border p-2 bg-gray-50"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                inOutProducts.note ||
                                                'Không có ghi chú'
                                        }}
                                    />
                                )}
                            </Form.Item>
                            {isAddMode ? (
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="bg-blue-500"
                                    >
                                        Xác nhận
                                    </Button>
                                </Form.Item>
                            ) : (
                                <div className="p-2">
                                    <p>
                                        Ngày lặp phiếu:{' '}
                                        <span className="font-medium">
                                            {new Date(
                                                createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </Form>
                    </Col>
                </Row>
            </Layout.Content>
        </section>
    );
}

export default ImportWarehouse;
