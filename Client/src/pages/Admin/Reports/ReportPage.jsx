import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { getReportsApi } from '@api/reportApi';
import { Link, useSearchParams } from 'react-router-dom';
import FilterReport from './components/FilterReport';

// TODO: Create ReportPage page for admin
function ReportPage() {
    const [reports, setReports] = useState([]);
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status') || 'all';
    const reason = searchParams.get('reason') || 'all';
    useEffect(() => {
        getReportsApi({ status, reason }).then((res) => {
            setReports(res.data.reports);
        });
    }, [status, reason]);
    return (
        <section className="mx-auto w-[90%]">
            <h1 className="p-6 text-center text-lg font-medium">Các báo cáo</h1>
            <div className='flex justify-center mb-4'>
                <FilterReport />
            </div>
            <Table dataSource={reports} rowKey="_id">
                <Table.Column
                    title="Người dùng"
                    dataIndex="from"
                    key="from"
                    render={(from) => `${from?.lastname} ${from?.firstname}`}
                />
                <Table.Column
                    title="Đến"
                    dataIndex="to"
                    key="to"
                    render={(to) => {
                        return to?.toType === 'Retailer'
                            ? to?.to?.name
                            : `${to?.to?.firstname} ${to?.to?.lastname}`;
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
                />
                <Table.Column
                    title="Hành động"
                    render={(_, record) => (
                        <Link to={`/admin/reports/${record._id}`}>
                            Xem chi tiết
                        </Link>
                    )}
                />
            </Table>
        </section>
    );
}

export default ReportPage;
