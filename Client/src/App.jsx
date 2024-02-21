import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import DefaultLayout from './layouts/DefaultLayout';
// import HomePage from './pages/Home/HomePage';
import Profile from './pages/Profile/ProfilePage';
import Login from './pages/Auth/Login/LoginPage';
import Register from './pages/Auth/Register/RegisterPage';
import RegisterRetailer from './pages/RegisterRetailer/RegisterRetailer';
import RegisterRetailerPending from './pages/RegisterRetailer/RegisterRetailerPending';
import ProtectRoute from './routes/ProtectRoute';
import ManageLayout from './layouts/ManageLayout';
import RequestRetailerPage from './pages/Admin/RequestRetailerPage';
import DashboardPage from './pages/Admin/DashboardPage';
import ReportPage from './pages/Admin/ReportPage';
import NotificationPage from './pages/Admin/NotificationPage';

import {
    DashboardRetailer,
    ManageOrder,
    ManageOrderDetail,
    ManageProduct,
    ManageRetailerProfile,
    StatisticRetailer,
    ImportProduct,
    ExportProduct,
    AddProduct
} from './pages/Retailer';

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
                <Route
                    path={routesConstant.registerRetailer.path}
                    element={
                        <ProtectRoute>
                            <RegisterRetailer />
                        </ProtectRoute>
                    }
                />

                <Route path="/" element={<DefaultLayout />}>
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
                                <RegisterRetailerPending />
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
                    <Route path="import-product" element={<ImportProduct />} />
                    <Route path="export-product" element={<ExportProduct />} />
                    <Route path="order" element={<ManageOrder />} />
                    <Route path="order/:id" element={<ManageOrderDetail />} />
                    <Route path="statistic" element={<StatisticRetailer />} />
                    <Route path="profile" element={<ManageRetailerProfile />} />
                    <Route
                        path="product/add-product"
                        element={<AddProduct />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
