import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getReportApi } from "@api/reportApi";
import { Avatar, Button, Tag } from "antd";
import { returnUrl } from "@utils/returnUrl";
import { formatTime } from "@utils/formatTime";

function ReportDetail() {
    const { reportId } = useParams();
    const [report, setReport] = useState(null);

    const handleWatch = (type) => {
        switch (type) {
            case 'rate':
                console.log('watch rate');
                break;
            case 'retailer':
                console.log('watch retailer');
                break;
            case 'product':
                console.log('watch product');
                break;
            case 'information':
                console.log('watch information');
                break;
            default:
                break;
        }
    }

    const handleBan = (type) => {
        switch (type) {
            case 'user':
                console.log('ban user');
                break;
            case 'rate':
                console.log('ban rate');
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
    }

    const handleConfirm = () => {
        console.log('confirm');
    }

    useEffect(() => {
        getReportApi(reportId).then((res) => {
            setReport(res.data.report);
        });
    }, [reportId]);
    return <section className="w-[95%] md:w-[80%] mx-auto">
        <div className="p-6"><h1 className="text-center text-xl font-bold">Chi tiết báo cáo</h1></div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
            <div>
                <h3 className="text-base font-semibold">Thông tin báo cáo</h3>
                <div className="shadow-card p-2 rounded-lg">
                    <div className="ml-3 mt-2">
                        <p>Người báo cáo: {report?.from?.firstname} {report?.from?.lastname}</p>
                        <p>Đến: {report?.to?.name}</p>
                        <p>Lý do: {report?.reason}</p>
                        <p>Loại: {report?.toType}</p>
                        <p>Trạng thái: {report?.status}</p>
                    </div>
                    <div className="mt-4 mb-2 flex justify-between">
                        {
                            report?.status === 'processed' && <Button disabled>Đã xử lý</Button>
                        }
                        {
                            report?.status === 'pending' && <Button onClick={handleConfirm}>Xác nhận</Button>
                        }
                        {
                            <>
                                <Button onClick={() => handleBan('user')}>Cấm người dùng</Button>
                            </>
                        }
                        {
                            report?.toType === 'Rate' && <>
                                <Button onClick={() => handleWatch('rate')}>Xem đánh giá</Button>
                                <Button onClick={() => handleBan('rate')}>Cấm bình luận</Button>
                            </>
                        }
                        {
                            report?.toType === 'Retailer' && <>
                                <Button onClick={() => handleWatch('retailer')}>Xem cửa hàng</Button>
                                <Button onClick={() => handleBan('retailer')}>Cấm cửa hàng</Button>
                            </>
                        }
                        {
                            report?.toType === 'Product' && <>
                                <Button onClick={() => handleWatch('product')}>Xem sản phẩm</Button>
                                <Button onClick={() => handleBan('product')}>Cấm sản phẩm</Button>
                            </>
                        }
                        {
                            report?.toType === 'Information' && <>
                                <Button onClick={() => handleWatch('information')}>Xem thông tin</Button>
                                <Button onClick={() => handleBan('information')}>Cấm thông tin</Button>
                            </>
                        }



                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-base font-semibold">Các báo cáo liên quan</h3>
                <ul className="ml-3 mt-2 space-y-2">
                    {
                        report?.relatedReports?.length === 0 && <p>Không có báo cáo liên quan</p>
                    }
                    {report?.relatedReports?.map((relatedReport) => (
                        <li key={relatedReport._id}>
                            <CardReportRelated report={relatedReport} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    </section>
}

const CardReportRelated = ({ report }) => {
    return <div className="shadow-card p-2 rounded-lg">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Avatar src={returnUrl({ user: report.from })} />
                <p>{report.from.firstname} {report.from.lastname}</p>
            </div>
            <Tag color={
                report.status === 'pending' ? 'orange' :
                    report.status === 'approved' ? 'green' :
                        'red'
            } >
                {report.status}
            </Tag>
        </div>
        <div className="ml-4 mt-1">
            <p>{report.reason}</p>

        </div>
        <p className="text-right">{formatTime(report.createdAt)}</p>
    </div>
}

export default ReportDetail;