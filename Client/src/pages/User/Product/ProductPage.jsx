import { useParams } from 'react-router-dom';

import DetailProduct from '../../../components/DetailProduct/DetailProduct.component';
import CardInformationRetailer from '../../../components/CardInformationRetailer/CardInformationRetailer.component';
import DisplayRate from '../../../components/DisplayRate/DisplayRate.component';
import ModalRating from '../../../components/ModalRating/ModalRating.component';
import RateTotal from '../../../components/RateTotal/RateTotal.component';
import Rating from '../../../components/Rating/Rating.component';

function ProductPage() {
    const { idProduct } = useParams();

    return (
        <>
            <div className="mx-auto w-[95%] space-y-4 md:mt-10 md:w-[70%]">
                <DetailProduct />
                <CardInformationRetailer />

                <div className="space-y-4">
                    <div className="flex">
                        <RateTotal productId={idProduct} />
                    </div>
                    <Rating />
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium">
                            Bình luận sản phẩm
                        </h2>
                        <DisplayRate productId={idProduct} />
                    </div>
                </div>
            </div>

            <ModalRating title={'Đánh giá'} to={idProduct} toType="Product" />
        </>
    );
}

export default ProductPage;
