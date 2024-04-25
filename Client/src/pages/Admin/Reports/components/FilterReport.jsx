import { typeReport } from '@utils/typeConstraint';
import { Radio, Select } from 'antd';
import { useSearchParams } from 'react-router-dom';

function FilterFollowStatus() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (key, value) => {
        setSearchParams(prev => {
            prev.set(key, value);
            return prev;
        });
    };
    return (
        <div className='space-x-4'>
            <Radio.Group
                onChange={(e) => {
                    setSearchParams(prev => {
                        prev.set('status', e.target.value);
                        return prev;
                    });
                }}
                defaultValue={searchParams.get('status') || 'all'}
                buttonStyle="solid"
                className="text-nowrap"
                size="middle"
            >
                <Radio.Button value="all">Tất cả</Radio.Button>
                <Radio.Button value="pending">Chờ xử lý</Radio.Button>
                <Radio.Button value="processed">Đã xử lý</Radio.Button>
            </Radio.Group>
            <Select onChange={(val) => handleChange('reason', val)} className='w-40' defaultValue='all'>
                <Select.Option value='all'>Tất cả</Select.Option>
                {
                    typeReport.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    ))
                }
            </Select>
            <Select onChange={(value) => handleChange('type', value)} className='w-40' defaultValue='all'>
                <Select.Option value='all'>Tất cả</Select.Option>
                <Select.Option value='Product'>Sản phẩm</Select.Option>
                <Select.Option value='Rate'>Đánh giá</Select.Option>
                <Select.Option value='Retailer'>Cửa hàng</Select.Option>
                <Select.Option value='Information'>Cửa hàng cộng đồng</Select.Option>

            </Select>

        </div>
    );
}

export default FilterFollowStatus;