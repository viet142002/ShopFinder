import { Radio, Select, Space } from 'antd';
import { useSearchParams } from 'react-router-dom';

function FilterRequest() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
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
                    size="large"
                >
                    <Radio.Button value="all">Tất cả</Radio.Button>
                    <Radio.Button value="pending">Chờ xác nhận</Radio.Button>
                    <Radio.Button value="approved">Đã chấp thuận</Radio.Button>
                    <Radio.Button value="rejected">Đã từ chối</Radio.Button>
                </Radio.Group>
                {/* sort */}
                <Select
                    defaultValue="desc"
                    style={{ width: 120 }}
                    size="large"
                    onChange={(value) => {
                        setSearchParams((prev) => {
                            prev.set('sort', value);
                            return prev;
                        });
                    }}
                    options={[
                        { value: 'desc', label: 'Giảm dần' },
                        { value: 'asc', label: 'Tăng dần' }
                    ]}
                />
            </Space>
        </>
    );
}

export default FilterRequest;
