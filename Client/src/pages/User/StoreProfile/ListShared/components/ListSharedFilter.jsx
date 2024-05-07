import { Button, Form, Input, Radio, Select } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useMobile } from '@hooks/useMobile';
import { Show } from '@components/common';

function ListShared() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isMobile } = useMobile();

    const onFinish = (values) => {
        setSearchParams((prev) => {
            const prevParams = Object.fromEntries(prev);
            return {
                ...prevParams,
                ...values
            };
        });
    };
    return (
        <Form
            initialValues={{
                name: searchParams.get('name') || '',
                category: searchParams.get('category') || 'retailer'
            }}
            onFinish={onFinish}
        >
            <div className="flex flex-wrap md:gap-4">
                <Form.Item name="name">
                    <Input placeholder="Nhập tên" />
                </Form.Item>
                <Show>
                    <Show.Then isTrue={isMobile}>
                        <Form.Item name="category">
                            <Select className="min-w-[110px]">
                                <Select.Option value="retailer">
                                    Cửa hàng
                                </Select.Option>
                                <Select.Option value="product">
                                    Sản phẩm
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Show.Then>

                    <Show.Else>
                        <Form.Item name="category">
                            <Radio.Group
                                buttonStyle="solid"
                                className="text-nowrap"
                                size="middle"
                            >
                                <Radio.Button value="retailer">
                                    Cửa hàng
                                </Radio.Button>
                                <Radio.Button value="product">
                                    Sản phẩm
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Show.Else>
                </Show>
                <Button icon={<SearchOutlined />} htmlType="submit" />
            </div>
        </Form>
    );
}

export default ListShared;
