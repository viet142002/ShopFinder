import { useEffect } from 'react';
import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CardRate from '../CardRate/CardRate.component';

import { getRatesApi } from '../../api/RateApi';
import { setNewRates } from '../../redux/ratingSlice';

function DisplayRates({ id }) {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user.data);
    const { rates, myRate } = useSelector((state) => state.rating);

    useEffect(() => {
        getRatesApi({ to: id, userId: _id }).then((data) => {
            dispatch(setNewRates({ rates: data.rates, myRate: data.myRate }));
        });
    }, [id, dispatch, _id]);

    return (
        <section>
            <div className="mb-2 space-y-2">
                {myRate && (
                    <>
                        <CardRate {...myRate} />
                        <Divider />
                    </>
                )}
                {rates?.length !== 0
                    ? rates?.map((rate, index) => (
                          <div key={rate._id}>
                              {index !== 0 && <Divider />}
                              <CardRate {...rate} />
                          </div>
                      ))
                    : !myRate && (
                          <p className="mx-2 text-lg md:mx-10">
                              Hãy là người đầu tiên cho ý kiến về địa điểm này!
                          </p>
                      )}
            </div>
        </section>
    );
}

export default DisplayRates;
