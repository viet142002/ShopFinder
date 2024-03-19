import { useParams } from 'react-router-dom';

function ProductPage() {
    const { idProduct } = useParams();

    return (
        <>
            <h1>Hello</h1>
        </>
    );
}

export default ProductPage;
