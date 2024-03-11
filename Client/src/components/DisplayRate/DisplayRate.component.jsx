import { useEffect } from 'react';

import CardRate from '../CardRate/CardRate.component';

import { getRatesApi } from '../../api/RateApi';

function DisplayRates({ id, rates, setRates }) {
    useEffect(() => {
        getRatesApi({ to: id }).then((data) => {
            setRates(data.rates);
        });
    }, [id, setRates]);

    return (
        <section className="mx-10">
            <div className="space-y-2 mb-2">
                {rates.length !== 0 ? (
                    rates?.map((rate) => <CardRate key={rate._id} {...rate} />)
                ) : (
                    <p className="text-lg">
                        Hãy là người đầu tiên cho ý kiến về địa điểm này!
                    </p>
                )}
            </div>
        </section>
    );
}

export default DisplayRates;
