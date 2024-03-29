import { Carousel, Image } from 'antd';

function MyCarousel({ images }) {
    return (
        <Carousel autoplay>
            {images.map((image, index) => (
                <div key={index} className="!flex justify-center bg-gray-300">
                    <Image
                        className="!h-64 object-cover"
                        src={import.meta.env.VITE_APP_API_URL + image.path}
                        alt=""
                        loading="lazy"
                    />
                </div>
            ))}
        </Carousel>
    );
}

export default MyCarousel;
