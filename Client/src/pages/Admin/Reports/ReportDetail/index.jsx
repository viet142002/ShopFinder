import { Avatar, Button, Tag, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getReportApi, updateReportApi } from '@api/reportApi';
import { updateStatusUser } from '@api/userApi';
import { updateRateApi } from '@api/RateApi';
import { getStoreById } from '@api/storeApi';

import { returnUrl, formatTime, typeReport } from '@utils/index';
import ModalDisplayRate from './components/ModalDisplayRate';
import { blockedRetailerApi } from '@api/retailerApi';
import { updateStatus } from '@api/communityApi';
import { updateStatusByAdminApi } from '@api/productApi';
import DetailStoreWidget from '@components/Store/DetailStoreWidget';

function ReportDetail() {
    const { reportId } = useParams();
    const [report, setReport] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const [openWidgetStore, setOpenWidgetStore] = useState(false);
    const [store, setStore] = useState(null);

    const handleConfirm = () => {
        updateReportApi(reportId, { status: 'processed' }).then(() => {
            setReport({ ...report, status: 'processed' });
        });
    };

    const fetchStore = () => {
        if (!report.to) return message.info('Cửa hàng không tồn tại');
        getStoreById(report.to._id).then((res) => {
            setStore(res.data.store);
            setOpenWidgetStore(true);
        });
    };
    // block retailer and information
    const handleBlock = async ({ isBlockUser = false }) => {
        if (isBlockUser) {
            const res = await updateStatusUser({
                userId: report.from._id,
                status: 'blocked'
            });
            if (res.status === 200) {
                setReport({
                    ...report,
                    from: { ...report.from, status: 'blocked' }
                });
            }
            return;
        }
        const type = report.toType.toLowerCase();
        const id = report.to._id;
        let res = null;
        if (type === 'retailer') {
            res = await blockedRetailerApi(id);
        }
        if (type === 'information') {
            res = await updateStatus(id, { status: 'blocked' });
        }
        if (type === 'product') {
            res = await updateStatusByAdminApi(id, 'blocked');
        }
        if (type === 'rate') {
            res = await updateRateApi({
                id: id,
                values: { status: 'blocked' }
            });
        }
        if (res.status === 200) {
            setReport({ ...report, to: { ...report.to, status: 'blocked' } });
        }
    };

    const handleWatch = (type) => {
        switch (type) {
            case 'rate':
                setIsShowModal(true);
                break;
            case 'product':
                window.open(
                    `/stores/${report.to._id}/products/${report.to._id}`
                );
                break;
            case 'retailer':
                fetchStore();
                break;
            case 'information':
                fetchStore();
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
                                        <span>{report?.from?.fullname}</span>
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
                                            <Tag
                                                color={
                                                    report.status === 'pending'
                                                        ? 'orange'
                                                        : 'blue'
                                                }
                                            >
                                                {report.status === 'pending'
                                                    ? 'Chờ duyệt'
                                                    : 'Đã duyệt'}
                                            </Tag>
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
                                            <Button
                                                onClick={() =>
                                                    handleBlock({
                                                        isBlockUser: true
                                                    })
                                                }
                                                disabled={
                                                    report?.from?.status ===
                                                    'blocked'
                                                }
                                            >
                                                {report?.from?.status ===
                                                'blocked'
                                                    ? 'Đã chặn'
                                                    : 'Chặn người báo cáo'}
                                            </Button>
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
                                                onClick={() => handleBlock({})}
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
                                                onClick={() => handleBlock({})}
                                            >
                                                Cấm cửa hàng
                                            </Button>
                                            <DetailStoreWidget
                                                open={openWidgetStore}
                                                onClose={() => {
                                                    setOpenWidgetStore(false);
                                                }}
                                                data={store}
                                            />
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
                                                onClick={() => handleBlock({})}
                                                disabled={
                                                    report?.to?.status ===
                                                    'blocked'
                                                }
                                            >
                                                {report?.to?.status ===
                                                'blocked'
                                                    ? 'Đã ẩn'
                                                    : 'Ẩn sản phẩm'}
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
                                                onClick={() => handleBlock({})}
                                                disabled={
                                                    report?.to?.status ===
                                                    'blocked'
                                                }
                                            >
                                                {report?.to?.status ===
                                                'blocked'
                                                    ? 'Đã ẩn'
                                                    : 'Ẩn thông tin'}
                                            </Button>
                                            <DetailStoreWidget
                                                open={openWidgetStore}
                                                onClose={() => {
                                                    setOpenWidgetStore(false);
                                                }}
                                                data={store}
                                                type="information"
                                                showButtonEdit
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">
                                Các báo cáo liên quan
                            </h3>
                            <ul className="mt-2 space-y-2">
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
                    <Avatar src={returnUrl(report.from.avatar.path)} />
                    <p>{report.from.fullname}</p>
                </div>
                <Tag color={report.status === 'pending' ? 'orange' : 'blue'}>
                    {report.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}
                </Tag>
            </div>
            <div className="ml-4 mt-1">
                <p>
                    Lý do:{' '}
                    {typeReport.find((i) => i.value === report?.reason).label}
                </p>
                <p>{report.description}</p>
            </div>
            <p className="text-right">{formatTime(report.createdAt)}</p>
        </div>
    );
};

export default ReportDetail;
