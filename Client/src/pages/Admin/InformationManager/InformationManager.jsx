import { Button, Table, Tag } from 'antd';

import { getAllStore } from '@api/communityApi';
import { useEffect, useState } from 'react';
import RenderAddress from '@components/RenderAddress';
import { FilterInformation } from './components/FilterInformation';
import DetailStoreWidget from '@components/Store/DetailStoreWidget';
import { useSearchParams } from 'react-router-dom';

function InformationManager() {
    const [searchParams] = useSearchParams();
    const [stores, setStores] = useState([]);
    const [open, setOpen] = useState({
        target: null,
        isOpen: false
    });

    useEffect(() => {
        getAllStore({
            ...Object.fromEntries(searchParams)
        }).then((response) => {
            setStores(response.data.information);
        });
    }, [searchParams]);
    return (
        <>
            <section className="mx-auto w-[95%] md:w-[80%]">
                <div className="my-6">
                    <h1 className="text-center text-xl font-bold">
                        Quản lý thông tin cộng đồng
                    </h1>
                </div>
                <FilterInformation />
                <Table dataSource={stores} rowKey="_id">
                    <Table.Column
                        title="Tên"
                        dataIndex="name"
                        key="name"
                        render={(_, record) => (
                            <Button
                                type="text"
                                onClick={() =>
                                    setOpen({
                                        target: record._id,
                                        isOpen: true
                                    })
                                }
                            >
                                {record.name}
                            </Button>
                        )}
                    />
                    <Table.Column title="Loại" dataIndex="type" key="type" />
                    <Table.Column title="SDT" dataIndex="phone" key="phone" />
                    <Table.Column title="Email" dataIndex="email" key="email" />
                    <Table.Column
                        title="Địa chỉ"
                        dataIndex="location"
                        key="address"
                        render={(value) => {
                            return <RenderAddress address={value.address} />;
                        }}
                    />
                    <Table.Column
                        title="Trạng thái"
                        dataIndex="status"
                        key="status"
                        render={(value) => {
                            return value === 'normal' ? (
                                <Tag color="blue">Hoạt động</Tag>
                            ) : (
                                <Tag color="red">Đã chặn</Tag>
                            );
                        }}
                    />
                </Table>
            </section>

            <DetailStoreWidget
                open={open.isOpen}
                onClose={() =>
                    setOpen({
                        target: null,
                        isOpen: false
                    })
                }
                data={stores.find((store) => store._id === open.target)}
                setStores={setStores}
                stores={stores}
            />
        </>
    );
}

export default InformationManager;
