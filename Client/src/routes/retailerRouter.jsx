import { Routes, Route } from 'react-router-dom';

import ProtectRoute from './ProtectRoute';
import ManageLayout from '../layouts/ManageLayout';

import DashboardRetailer from '@pages/Retailer/DashboardRetailer';
import ManageProduct from '@pages/Retailer/Product/ManageProduct';
import WarehouseManager from '@pages/Retailer/WarehouseManager/WarehouseManager';
import ManageOrder from '@pages/Retailer/ManageOrder';
import ManageOrderDetail from '@pages/Retailer/ManageOrderDetail';
import StatisticRetailer from '@pages/Retailer/StatisticRetailer';
import ManageRetailerProfile from '@pages/Retailer/ManageRetailerProfile';
import AddAndEditProduct from '@pages/Retailer/Product/AddAndEditProduct';
import ManagerProductDetail from '@pages/Retailer/Product/ManagerProductDetail';
import ImportWarehouse from '@pages/Retailer/WarehouseManager/ImportWarehouse';

const retailerRouter = () => {
    return (
        <>
            <Route
                path="/retailer/:id"
                element={
                    <ProtectRoute access="retailer">
                        <ManageLayout role="retailer" />
                    </ProtectRoute>
                }
            >
                <Route index path="dashboard" element={<DashboardRetailer />} />
                <Route path="product" element={<ManageProduct />} />
                <Route
                    path="import-product"
                    element={<WarehouseManager isImport />}
                />
                <Route path="order" element={<ManageOrder />} />
                <Route path="order/:id" element={<ManageOrderDetail />} />
                <Route path="statistic" element={<StatisticRetailer />} />
                <Route path="profile" element={<ManageRetailerProfile />} />
                <Route
                    path="product/add-product"
                    element={<AddAndEditProduct />}
                />
                <Route
                    path="product/edit-product/:idProduct"
                    element={<AddAndEditProduct />}
                />
                <Route
                    path="product/detail/:idProduct"
                    element={<ManagerProductDetail />}
                />
                <Route
                    path="import-product/add-warehouse"
                    element={<ImportWarehouse />}
                />
                <Route
                    path="import-product/:idImport"
                    element={<ImportWarehouse />}
                />
            </Route>
        </>
    );
};

export default retailerRouter;
