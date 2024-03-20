import { Tag } from 'antd';
import { typeLocations } from '../../../utils/typeConstraint';

function HeaderInfo({ name, rate, type, informationType }) {
    return (
        <div className="px-siderInfo pt-[5px]">
            <h2 className="text-lg font-medium">
                {name}{' '}
                {informationType === 'Information' && (
                    <Tag color="green" className="ml-2">
                        Cộng đồng
                    </Tag>
                )}
            </h2>
            <p>{rate}</p>
            <p>{typeLocations.find((item) => item.value === type)?.label}</p>
        </div>
    );
}

export default HeaderInfo;
