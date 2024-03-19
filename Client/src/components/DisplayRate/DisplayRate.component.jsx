import { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getRatesApi } from '../../api/RateApi';
import { setNewRates } from '../../redux/ratingSlice';

import CardRate from '../CardRate/CardRate.component';

function DisplayRates({ id: locationId, productId }) {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user.data);
    const { rates, myRate } = useSelector((state) => state.rating);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (locationId) {
            getRatesApi({ to: locationId, userId: _id })
                .then((data) => {
                    dispatch(
                        setNewRates({ rates: data.rates, myRate: data.myRate })
                    );
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        } else {
            getRatesApi({ to: productId, userId: _id })
                .then((data) => {
                    dispatch(
                        setNewRates({ rates: data.rates, myRate: data.myRate })
                    );
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    }, [locationId, dispatch, _id, productId]);

    return (
        <section>
            <div className="mb-2 space-y-2">
                {isLoading ? (
                    <div className="space-y-8">
                        <CardRate.SkeletonLoadingCardRate />
                        <CardRate.SkeletonLoadingCardRate />
                        <CardRate.SkeletonLoadingCardRate />
                    </div>
                ) : (
                    <>
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
                                      {locationId
                                          ? 'Hãy là người đầu tiên cho ý kiến về địa điểm này!'
                                          : 'Hãy là người đầu tiên cho ý kiến về sản phẩm này!'}
                                  </p>
                              )}
                    </>
                )}
            </div>
        </section>
    );
}

export default DisplayRates;
