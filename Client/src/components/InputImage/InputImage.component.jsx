import { Carousel, Image } from 'antd';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function InputImage({ setNewImages, setDeleteImages, images, ...props }) {
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
                className="p-2 border border-gray-300 rounded-md !hidden"
                multiple
                onChange={(e) => {
                    onChangeImage(e);
                }}
                {...props}
            />
            <div className="space-y-4">
                <label
                    htmlFor="images"
                    className="cursor-pointer h-full w-full p-2 text-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300"
                >
                    Thêm hình ảnh
                </label>
                {imagePreview.length === 0 && (
                    <label
                        htmlFor="images"
                        className="h-64 bg-gray-200 rounded-md border-dashed border-4 border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                        Chưa có hình ảnh
                    </label>
                )}
                <Carousel autoplay>
                    {imagePreview.map((image, index) => (
                        <div
                            key={index}
                            className="relative bg-gray-300 !flex justify-center"
                        >
                            <Image
                                className="!h-64 object-cover"
                                src={image.path}
                                alt=""
                            />
                            <button
                                type="button"
                                className="absolute top-2 right-2 bg-white p-1 rounded-full"
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
