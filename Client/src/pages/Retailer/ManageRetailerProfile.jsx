import { useEffect, useState } from 'react';

import MyCarousel from '@components/Carousel/Carousel.component';
import { getInfoMyRetailerApi } from '@api/retailerApi';
import InfoStoreProfile from '@components/Profile/InfoStoreProfile.component';
import PriceShip from '@components/Profile/PriceShip.component';

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
                    <div className="-order-1 space-y-2 overflow-hidden md:order-1 md:col-span-2">
                        <MyCarousel images={retailer.images} />
                        {retailer.mode === 'normal' && (
                            <PriceShip retailerId={retailer._id} />
                        )}
                    </div>
                </section>
            )}
            <section></section>
        </section>
    );
}

export default ManageRetailerProfile;
