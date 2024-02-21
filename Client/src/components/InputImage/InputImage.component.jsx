import { Carousel } from 'antd';
import { FaTimes } from 'react-icons/fa';

function InputImage({ images, setImages, ...props }) {
    const onChangeImage = (e) => {
        const files = e.target.files;
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                urls.push(e.target.result);
                if (urls.length === files.length) {
                    setImages((prev) => prev.concat(urls));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <input
                type="file"
                id="image"
                name="image"
                className="p-2 border border-gray-300 rounded-md !hidden"
                multiple
                onChange={(e) => {
                    onChangeImage(e);
                }}
                {...props}
            />
            <div className="space-y-4">
                <label
                    htmlFor="image"
                    className="cursor-pointer h-full w-full p-2 text-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300"
                >
                    Thêm hình ảnh
                </label>
                {images.length === 0 && (
                    <label
                        htmlFor="image"
                        className="h-64 bg-gray-200 rounded-md border-dashed border-4 border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                        Chưa có hình ảnh
                    </label>
                )}
                <Carousel autoplay>
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image}
                                alt="product"
                                className="rounded-md w-full h-64 object-cover"
                            />
                            <button
                                type="button"
                                className="absolute top-2 right-2 bg-white p-1 rounded-full"
                                onClick={() => {
                                    setImages((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    );
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
}

export default InputImage;
