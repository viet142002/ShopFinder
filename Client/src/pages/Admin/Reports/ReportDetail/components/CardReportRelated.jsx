import { Avatar, Tag } from 'antd';
import { returnUrl, formatTime } from '~/utils';

import { TYPE } from '~/constants';

export const CardReportRelated = ({ report }) => {
    return (
        <div className="rounded-lg p-2 shadow-card">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar
                        src={returnUrl(
                            report.from?.avatar?.path || report.from?.logo?.path
                        )}
                    />
                    <p>{report.from?.fullname || report.from?.name}</p>
                </div>
                <Tag color={report.status === 'pending' ? 'orange' : 'blue'}>
                    {report.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}
                </Tag>
            </div>
            <div className="ml-4 mt-1">
                <p>Lý do: {TYPE.REPORT[report?.reason].LABEL}</p>
                <p>{report.description}</p>
            </div>
            <p className="text-right">{formatTime(report.createdAt)}</p>
        </div>
    );
};
