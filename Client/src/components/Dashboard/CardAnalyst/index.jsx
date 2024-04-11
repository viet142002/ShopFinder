import { HeartFilled } from '@ant-design/icons';

function CardAnalyst({
    icon = <HeartFilled className="text-2xl text-white" />,
    title = 'Analyst'
}) {
    const value = 1000;
    return (
        <div className="shadow-card flex items-center rounded-xl bg-white p-4">
            <div className="flex-1">
                <p>{title}</p>
                <p className="text-4xl font-medium">{value.toLocaleString()}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1890ff] p-2">
                {icon}
            </div>
        </div>
    );
}

export default CardAnalyst;
