import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

export function PaginationPage({ total, current }) {
    const [, setSearchParams] = useSearchParams();

    const onChange = (page) => {
        setSearchParams((prev) => {
            prev.set('page', page);
            return prev;
        });
    };

    return <Pagination total={total} current={current} onChange={onChange} />;
}
