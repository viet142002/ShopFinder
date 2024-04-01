import { Routes, Route } from 'react-router-dom';

import ProtectRoute from './ProtectRoute';
import DefaultLayout from '../layouts/DefaultLayout';

import HomePage from '@pages/Home/HomePage';
import ProductsPage from '@pages/User/Products/ProductsPage';
import ProductPage from '@pages/User/Product/ProductPage';
import CartPage from '@pages/User/Cart/CartPage';
import CheckoutPage from '@pages/User/Checkout/CheckoutPage';
import NotificationPage from '@pages/User/Notification/NotificationPage';
import Profile from '@pages/user/Profile/ProfilePage';
import CreateStore from '@pages/CreateStore/CreateStore';
import Login from '@pages/Auth/Login/LoginPage';
import Register from '@pages/Auth/Register/RegisterPage';
import RegisterRetailerPending from '@pages/RegisterRetailer/RegisterRetailerPending';

const customerRouter = () => {
    return (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectRoute>
                            <CartPage />
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
                        // <ProtectRoute>
                        <NotificationPage />
                        // </ProtectRoute>
                    }
                />
                <Route
                    path="/register-retailer"
                    element={
                        <ProtectRoute>
                            <CreateStore isRegisterRetailer />
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
                    path="/register-retailer-pending"
                    element={
                        <ProtectRoute>
                            <HomePage>
                                <RegisterRetailerPending />
                            </HomePage>
                        </ProtectRoute>
                    }
                />
                <Route path="/store/:id" element={<ProductsPage />} />
                <Route path="/store/:id/:idProduct" element={<ProductPage />} />
            </Route>
        </>
    );
};

export default customerRouter;
