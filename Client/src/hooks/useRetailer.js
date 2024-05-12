import { useSelector } from 'react-redux';

export const useRetailer = () => {
    const { data } = useSelector((state) => state.retailer);

    return { data: data.retailer, token: data.token };
};
