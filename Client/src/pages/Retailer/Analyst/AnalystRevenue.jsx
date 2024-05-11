import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Select, Space, DatePicker } from 'antd';

import { formatPrice } from '~/utils/formatPrice';
import {
    getPriceImportByRetailer,
    getRevenueByRetailer,
    getTopProductByRetailer
} from '~/api/analystApi';
import { BarVer, LineChart, ProductBarVer } from '~/components/Dashboard';

function AnalystRevenue() {
    const [data, setData] = useState();
    const [searchParams] = useSearchParams();
    const [profit, setProfit] = useState(0);
    const { title } = useParams();

    let componentRender = null;

    if (title === 'revenue') {
        componentRender = (
            <BarVer
                revenueFormatForChart={data?.revenue?.revenueFormatForChart}
                time={searchParams.get('time') || 'year'}
            />
        );
    }
    if (title === 'import-export') {
        componentRender = (
            <LineChart
                dataForChart={{
                    sell: data?.revenue?.revenueFormatForChart,
                    import: data?.priceImport?.price_import_format
                }}
                time={searchParams.get('time') || 'year'}
            />
        );
    }
    if (title === 'top-product') {
        componentRender = (
            <ProductBarVer
                dataChart={data?.topProduct?.top_products}
                time={searchParams.get('time') || 'year'}
            />
        );
    }
    useEffect(() => {
        if (title !== 'top-product' && data?.revenue && data?.priceImport) {
            setProfit(
                data?.revenue?.revenueFormatForChart.reduce(
                    (acc, cur, index) => {
                        return (
                            acc +
                            cur -
                            data?.priceImport?.price_import_format[index]
                        );
                    },
                    0
                )
            );
        }
    }, [data, title]);

    useEffect(() => {
        const getRevenue = async ({ time, date }) => {
            const res = await getRevenueByRetailer({
                time,
                date
            });
            setData((prev) => ({
                ...prev,
                revenue: res.data
            }));
        };

        const getImportExport = async ({ time, date }) => {
            const res = await getPriceImportByRetailer({
                time,
                date
            });
            setData((prev) => ({
                ...prev,
                priceImport: res.data
            }));
        };

        const getTopProduct = async ({ time, date }) => {
            const res = await getTopProductByRetailer({
                time,
                date
            });
            setData({
                topProduct: res.data
            });
        };

        if (title === 'top-product') {
            getTopProduct({
                time: searchParams.get('time') || 'year',
                date: searchParams.get('date')
            });
        } else {
            getRevenue({
                time: searchParams.get('time') || 'year',
                date: searchParams.get('date')
            });
            getImportExport({
                time: searchParams.get('time') || 'year',
                date: searchParams.get('date')
            });
        }
    }, [searchParams, title]);
    return (
        <div className="m-4">
            <h2 className="text-center text-2xl font-bold">
                {title === 'revenue'
                    ? 'Doanh thu'
                    : title === 'import-export'
                      ? 'Nhập xuất'
                      : 'Sản phẩm bán chạy'}
            </h2>
            <div className="my-4 flex flex-col items-center justify-center gap-4">
                <FilterRevenue />
                {title === 'import-export' && (
                    <h3 className="text-lg font-semibold">
                        Lợi nhuận{' '}
                        <span
                            style={{
                                color:
                                    profit > 0
                                        ? 'green'
                                        : profit < 0
                                          ? 'red'
                                          : 'black'
                            }}
                        >
                            {formatPrice(+profit)}
                        </span>
                    </h3>
                )}
                {title === 'revenue' && (
                    <h3 className="text-lg font-semibold text-green-500">
                        Tổng doanh thu:{' '}
                        {formatPrice(
                            +data?.revenue?.revenueFormatForChart.reduce(
                                (acc, cur) => acc + cur,
                                0
                            )
                        )}
                    </h3>
                )}
            </div>
            <div className="mx-auto max-w-[1180px]">{componentRender}</div>
        </div>
    );
}

export default AnalystRevenue;

const FilterRevenue = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const time = searchParams.get('time') || 'year';
    const handleChange = (value) => {
        setSearchParams((prev) => {
            prev.set('time', value);
            prev.set('date', '');
            return prev;
        });
    };

    const onChange = (date, dateString) => {
        setSearchParams((prev) => {
            if (time === 'week') {
                prev.set('date', date);
            } else {
                prev.set('date', dateString);
            }
            return prev;
        });
    };
    return (
        <Space.Compact>
            <DatePicker onChange={onChange} picker={time || 'year'} />
            <Select
                onChange={handleChange}
                value={time || 'year'}
                className="w-28"
            >
                <Select.Option value="week">Tuần</Select.Option>
                <Select.Option value="month">Tháng</Select.Option>
                <Select.Option value="year">Năm</Select.Option>
            </Select>
        </Space.Compact>
    );
};
