import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getReportApi, updateReportApi } from '~/api/reportApi';
import { updateStatusUser } from '~/api/userApi';
import { updateRateApi } from '~/api/RateApi';
import { getStoreById } from '~/api/storeApi';
import { blockedRetailerApi } from '~/api/retailerApi';
import { updateStatus } from '~/api/communityApi';

import { Detail, CardReportRelated } from './components';
import { updateStatusByAdminApi } from '~/api/productApi';
import { Show } from '~/components/common';

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
        if (!report.to && report.toType === 'Retailer')
            return toast.info('Cửa hàng không tồn tại');
        if (!report.to && report.toType === 'Information')
            return toast.info('Thông tin không tồn tại');
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
        const id = report.to?._id;

        if (!id) {
            if (type === 'retailer')
                return toast.info('Cửa hàng không tồn tại');
            if (type === 'information')
                return toast.info('Thông tin không tồn tại');
            if (type === 'product') return toast.info('Sản phẩm không tồn tại');
            if (type === 'rate') return toast.info('Đánh giá không tồn tại');
        }
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
                <Show>
                    <Show.Then
                        isTrue={report && Object.keys(report).length > 0}
                    >
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
                            <Detail
                                report={report}
                                handleConfirm={handleConfirm}
                                handleBlock={handleBlock}
                                handleWatch={handleWatch}
                                isShowModal={isShowModal}
                                setIsShowModal={setIsShowModal}
                                openWidgetStore={openWidgetStore}
                                setOpenWidgetStore={setOpenWidgetStore}
                                store={store}
                            />
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
                    </Show.Then>
                    <Show.Else>
                        <div>
                            <p>Đang tải...</p>
                        </div>
                    </Show.Else>
                </Show>
            </section>
        </>
    );
}

export default ReportDetail;
