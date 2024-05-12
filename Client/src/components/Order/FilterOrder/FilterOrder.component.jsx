import { Radio, Input, Space } from 'antd';
import { useSearchParams } from 'react-router-dom';

function FilterOrder() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Space>
            <Radio.Group
                onChange={(e) => {
                    setSearchParams((prev) => {
                        prev.set('status', e.target.value);
                        return prev;
                    });
                }}
                defaultValue={searchParams.get('status') || 'all'}
                buttonStyle="solid"
                className="text-nowrap"
            >
                <Radio.Button value="all">Tất cả</Radio.Button>
                <Radio.Button value="pending">Chờ xác nhận</Radio.Button>
                <Radio.Button value="shipping">Đang giao</Radio.Button>
                <Radio.Button value="success">Đã giao</Radio.Button>
                <Radio.Button value="cancelled">Đã huỷ</Radio.Button>
            </Radio.Group>
            <Input.Search
                allowClear
                placeholder="Tên khách hàng"
                onSearch={(value) => {
                    setSearchParams((prev) => {
                        prev.set('fullname', value);
                        return prev;
                    });
                }}
            />
        </Space>
    );
}

export default FilterOrder;
