import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { setFirstLocation } from './redux/routingSlice';
import socket from '~/socket';
import { useAuth } from './hooks';

import Loading from '~/components/Loading';
import ProtectRoute from './routes/ProtectRoute';
const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));
const ManageLayout = lazy(() => import('./layouts/ManageLayout'));

import ListShared from '~/pages/User/StoreProfile/ListShared';
import EditProfile from '~/pages/User/Profile/EditProfile';
import StoreProfile from '~/pages/User/StoreProfile';
const NewPassword = lazy(
    () => import('~/pages/User/ForgotPassword/NewPassword')
);
const ForgotPassword = lazy(() => import('~/pages/User/ForgotPassword'));
const VNPayReturn = lazy(() => import('~/pages/User/Checkout/VNPayReturn'));
const PaymentFail = lazy(() => import('~/pages/User/Checkout/PaymentFail'));
import Profile from '~/pages/User/Profile';

const HomePage = lazy(async () => import('~/pages/User/Home/HomePage'));
import ProductsPage from '~/pages/User/Products/ProductsPage';
import ProductPage from '~/pages/User/Product/ProductPage';
import CartPage from '~/pages/User/Cart/CartPage';
import CheckoutPage from '~/pages/User/Checkout/CheckoutPage';
import NotificationPage from '~/pages/User/Notification/NotificationPage';
import OrderPage from '~/pages/User/Orders/OrderPage';
import OrderDetailPage from '~/pages/User/Orders/OrderDetailPage';
const Login = lazy(() => import('~/pages/Auth/Login/LoginPage'));
const Register = lazy(() => import('~/pages/Auth/Register/RegisterPage'));
const CreateStore = lazy(() => import('~/pages/User/CreateStore/CreateStore'));
const AddAndEditProductByUser = lazy(
    () => import('~/pages/User/Product/AddAndEditProductByUser')
);
const EditStore = lazy(() => import('~/pages/EditStore'));

import DashboardRetailer from '~/pages/Retailer/DashboardRetailer';
import AnalystRevenue from '~/pages/Retailer/Analyst/AnalystRevenue';
import ManageProduct from '~/pages/Retailer/Product/ManageProduct';
import ManageOrder from '~/pages/Retailer/ManageOrder';
import ManageOrderDetail from '~/pages/Retailer/ManageOrderDetail';
import ManageRetailerProfile from '~/pages/Retailer/ManageRetailerProfile';
import AddAndEditProduct from '~/pages/Retailer/Product/AddAndEditProduct';
import ManagerProductDetail from '~/pages/Retailer/Product/ManagerProductDetail';
import ImportWarehouse from '~/pages/Retailer/WarehouseManager/ImportWarehouse';
import WarehouseManager from '~/pages/Retailer/WarehouseManager/WarehouseManager';

import RequestRetailerPage from '~/pages/Admin/RetailerManager';
import ReportPage from '~/pages/Admin/Reports';
import ReportDetail from '~/pages/Admin/Reports/ReportDetail';
import UsersManager from '~/pages/Admin/UserManager/UsersManager';
import InformationManager from '~/pages/Admin/InformationManager/InformationManager';

function App() {
    const dispatch = useDispatch();
    const { data: user } = useAuth();

    useEffect(() => {
        dispatch(setFirstLocation());
        socket.on('connect', () => {});

        if (user?.fullname) {
            console.log('join socket');
            socket.emit('join', user);
        }

        return () => {
            socket.off('connect');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/login-retailer"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Login isLoginRetailer={true} />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Register />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register-retailer"
                        element={
                            <Suspense fallback={<Loading />}>
                                <CreateStore isRegisterRetailer />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<Loading />}>
                                <DefaultLayout />
                            </Suspense>
                        }
                    >
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomePage />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/forgot-password"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <ForgotPassword />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/new-password"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <NewPassword />
                                </Suspense>
                            }
                        />
                        <Route path="/list-shared" element={<ListShared />} />
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
                                    <Suspense fallback={<Loading />}>
                                        <EditStore />
                                    </Suspense>
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
                                    <Suspense fallback={<Loading />}>
                                        <VNPayReturn />
                                    </Suspense>
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/order/payment-fail"
                            element={
                                <ProtectRoute>
                                    <Suspense fallback={<Loading />}>
                                        <PaymentFail />
                                    </Suspense>
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/share-store"
                            element={
                                <ProtectRoute>
                                    <Suspense fallback={<Loading />}>
                                        <CreateStore />
                                    </Suspense>
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
                            path="/profile"
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
                                    <Suspense fallback={<Loading />}>
                                        <AddAndEditProductByUser />
                                    </Suspense>
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/stores/:storeId/add-product"
                            element={
                                <ProtectRoute>
                                    <Suspense fallback={<Loading />}>
                                        <AddAndEditProductByUser />
                                    </Suspense>
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/stores/:storeId/products/:productId"
                            element={<ProductPage />}
                        />
                    </Route>
                    {/* admin router */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectRoute access="admin">
                                <Suspense fallback={<Loading />}>
                                    <ManageLayout role="admin" />
                                </Suspense>
                            </ProtectRoute>
                        }
                    >
                        <Route
                            index
                            path="retailer"
                            element={<RequestRetailerPage />}
                        />
                        <Route path="reports" element={<ReportPage />} />
                        <Route
                            path="reports/:reportId"
                            element={<ReportDetail />}
                        />
                        <Route
                            path="edit-store/:id"
                            element={
                                <ProtectRoute>
                                    <Suspense fallback={<Loading />}>
                                        <EditStore />
                                    </Suspense>
                                </ProtectRoute>
                            }
                        />
                        <Route path="users" element={<UsersManager />} />
                        <Route
                            path="information"
                            element={<InformationManager />}
                        />
                    </Route>
                    {/* Retailer router */}
                    <Route
                        path="/retailer"
                        element={
                            <ProtectRoute access="retailer">
                                <Suspense fallback={<Loading />}>
                                    <ManageLayout role="retailer" />
                                </Suspense>
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
        </>
    );
}

export default App;
