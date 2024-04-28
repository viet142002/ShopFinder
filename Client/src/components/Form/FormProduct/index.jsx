import { Button, Form, Input, InputNumber, Select } from 'antd';
import InputImage from '@components/Input/InputImage/InputImage.component';
import EditorFormat from '@components/EditorFormat/EditorFormat';
import { typeStatus } from '@utils/typeConstraint';

export function FormProduct({
    isAddMode,
    isChange,
    imageBefore,
    setNewImages,
    setDeleteImages,
    retailer = {}
}) {
    return (
        <>
            <div className="mx-auto mb-4 grid w-[90%] gap-6 md:grid-flow-row md:grid-cols-3">
                <section className="rounded-md md:col-span-2 md:bg-white">
                    <div className="flex flex-col gap-4 md:p-4">
                        <h3 className="text-lg font-semibold">
                            Thông tin sản phẩm
                        </h3>
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Tên sản phẩm</label>
                                <Form.Item
                                    name="name"
                                    id="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tên sản phẩm'
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="price">Giá</label>
                                <Form.Item name="price" id="price">
                                    <InputNumber
                                        className="w-full"
                                        min={0}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discount">Giảm giá (%)</label>
                                <Form.Item id="discount" name="discount">
                                    <InputNumber
                                        className="w-full"
                                        min={0}
                                        max={100}
                                    />
                                </Form.Item>
                            </div>

                            {retailer &&
                                !isAddMode &&
                                retailer.mode === 'normal' && (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="status">
                                            Trạng thái
                                        </label>
                                        <Form.Item id="status" name="status">
                                            <Select>
                                                {typeStatus.map((status) => (
                                                    <Select.Option
                                                        key={status.value}
                                                        value={status.value}
                                                    >
                                                        {status.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                )}

                            <div className="flex flex-col gap-2">
                                <span>Mô tả</span>
                                <Form.Item name="description">
                                    <EditorFormat />
                                </Form.Item>
                            </div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-500 md:hidden"
                                disabled={
                                    !isAddMode && !isChange ? true : false
                                }
                            >
                                {isAddMode ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="-order-1 rounded-md md:order-1 md:col-span-1">
                    <div className="flex flex-col justify-between gap-4 md:bg-white md:p-4 ">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Hình ảnh sản phẩm
                            </h3>
                            <div className="flex flex-col gap-2">
                                <InputImage
                                    setNewImages={setNewImages}
                                    setDeleteImages={setDeleteImages}
                                    images={imageBefore}
                                />
                            </div>
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="hidden bg-blue-500 md:block"
                            disabled={!isAddMode && !isChange ? true : false}
                        >
                            {isAddMode ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
