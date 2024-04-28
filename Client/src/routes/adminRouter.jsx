import { Routes, Route } from 'react-router-dom';

import ProtectRoute from './ProtectRoute';
import ManageLayout from '../layouts/ManageLayout';

import DashboardPage from '@pages/Admin/DashboardPage';
import RequestRetailerPage from '@pages/Admin/RetailerManager';
import ReportPage from '@pages/Admin/Reports';
import NotificationPage from '@pages/User/Notification/NotificationPage';

const AdminRouter = () => {
    return (
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
    );
};

export default AdminRouter;
