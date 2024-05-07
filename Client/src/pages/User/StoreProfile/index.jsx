import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStoreById } from '@api/storeApi';

import InfoStoreProfile from '@components/Profile/InfoStoreProfile.component';
import MyCarousel from '@components/Carousel/Carousel.component';
import DisplayRates from '@components/DisplayRate/DisplayRate.component';
import { useAuth } from '@hooks/useAuth';
import ModalRating from '@components/Modal/ModalRating/ModalRating.component';
import RateTotal from '@components/Rate/RateTotal/RateTotal.component';
import Rating from '@components/Rate/Rating/Rating.component';

function StoreProfile() {
    const [store, setStore] = useState(null);
    const { storeId } = useParams();
    const { data: user } = useAuth();

    useEffect(() => {
        getStoreById(storeId).then((res) => {
            setStore(res.data.store);
        });
    }, [storeId]);

    return (
        <div className="md:mx-10 md:my-10">
            {!store ? (
                <div>Loading...</div>
            ) : (
                <>
                    <section className="grid gap-4 md:grid-cols-5">
                        <div className=" md:col-span-3">
                            <InfoStoreProfile
                                store={store}
                                isShowButtonEdit={user._id === store.user}
                                isUser={true}
                            />
                        </div>
                        <div className="-order-1 space-y-4 overflow-hidden md:order-1 md:col-span-2">
                            <MyCarousel images={store.images} />
                            <div className="mt-6 hidden rounded-lg bg-white pb-2 pt-4 md:block">
                                <div className="space-y-2">
                                    <div className="flex justify-center md:px-10 md:py-5">
                                        <RateTotal locationId={store._id} />
                                    </div>
                                    <Rating />
                                </div>
                                <DisplayRates id={storeId} />
                            </div>
                        </div>
                    </section>
                    <div className="mt-4 block md:hidden">
                        <div className="space-y-2">
                            <div className="flex justify-center md:p-sideBarMark">
                                <RateTotal locationId={store._id} />
                            </div>
                            <Rating />
                        </div>
                        <DisplayRates id={storeId} />
                    </div>

                    <ModalRating
                        title={store.name}
                        to={store._id}
                        toType={store.informationType}
                    />
                </>
            )}
        </div>
    );
}

export default StoreProfile;
