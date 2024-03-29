// import { useSelector, useDispatch } from 'react-redux';

import MyCarousel from '../../components/Carousel/Carousel.component';
import { useEffect, useState } from 'react';
import { getInfoMyRetailerApi } from '../../api/retailerApi';
import InfoRetailerProfile from '../../components/Profile/InfoRetailerProfile.component';
import PriceShip from '../../components/Profile/PriceShip.component';

function ManageRetailerProfile() {
    const [retailer, setRetailer] = useState();

    useEffect(() => {
        getInfoMyRetailerApi().then((res) => {
            setRetailer(res.data.retailer);
        });
    }, []);

    return (
        <main className="md:mx-10 md:mt-10">
            {retailer && (
                <section className="grid gap-4 md:grid-cols-5">
                    <div className=" md:col-span-3">
                        <InfoRetailerProfile retailer={retailer} />
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
        </main>
    );
}

export default ManageRetailerProfile;
