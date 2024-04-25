import { typeReport } from '@utils/typeConstraint';
import { Radio, Select } from 'antd';
import { useSearchParams } from 'react-router-dom';

function FilterFollowStatus() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (value) => {
        setSearchParams(prev => {
            prev.set('reason', value);
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
            <Select onChange={handleChange} className='w-40' defaultValue='all'>
                <Select.Option value='all'>Tất cả</Select.Option>
                {
                    typeReport.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    ))
                }
            </Select>
        </div>
    );
}

export default FilterFollowStatus;
