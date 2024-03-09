import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import DefaultLayout from './layouts/DefaultLayout';
import Profile from './pages/Profile/ProfilePage';
import Login from './pages/Auth/Login/LoginPage';
import Register from './pages/Auth/Register/RegisterPage';
import RegisterRetailerPending from './pages/RegisterRetailer/RegisterRetailerPending';
import ProtectRoute from './routes/ProtectRoute';
import ManageLayout from './layouts/ManageLayout';
import RequestRetailerPage from './pages/Admin/RequestRetailerPage';
import DashboardPage from './pages/Admin/DashboardPage';
import ReportPage from './pages/Admin/ReportPage';
import NotificationPage from './pages/Admin/NotificationPage';

import DashboardRetailer from './pages/Retailer/DashboardRetailer';
import WarehouseManager from './pages/Retailer/WarehouseManager/WarehouseManager';
import ManageOrder from './pages/Retailer/ManageOrder';
import ManageOrderDetail from './pages/Retailer/ManageOrderDetail';
import StatisticRetailer from './pages/Retailer/StatisticRetailer';
import ManageRetailerProfile from './pages/Retailer/ManageRetailerProfile';
import ManageProduct from './pages/Retailer/Product/ManageProduct';
import AddAndEditProduct from './pages/Retailer/Product/AddAndEditProduct';
import ManagerProductDetail from './pages/Retailer/Product/ManagerProductDetail';
import ImportWarehouse from './pages/Retailer/WarehouseManager/ImportWarehouse';

import HomePage from './pages/Home/HomePage';
import CreateStore from './pages/CreateStore/CreateStore';

import { routesConstant } from './routes/routesConstant';
import { setFirstLocation } from './redux/routingSlice';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setFirstLocation());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={routesConstant.login.path} element={<Login />} />
                <Route
                    path={routesConstant.register.path}
                    element={<Register />}
                />

                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="/share-store"
                        element={
                            <ProtectRoute>
                                <CreateStore />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path={routesConstant.registerRetailer.path}
                        element={
                            <ProtectRoute>
                                <CreateStore isRegisterRetailer />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path={routesConstant.profile.path}
                        element={
                            <ProtectRoute>
                                <Profile />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path={routesConstant.registerRetailerPending.path}
                        element={
                            <ProtectRoute>
                                <HomePage>
                                    <RegisterRetailerPending />
                                </HomePage>
                            </ProtectRoute>
                        }
                    />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <ProtectRoute access="admin">
                            <ManageLayout />
                        </ProtectRoute>
                    }
                >
                    <Route index path="dashboard" element={<DashboardPage />} />
                    <Route path="request" element={<RequestRetailerPage />} />
                    <Route path="report" element={<ReportPage />} />
                    <Route path="notification" element={<NotificationPage />} />
                </Route>

                <Route
                    path="/retailer"
                    element={
                        <ProtectRoute access="retailer">
                            <ManageLayout role="retailer" />
                        </ProtectRoute>
                    }
                >
                    <Route
                        index
                        path="dashboard"
                        element={<DashboardRetailer />}
                    />
                    <Route path="product" element={<ManageProduct />} />
                    <Route
                        path="import-product"
                        element={<WarehouseManager isImport />}
                    />
                    <Route
                        path="export-product"
                        element={<WarehouseManager isImport={false} />}
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
                        path="product/edit-product/:id"
                        element={<AddAndEditProduct />}
                    />
                    <Route
                        path="product/detail/:id"
                        element={<ManagerProductDetail />}
                    />
                    <Route
                        path="import-product/add-warehouse"
                        element={<ImportWarehouse />}
                    />
                    <Route
                        path="import-product/:id"
                        element={<ImportWarehouse />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
