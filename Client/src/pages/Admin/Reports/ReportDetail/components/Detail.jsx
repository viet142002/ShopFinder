import { Button, Tag } from 'antd';
import { ModalDisplayRate } from './ModalDisplayRate';
import DetailStoreWidget from '~/components/Store/DetailStoreWidget';
import { TYPE } from '~/constants/type';

/**
 * Detail component only admin
 * @param {Object} props
 * @param {Object} props.report report
 * @param {Function} props.handleConfirm handle confirm
 * @param {Function} props.handleBlock handle block
 * @param {Function} props.handleWatch handle watch
 * @param {Boolean} props.isShowModal is show modal
 * @param {Function} props.setIsShowModal set is show modal
 * @param {Boolean} props.openWidgetStore open widget store
 * @param {Function} props.setOpenWidgetStore set open widget store
 * @param {Object} props.store store
 * @return {JSX.Element}
 */
export const Detail = ({
    report,
    handleConfirm,
    handleBlock,
    handleWatch,
    isShowModal,
    setIsShowModal,
    openWidgetStore,
    setOpenWidgetStore,
    store
}) => {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Thông tin báo cáo</h3>
            <div className="rounded-lg p-2 shadow-card">
                <div className="ml-3 mt-2">
                    <div className="flex">
                        <span className="block min-w-32 text-base font-medium">
                            Người báo cáo:
                        </span>
                        <span>
                            {report?.from?.fullname ||
                                `Cửa hàng ${report?.from?.name}`}
                        </span>
                    </div>
                    <div className="flex">
                        <span className="block min-w-32 text-base font-medium">
                            Đến:
                        </span>
                        <span>
                            {!report?.to
                                ? 'Đã xóa'
                                : report?.toType === 'Rate'
                                  ? 'Đánh giá'
                                  : `Cửa hàng ${report.to.name}`}
                        </span>
                    </div>
                    <div className="flex">
                        <span className="block min-w-32 text-base font-medium">
                            Lý do:
                        </span>
                        <span>{TYPE.REPORT[report?.reason].LABEL}</span>
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
                        <Button onClick={handleConfirm}>Xác nhận</Button>
                    )}
                    {
                        <>
                            <Button
                                onClick={() =>
                                    handleBlock({
                                        isBlockUser: true
                                    })
                                }
                                disabled={report?.from?.status === 'blocked'}
                            >
                                {report?.from?.status === 'blocked'
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
                                onClose={() => setIsShowModal(false)}
                            />
                            <Button onClick={() => handleWatch('rate')}>
                                Xem đánh giá
                            </Button>
                            <Button
                                onClick={() => handleBlock({})}
                                disabled={report?.to?.status === 'blocked'}
                            >
                                {report?.to?.status === 'blocked'
                                    ? 'Đã ẩn'
                                    : 'Ẩn đánh giá'}
                            </Button>
                        </>
                    )}
                    {report?.toType === 'Retailer' && (
                        <>
                            <Button onClick={() => handleWatch('retailer')}>
                                Xem cửa hàng
                            </Button>
                            <Button onClick={() => handleBlock({})}>
                                Cấm cửa hàng
                            </Button>
                            <DetailStoreWidget
                                open={openWidgetStore}
                                onClose={() => {
                                    setOpenWidgetStore(false);
                                }}
                                data={store}
                                type="admin"
                            />
                        </>
                    )}
                    {report?.toType === 'Product' && (
                        <>
                            <Button onClick={() => handleWatch('product')}>
                                Xem sản phẩm
                            </Button>

                            <Button
                                onClick={() => handleBlock({})}
                                disabled={report?.to?.status === 'blocked'}
                            >
                                {report?.to?.status === 'blocked'
                                    ? 'Đã ẩn'
                                    : 'Ẩn sản phẩm'}
                            </Button>
                        </>
                    )}
                    {report?.toType === 'Information' && (
                        <>
                            <Button onClick={() => handleWatch('information')}>
                                Xem thông tin
                            </Button>
                            <Button
                                onClick={() => handleBlock({})}
                                disabled={report?.to?.status === 'blocked'}
                            >
                                {report?.to?.status === 'blocked'
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
    );
};
