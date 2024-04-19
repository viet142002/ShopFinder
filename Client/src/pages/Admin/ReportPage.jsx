import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { getReportsApi } from '@api/reportApi';
import { Link } from 'react-router-dom';

/*
reports: [
      {
        _id: '662166b50d04cac44825f0aa',
        from: {
          _id: '65faa94bbd61e0c9c1d78b4e',
          email: 'hoangduy@gmail.com',
          firstname: 'Hoàng',
          lastname: 'Duy',
          avatar: '65fd48caf687ef962765aa49'
        },
        to: {
          _id: '65fd32f503f7bb6ed62554c7',
          from: '65f9eba91b8900b6edc3774b',
          to: '65faa62cbd61e0c9c1d78ace',
          toType: 'Retailer',
          rate: 3,
          comment: 'abcd',
          images: [],
          reply: [],
          likes: [ '65faa94bbd61e0c9c1d78b4e', '65fd4c0e6751e025e9743117' ],
          dislikes: [],
          createdAt: '2024-03-22T07:27:49.720Z',
          updatedAt: '2024-04-07T14:57:57.333Z',
          __v: 224
        },
        toType: 'Rate',
        reason: 'wrong-information',
        description: 'Bình luận sai sự thật',
        status: 'pending',
        createdAt: '2024-04-18T18:30:13.817Z',
        updatedAt: '2024-04-18T18:30:13.817Z',
        __v: 0
      }
*/

// TODO: Create ReportPage page for admin
function ReportPage() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getReportsApi().then((data) => {
            setReports(data.reports);
        });
    }, []);
    return (
        <section className="mx-auto w-[90%]">
            <h1 className="p-6 text-center text-lg font-medium">Các báo cáo</h1>
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
                        return to.toType === 'Retailer'
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
