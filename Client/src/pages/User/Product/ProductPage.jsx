import { useParams } from 'react-router-dom';

import DetailProduct from '~/components/DetailProduct/DetailProduct.component';
import { CardInformationRetailer } from '~/components/Card';
import DisplayRate from '~/components/DisplayRate/DisplayRate.component';
import ModalRating from '~/components/Modal/ModalRating/ModalRating.component';
import RateTotal from '~/components/Rate/RateTotal/RateTotal.component';
import Rating from '~/components/Rate/Rating/Rating.component';

function ProductPage() {
    const { productId } = useParams();

    return (
        <>
            <div className="mx-auto w-[95%] space-y-4 md:mt-10 md:w-[70%]">
                <DetailProduct />
                <CardInformationRetailer />
                <div className="space-y-4">
                    <div className="flex">
                        <RateTotal productId={productId} />
                    </div>
                    <Rating />
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium">
                            Bình luận sản phẩm
                        </h2>
                        <DisplayRate productId={productId} />
                    </div>
                </div>
            </div>

            <ModalRating title={'Đánh giá'} to={productId} toType="Product" />
        </>
    );
}

export default ProductPage;
