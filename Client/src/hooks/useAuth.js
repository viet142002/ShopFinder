import { useSelector } from 'react-redux';

export const useAuth = () => {
    const user = useSelector((state) => state.user);

    return { data: user.data, isAuth: user.isAuth };
};
