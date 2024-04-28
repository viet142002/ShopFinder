import { Table } from 'antd';

import { getAllStore } from '@api/communityApi';
import { useEffect, useState } from 'react';
import RenderAddress from '@components/RenderAddress';
import { FilterInformation } from './components/FilterInformation';

function InformationManager() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        getAllStore().then((response) => {
            setStores(response.data.information);
        });
    }, []);
    return (
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
                    render={(value) => value || 'No name'}
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
            </Table>
        </section>
    );
}

export default InformationManager;
