import {
    getOverviewByRetailer,
    getTopProductByRetailer,
    getRevenueByRetailer,
    getPriceImportByRetailer
} from '@api/analystApi';
import {
    BarVer,
    CardAnalyst,
    LineChart,
    ProductBarVer
} from '@components/Dashboard';
import { useEffect, useState } from 'react';
import { FaStar, FaChartSimple, FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function DashboardRetailer() {
    const [overview, setOverview] = useState({
        ordersTotal: 0,
        productTotal: 0,
        ratesTotal: 0,
        revenue: 0
    });
    const [topProduct, setTopProduct] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [priceImport, setPriceImport] = useState([]);

    useEffect(() => {
        getOverviewByRetailer().then((res) => {
            setOverview(res.data);
        });
        getTopProductByRetailer().then((res) => {
            setTopProduct(res.data);
        });
        getRevenueByRetailer().then((res) => {
            setRevenue(res.data);
        });
        getPriceImportByRetailer().then((res) => {
            setPriceImport(res.data);
        });
    }, []);

    return (
        <section className="mx-auto w-[90%] md:mt-8">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:gap-4">
                <CardAnalyst
                    title="Đơn hàng"
                    value={overview.ordersTotal}
                    icon={<FaCartShopping className="text-2xl text-white" />}
                />
                <CardAnalyst title="Sản phẩm" value={overview.productTotal} />
                <CardAnalyst
                    title="Đánh giá"
                    value={overview.ratesTotal}
                    icon={<FaStar className="text-2xl text-white" />}
                />
                <CardAnalyst
                    title="Doanh thu"
                    value={overview.revenue}
                    icon={<FaChartSimple className="text-2xl text-white" />}
                />
            </div>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 md:gap-4">
                <Link to="../analyst/revenue">
                    <BarVer
                        revenueFormatForChart={revenue?.revenueFormatForChart}
                    />
                </Link>
                <Link to="../analyst/import-export">
                    <LineChart
                        dataForChart={{
                            sell: revenue?.revenueFormatForChart,
                            import: priceImport?.price_import_format
                        }}
                    />
                </Link>
            </div>
            <div className="mt-4">
                <Link to="../analyst/top-product">
                    <ProductBarVer dataChart={topProduct.top_products} />
                </Link>
            </div>
        </section>
    );
}

export default DashboardRetailer;
