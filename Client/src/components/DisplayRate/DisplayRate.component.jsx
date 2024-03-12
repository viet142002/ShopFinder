import { useEffect } from 'react';
import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CardRate from '../CardRate/CardRate.component';

import { getRatesApi } from '../../api/RateApi';
import { setNewRates } from '../../redux/ratingSlice';

function DisplayRates({ id }) {
    const dispatch = useDispatch();
    const rates = useSelector((state) => state.rating.rates);

    useEffect(() => {
        getRatesApi({ to: id }).then((data) => {
            dispatch(setNewRates(data.rates));
        });
    }, [id, dispatch]);

    return (
        <section>
            <div className="space-y-2 mb-2">
                {rates.length !== 0 ? (
                    rates?.map((rate, index) => (
                        <div key={rate._id}>
                            {index !== 0 && <Divider />}
                            <CardRate {...rate} />
                        </div>
                    ))
                ) : (
                    <p className="text-lg md:mx-10 mx-2">
                        Hãy là người đầu tiên cho ý kiến về địa điểm này!
                    </p>
                )}
            </div>
        </section>
    );
}

export default DisplayRates;
