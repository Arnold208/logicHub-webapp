import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { Upload } from '../pages/Upload';
import { ConfigurePrint } from '../pages/ConfigurePrint';
import { Quote } from '../pages/Quote';
import { Checkout } from '../pages/Checkout';
import { Cart } from '../pages/Cart';
import { Appointment } from '../pages/Appointment';
import { Orders } from '../pages/Orders';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/upload" replace />;
  }

  return children;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
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
            <Route path="/appointment" element={<Appointment />} />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/configure-print"
              element={
                <ProtectedRoute>
                  <ConfigurePrint />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quote"
              element={
                <ProtectedRoute>
                  <Quote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
