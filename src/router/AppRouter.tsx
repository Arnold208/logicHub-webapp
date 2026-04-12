import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Loader } from '../components/ui/Loader';

import { Home } from '../pages/Home';
import { Services } from '../pages/Services';
import { Service3DPrinting } from '../pages/services/Service3DPrinting';
import { ServiceLaserCutting } from '../pages/services/ServiceLaserCutting';
import { ServiceWoodworking } from '../pages/services/ServiceWoodworking';
import { ServiceHardware } from '../pages/services/ServiceHardware';
import { ServiceIotRobotics } from '../pages/services/ServiceIotRobotics';
import { ServiceIncubation } from '../pages/services/ServiceIncubation';
import ScrollToTop from '../components/layout/ScrollToTop';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { ForgotPassword } from '../pages/ForgotPassword';
import { Otp } from '../pages/Otp';
import { Upload } from '../pages/Upload';
import { ConfigurePrint } from '../pages/ConfigurePrint';
import { Quote } from '../pages/Quote';
import { Checkout } from '../pages/Checkout';
import { Cart } from '../pages/Cart';
import { Appointment } from '../pages/Appointment';
import { Orders } from '../pages/Orders';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { TrackOrder } from '../pages/account/TrackOrder';

// Admin Pages
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminDashboard } from '../pages/admin/Dashboard';
import { Orders as AdminOrders } from '../pages/admin/Orders';
import { OrderDetail as AdminOrderDetail } from '../pages/admin/OrderDetail';
import { AdminCustomers } from '../pages/admin/Customers';
import { AdminServices } from '../pages/admin/Services';
import { AdminSettings } from '../pages/admin/Settings';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading..." showReset={true} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader text="Verifying Access..." showReset={true} /></div>;

  const isAdmin = user?.role === 'admin';

  if (!user || !isAdmin) {
    console.warn('Unauthorized access attempt to admin area.');
    return <Navigate to="/" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading..." showReset={true} />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* We will update this to new Home soon */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/3d-printing" element={<Service3DPrinting />} />
          <Route path="/services/laser-cutting" element={<ServiceLaserCutting />} />
          <Route path="/services/woodworking" element={<ServiceWoodworking />} />
          <Route path="/services/hardware-development" element={<ServiceHardware />} />
          <Route path="/services/iot-robotics" element={<ServiceIotRobotics />} />
          <Route path="/services/incubation" element={<ServiceIncubation />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <PublicRoute>
                <Otp />
              </PublicRoute>
            }
          />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/configure-print" element={<ConfigurePrint />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/track/:id"
            element={
              <ProtectedRoute>
                <TrackOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/orders/:id" element={<AdminRoute><AdminOrderDetail /></AdminRoute>} />
          <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
          <Route path="/admin/services" element={<AdminRoute><AdminServices /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};
