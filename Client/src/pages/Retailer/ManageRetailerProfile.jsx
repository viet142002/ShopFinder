import { useEffect, useState } from 'react';

import MyCarousel from '~/components/Carousel/Carousel.component';
import { getInfoMyRetailerApi } from '~/api/retailerApi';
import InfoStoreProfile from '~/components/Profile/InfoStoreProfile.component';
import PriceShip from '~/components/Profile/PriceShip.component';
import DisplayRates from '~/components/DisplayRate/DisplayRate.component';

function ManageRetailerProfile() {
    const [retailer, setRetailer] = useState();

    useEffect(() => {
        getInfoMyRetailerApi().then((res) => {
            setRetailer(res.data.retailer);
        });
    }, []);

    return (
        <section className="md:mx-10 md:my-10">
            {retailer && (
                <section className="grid gap-4 md:grid-cols-5">
                    <div className=" md:col-span-3">
                        <InfoStoreProfile store={retailer} />
                    </div>
                    <div className="-order-1 space-y-4 md:order-1 md:col-span-2">
                        <div className="max-w-[100vw]">
                            <MyCarousel images={retailer.images} />
                        </div>
                        <div className="hidden space-y-4 md:block">
                            {retailer.mode === 'normal' && (
                                <PriceShip retailerId={retailer._id} />
                            )}
                            <div className="rounded-lg bg-white py-4 shadow-card">
                                <DisplayRates id={retailer._id} showReply />
                            </div>
                        </div>
                    </div>
                    <div className="block space-y-4 md:hidden">
                        {retailer.mode === 'normal' && (
                            <PriceShip retailerId={retailer._id} />
                        )}
                        <div className="rounded-lg bg-white py-4 shadow-card">
                            <DisplayRates id={retailer._id} showReply />
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
}

export default ManageRetailerProfile;
