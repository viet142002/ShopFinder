import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, Suspense } from 'react';

// #region import layout and something
import Loading from './components/Loading';
import ProtectRoute from './routes/ProtectRoute';
import DefaultLayout from './layouts/DefaultLayout';
import ManageLayout from './layouts/ManageLayout';
import { routesConstant } from './routes/routesConstant';
import { setFirstLocation } from './redux/routingSlice';
import socket from './socket';
// #endregion
// #region user page
import ListShared from '@pages/User/StoreProfile/ListShared';
import EditProfile from '@pages/User/Profile/EditProfile';
import StoreProfile from '@pages/User/StoreProfile';
import NewPassword from '@pages/User/ForgotPassword/NewPassword';
import ForgotPassword from '@pages/User/ForgotPassword';
import VNPayReturn from '@pages/User/Checkout/VNPayReturn';
import PaymentFail from '@pages/User/Checkout/PaymentFail';
import Profile from './pages/User/Profile';
import Login from './pages/Auth/Login/LoginPage';
import Register from './pages/Auth/Register/RegisterPage';
import RegisterRetailerPending from './pages/User/RegisterRetailer/RegisterRetailerPending';
import HomePage from './pages/User/Home/HomePage';
import ProductsPage from './pages/User/Products/ProductsPage';
import ProductPage from './pages/User/Product/ProductPage';
import CartPage from './pages/User/Cart/CartPage';
import CheckoutPage from './pages/User/Checkout/CheckoutPage';
import NotificationPage from './pages/User/Notification/NotificationPage';
import OrderPage from '@pages/User/Orders/OrderPage';
import OrderDetailPage from '@pages/User/Orders/OrderDetailPage';
import CreateStore from './pages/User/CreateStore/CreateStore';
import AddAndEditProductByUser from '@pages/User/Product/AddAndEditProductByUser';
import EditStore from '@pages/EditStore';
// #endregion
// #region admin page
import RequestRetailerPage from './pages/Admin/RetailerManager';
import DashboardPage from './pages/Admin/DashboardPage';
import ReportPage from './pages/Admin/Reports';
import ReportDetail from './pages/Admin/Reports/ReportDetail';
import UsersManager from '@pages/Admin/UserManager/UsersManager';
import InformationManager from '@pages/Admin/InformationManager/InformationManager';
// #endregion
// #region retailer page
import AnalystRevenue from '@pages/Retailer/Analyst/AnalystRevenue';
import DashboardRetailer from './pages/Retailer/DashboardRetailer';
import WarehouseManager from './pages/Retailer/WarehouseManager/WarehouseManager';
import ManageOrder from './pages/Retailer/ManageOrder';
import ManageOrderDetail from './pages/Retailer/ManageOrderDetail';
import ManageRetailerProfile from './pages/Retailer/ManageRetailerProfile';
import ManageProduct from './pages/Retailer/Product/ManageProduct';
import AddAndEditProduct from './pages/Retailer/Product/AddAndEditProduct';
import ManagerProductDetail from './pages/Retailer/Product/ManagerProductDetail';
import ImportWarehouse from './pages/Retailer/WarehouseManager/ImportWarehouse';
import { useAuth } from './hooks';
// #endregion

function App() {
    const dispatch = useDispatch();
    const { data: user } = useAuth();

    useEffect(() => {
        dispatch(setFirstLocation());
        socket.on('connect', () => {});
        socket.on('disconnect', () => {});
        if (user) {
            socket.emit('join', user);
        }
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={routesConstant.login.path}
                        element={<Login />}
                    />
                    <Route
                        path={routesConstant.register.path}
                        element={<Register />}
                    />
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<HomePage />} />

                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route path="/list-shared" element={<ListShared />} />
                        <Route path="/new-password" element={<NewPassword />} />
                        <Route
                            path="/cart"
                            element={
                                <ProtectRoute>
                                    <CartPage />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/edit-store/:id"
                            element={
                                <ProtectRoute>
                                    <EditStore />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/order"
                            element={
                                <ProtectRoute>
                                    <OrderPage />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/order/:orderId"
                            element={
                                <ProtectRoute>
                                    <OrderDetailPage />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/order/vnp-return"
                            element={
                                <ProtectRoute>
                                    <VNPayReturn />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/order/payment-fail"
                            element={
                                <ProtectRoute>
                                    <PaymentFail />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/share-store"
                            element={
                                <ProtectRoute>
                                    <CreateStore />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <ProtectRoute>
                                    <CheckoutPage />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/notification"
                            element={
                                <ProtectRoute>
                                    <NotificationPage />
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
                            path="/profile/edit"
                            element={
                                <ProtectRoute>
                                    <EditProfile />
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
                        <Route
                            path="/stores/:storeId"
                            element={<StoreProfile />}
                        />
                        <Route
                            path="/stores/:storeId/products"
                            element={<ProductsPage />}
                        />
                        <Route
                            path="/stores/:storeId/edit-product/:productId"
                            element={
                                <ProtectRoute>
                                    <AddAndEditProductByUser />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/stores/:storeId/add-product"
                            element={
                                <ProtectRoute>
                                    <AddAndEditProductByUser />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/stores/:storeId/products/:productId"
                            element={<ProductPage />}
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
                        <Route
                            index
                            path="dashboard"
                            element={<DashboardPage />}
                        />
                        <Route
                            path="request"
                            element={<RequestRetailerPage />}
                        />
                        <Route path="reports" element={<ReportPage />} />
                        <Route
                            path="reports/:reportId"
                            element={<ReportDetail />}
                        />
                        <Route path="users" element={<UsersManager />} />
                        <Route
                            path="information"
                            element={<InformationManager />}
                        />
                    </Route>

                    <Route
                        path="/retailer/:id"
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
                        <Route
                            path="analyst/:title"
                            element={<AnalystRevenue />}
                        />
                        <Route path="product" element={<ManageProduct />} />
                        <Route
                            path="import-product"
                            element={<WarehouseManager isImport />}
                        />
                        <Route path="order" element={<ManageOrder />} />
                        <Route
                            path="order/:orderId"
                            element={<ManageOrderDetail />}
                        />

                        <Route
                            path="profile"
                            element={<ManageRetailerProfile />}
                        />
                        <Route
                            path="product/add-product"
                            element={<AddAndEditProduct />}
                        />
                        <Route
                            path="product/edit-product/:productId"
                            element={<AddAndEditProduct />}
                        />
                        <Route
                            path="product/detail/:productId"
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
                        <Route path="edit-retailer" element={<EditStore />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
