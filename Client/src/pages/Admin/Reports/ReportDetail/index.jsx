import { Avatar, Button, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getReportApi, updateReportApi } from '@api/reportApi';
import { updateStatusUser } from '@api/userApi';
import { updateRateApi } from '@api/RateApi';

import { returnUrl } from '@utils/returnUrl';
import { formatTime } from '@utils/formatTime';
import { typeReport } from '@utils/typeConstraint';
import ModalDisplayRate from './components/ModalDisplayRate';

function ReportDetail() {
    const navigate = useNavigate();
    const { reportId } = useParams();
    const [report, setReport] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);

    const blockUser = () => {
        updateStatusUser({ userId: report.from._id, status: 'blocked' }).then(
            () => {
                setReport({
                    ...report,
                    from: { ...report.from, status: 'blocked' }
                });
            }
        );
    };
    const handleBlockedRate = () => {
        updateRateApi({
            id: report?.to?._id,
            values: { status: 'blocked' }
        }).then(() => {
            setReport({ ...report, to: { ...report.to, status: 'blocked' } });
        });
    };
    const handleConfirm = () => {
        updateReportApi(reportId, { status: 'processed' }).then(() => {
            setReport({ ...report, status: 'processed' });
        });
    };

    const handleBan = (type) => {
        switch (type) {
            case 'user':
                blockUser();
                break;
            case 'rate':
                handleBlockedRate();
                break;
            case 'retailer':
                console.log('ban retailer');
                break;
            case 'product':
                console.log('ban product');
                break;
            case 'information':
                console.log('ban information');
                break;
            default:
                break;
        }
    };

    const handleWatch = (type) => {
        switch (type) {
            case 'rate':
                setIsShowModal(true);
                break;
            case 'product':
                navigate(`/stores/${report.to._id}/products/${report.to._id}`);
                break;
            case 'retailer':
                navigate(`/stores/${report.to._id}`);
                break;
            case 'information':
                navigate(`/stores/${report.to._id}`);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getReportApi(reportId).then((res) => {
            setReport(res.data.report);
        });
    }, [reportId]);
    return (
        <>
            <section className="mx-auto w-[95%] md:w-[80%]">
                <div className="p-6">
                    <h1 className="text-center text-xl font-bold">
                        Chi tiết báo cáo
                    </h1>
                </div>
                {!report ? (
                    <div>
                        <p>Đang tải...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">
                                Thông tin báo cáo
                            </h3>
                            <div className="rounded-lg p-2 shadow-card">
                                <div className="ml-3 mt-2">
                                    <div className="flex">
                                        <span className="block min-w-32 text-base font-medium">
                                            Người báo cáo:
                                        </span>
                                        <span>
                                            {report?.from?.firstname}
                                            {report?.from?.lastname}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="block min-w-32 text-base font-medium">
                                            Đến:
                                        </span>
                                        <span>
                                            {report.to
                                                ? report.to.name
                                                : 'Bình luận đã xoá'}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="block min-w-32 text-base font-medium">
                                            Lý do:
                                        </span>
                                        <span>
                                            {
                                                typeReport.find(
                                                    (i) =>
                                                        i.value ===
                                                        report?.reason
                                                ).label
                                            }
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="block min-w-32 text-base font-medium">
                                            Mô tả:
                                        </span>
                                        <span>{report?.description}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="block min-w-32 text-base font-medium">
                                            Loại:
                                        </span>
                                        <span>{report?.toType}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="block min-w-32 text-base font-medium">
                                            Trạng thái:
                                        </span>
                                        <span>
                                            {report?.status === 'pending'
                                                ? 'Chờ duyệt'
                                                : 'Đã duyệt'}
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-2 mt-4 flex justify-between">
                                    {report?.status === 'processed' ? (
                                        <Button disabled>Đã xử lý</Button>
                                    ) : (
                                        <Button onClick={handleConfirm}>
                                            Xác nhận
                                        </Button>
                                    )}
                                    {
                                        <>
                                            {report?.from?.status ===
                                            'blocked' ? (
                                                <Button disabled>
                                                    Người dùng đã bị cấm
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        handleBan('user')
                                                    }
                                                >
                                                    Cấm người dùng
                                                </Button>
                                            )}
                                        </>
                                    }
                                    {report?.toType === 'Rate' && (
                                        <>
                                            <ModalDisplayRate
                                                rateId={report?.to?._id}
                                                isOpen={isShowModal}
                                                onClose={() =>
                                                    setIsShowModal(false)
                                                }
                                            />
                                            <Button
                                                onClick={() =>
                                                    handleWatch('rate')
                                                }
                                            >
                                                Xem đánh giá
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleBan('user')
                                                }
                                                disabled={
                                                    report?.to?.status ===
                                                    'blocked'
                                                }
                                            >
                                                {report?.to?.status ===
                                                'blocked'
                                                    ? 'Đã ẩn'
                                                    : 'Ẩn đánh giá'}
                                            </Button>
                                        </>
                                    )}
                                    {report?.toType === 'Retailer' && (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    handleWatch('retailer')
                                                }
                                            >
                                                Xem cửa hàng
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleBan('retailer')
                                                }
                                            >
                                                Cấm cửa hàng
                                            </Button>
                                        </>
                                    )}
                                    {report?.toType === 'Product' && (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    handleWatch('product')
                                                }
                                            >
                                                Xem sản phẩm
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleBan('product')
                                                }
                                            >
                                                Cấm sản phẩm
                                            </Button>
                                        </>
                                    )}
                                    {report?.toType === 'Information' && (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    handleWatch('information')
                                                }
                                            >
                                                Xem thông tin
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleBan('information')
                                                }
                                            >
                                                Cấm thông tin
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">
                                Các báo cáo liên quan
                            </h3>
                            <ul className="ml-3 mt-2 space-y-2">
                                {report?.relatedReports?.length === 0 && (
                                    <p>Không có báo cáo liên quan</p>
                                )}
                                {report?.relatedReports?.map(
                                    (relatedReport) => (
                                        <li key={relatedReport._id}>
                                            <CardReportRelated
                                                report={relatedReport}
                                            />
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

const CardReportRelated = ({ report }) => {
    return (
        <div className="rounded-lg p-2 shadow-card">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar src={returnUrl({ user: report.from })} />
                    <p>
                        {report.from.firstname} {report.from.lastname}
                    </p>
                </div>
                <Tag
                    color={
                        report.status === 'pending'
                            ? 'orange'
                            : report.status === 'approved'
                              ? 'green'
                              : 'red'
                    }
                >
                    {report.status}
                </Tag>
            </div>
            <div className="ml-4 mt-1">
                <p>{report.reason}</p>
            </div>
            <p className="text-right">{formatTime(report.createdAt)}</p>
        </div>
    );
};

export default ReportDetail;
