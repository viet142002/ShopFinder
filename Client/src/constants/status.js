export const STATUS = {
    ORDER: {
        pending: {
            VALUE: 'pending',
            LABEL: 'Chờ xác nhận',
            COLOR: 'gray'
        },
        shipping: {
            VALUE: 'shipping',
            LABEL: 'Đang giao hàng',
            COLOR: 'blue'
        },
        success: {
            VALUE: 'success',
            LABEL: 'Đã giao hàng',
            COLOR: 'yellow'
        },
        cancelled: {
            VALUE: 'cancelled',
            LABEL: 'Đã hủy',
            COLOR: 'red'
        }
    },
    PRODUCT: {
        draft: {
            VALUE: 'draft',
            LABEL: 'Nháp',
            COLOR: 'gray'
        },
        available: {
            VALUE: 'available',
            LABEL: 'Có sẵn',
            COLOR: 'blue'
        },
        'sold-out': {
            VALUE: 'sold-out',
            LABEL: 'Hết hàng',
            COLOR: 'red'
        },
        stop: {
            VALUE: 'stop',
            LABEL: 'Tạm ngưng',
            COLOR: 'red'
        },
        'only-display': {
            VALUE: 'only-display',
            LABEL: 'Chỉ hiển thị',
            COLOR: 'green'
        },
        blocked: {
            VALUE: 'blocked',
            LABEL: 'Bị chặn',
            COLOR: 'red'
        }
    },
    RATE: {
        blocked: {
            VALUE: 'blocked',
            LABEL: 'Bị chặn'
        },
        normal: {
            VALUE: 'normal',
            LABEL: 'Bình thường'
        }
    },
    USER: {
        blocked: {
            VALUE: 'blocked',
            LABEL: 'Bị chặn'
        },
        normal: {
            VALUE: 'normal',
            LABEL: 'Bình thường'
        }
    },
    RETAILER: {
        pending: {
            VALUE: 'pending',
            LABEL: 'Chờ xử lý'
        },
        approved: {
            VALUE: 'approved',
            LABEL: 'Đã duyệt'
        },
        rejected: {
            VALUE: 'rejected',
            LABEL: 'Bị từ chối'
        },
        blocked: {
            VALUE: 'blocked',
            LABEL: 'Bị chặn'
        }
    },
    REPORT: {
        pending: {
            VALUE: 'pending',
            LABEL: 'Chờ xử lý'
        },
        processed: {
            VALUE: 'processed',
            LABEL: 'Đã xử lý'
        }
    },
    INFORMATION: {
        blocked: {
            VALUE: 'blocked',
            LABEL: 'Bị chặn'
        },
        normal: {
            VALUE: 'normal',
            LABEL: 'Bình thường'
        }
    },
    LOCATION: {
        blocked: {
            VALUE: 'blocked',
            LABEL: 'Bị chặn'
        },
        normal: {
            VALUE: 'normal',
            LABEL: 'Bình thường'
        }
    }
};
