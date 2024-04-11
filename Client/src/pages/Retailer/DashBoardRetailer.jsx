import BarVer from '@components/Dashboard/BarVer';
import CardAnalyst from '@components/Dashboard/CardAnalyst';
import LineChart from '@components/Dashboard/LineChart';
import ProductBarVer from '@components/Dashboard/ProductBarVer';

function DashboardRetailer() {
    return (
        <section className="mx-auto w-[90%] md:mt-8">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:gap-4">
                <CardAnalyst title="Doanh thu" />
                <CardAnalyst title="Sản phẩm" />
                <CardAnalyst title="Đơn hàng" />
                <CardAnalyst title="Đơn hàng" />
            </div>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 md:gap-4">
                <BarVer />
                <LineChart />
            </div>
            <div className="mt-4">
                <ProductBarVer />
            </div>
        </section>
    );
}

export default DashboardRetailer;
