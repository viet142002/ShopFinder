import { Radio } from 'antd';
import { useSearchParams } from 'react-router-dom';

function FilterOrder() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <Radio.Group
                onChange={(e) => {
                    setSearchParams({ status: e.target.value });
                }}
                defaultValue={searchParams.get('status') || 'all'}
                buttonStyle="solid"
                className="text-nowrap"
                size="large"
            >
                <Radio.Button value="all">Tất cả</Radio.Button>
                <Radio.Button value="pending">Chờ xác nhận</Radio.Button>
                <Radio.Button value="shipping">Đang giao</Radio.Button>
                <Radio.Button value="success">Đã giao</Radio.Button>
                <Radio.Button value="cancelled">Đã huỷ</Radio.Button>
            </Radio.Group>
        </>
    );
}

export default FilterOrder;
