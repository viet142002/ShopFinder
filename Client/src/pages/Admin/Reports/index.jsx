import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';

import { getReportsApi } from '~/api/reportApi';
import { Link, useSearchParams } from 'react-router-dom';
import FilterReport from './components/FilterReport';

function ReportPage() {
    const [reports, setReports] = useState([]);
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status') || 'all';
    const reason = searchParams.get('reason') || 'all';
    const type = searchParams.get('type') || 'all';
    useEffect(() => {
        getReportsApi({ status, reason, type }).then((res) => {
            setReports(res.data.reports);
        });
    }, [status, reason, type]);
    return (
        <section className="mx-auto w-[90%] md:w-[80%]">
            <h1 className="p-6 text-center text-lg font-medium">Các báo cáo</h1>
            <div className="mb-4 flex justify-center">
                <FilterReport />
            </div>
            <Table dataSource={reports} rowKey="_id">
                <Table.Column
                    title="Người dùng"
                    dataIndex="from"
                    key="from"
                    render={(from) => `${from?.fullname || from?.name}`}
                />
                <Table.Column
                    title="Đến"
                    dataIndex="to"
                    key="to"
                    render={(to, record) => {
                        let title = '';
                        if (record?.toType === 'Rate') {
                            title = record?.to?.name || 'Đánh giá';
                        }
                        if (record?.toType === 'Retailer') {
                            title = record?.to?.name || 'Cửa hàng';
                        }
                        if (record?.toType === 'Product') {
                            title = record?.to?.name || 'Sản phẩm';
                        }
                        if (record?.toType === 'Information') {
                            title = record?.to?.name || 'Cửa hàng cộng đồng';
                        }

                        return title;
                    }}
                />
                <Table.Column title="Lý do" dataIndex="reason" key="reason" />
                <Table.Column
                    title="Miêu tả"
                    dataIndex="description"
                    key="description"
                />
                <Table.Column
                    title="Trạng thái"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                        <Tag color={status === 'pending' ? 'orange' : 'blue'}>
                            {
                                {
                                    pending: 'Chờ duyệt',
                                    processed: 'Đã duyệt'
                                }[status]
                            }
                        </Tag>
                    )}
                />
                <Table.Column
                    title="Hành động"
                    render={(_, record) => (
                        <Link to={`/admin/reports/${record._id}`}>
                            Chi tiết
                        </Link>
                    )}
                />
            </Table>
        </section>
    );
}

export default ReportPage;
