import { Carousel, Image } from 'antd';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function InputImage({
    setNewImages,
    setDeleteImages = () => {},
    images,
    ...props
}) {
    const [imagePreview, setImagePreview] = useState([]);
    const onChangeImage = (e) => {
        const newImages = Array.from(e.target.files).map((file) => {
            return { path: URL.createObjectURL(file), name: file.name };
        });
        setImagePreview((prev) => [...prev, ...newImages]);
        setNewImages(e.target.files);
    };

    const handleRemoveImage = (image, index) => {
        if (image._id) {
            setDeleteImages((prev) => [...prev, image._id]);
        } else {
            setNewImages((prev) =>
                Array.from(prev).filter((_, i) => i !== index)
            );
        }
        setImagePreview((prev) =>
            Array.from(prev).filter((_, i) => i !== index)
        );
    };

    useEffect(() => {
        if (images) {
            setImagePreview((prev) =>
                [...prev].concat(
                    images.map((image) => ({
                        path: `${import.meta.env.VITE_APP_API_URL}${
                            image.path
                        }`,
                        name: image.name,
                        _id: image._id
                    }))
                )
            );
        }
    }, [images]);

    return (
        <>
            <input
                type="file"
                id="images"
                name="images"
                className="!hidden rounded-md border border-gray-300 p-2"
                multiple
                onChange={(e) => {
                    onChangeImage(e);
                }}
                {...props}
            />
            <div className="space-y-4">
                <label
                    htmlFor="images"
                    className="h-full w-full cursor-pointer rounded-md border border-gray-300 p-2 text-center transition-colors duration-300 hover:bg-gray-100"
                >
                    Thêm hình ảnh
                </label>
                {imagePreview.length === 0 && (
                    <label
                        htmlFor="images"
                        className="flex h-64 cursor-pointer items-center justify-center rounded-md border-4 border-dashed border-gray-300 bg-gray-200 transition-colors duration-300 hover:bg-gray-100"
                    >
                        Chưa có hình ảnh
                    </label>
                )}
                <Carousel autoplay>
                    {imagePreview.map((image, index) => (
                        <div
                            key={index}
                            className="relative !flex justify-center bg-gray-300"
                        >
                            <Image
                                className="!h-64 object-cover"
                                src={image.path}
                                alt=""
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 rounded-full bg-white p-1"
                                onClick={() => handleRemoveImage(image, index)}
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
