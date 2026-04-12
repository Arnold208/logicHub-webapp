import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import {
  IconLogout,
  IconLogin,
  IconUserPlus,
  IconShoppingCart,
  IconMenu2,
  IconX,
  IconChevronDown,
  IconPrinter,
  IconCut,
  IconTree,
  IconCpu,
  IconRocket,
  IconBulb,
  IconUpload,
  IconClipboardList,
  IconSettings,
  IconLayoutDashboard
} from '@tabler/icons-react';

const services = [
  { label: '3D Printing', href: '/services/3d-printing', icon: IconPrinter, desc: 'FDM printing for prototypes & parts' },
  { label: 'Laser Cutting', href: '/services/laser-cutting', icon: IconCut, desc: 'Precision cutting & engraving' },
  { label: 'Woodworking & CNC', href: '/services/woodworking', icon: IconTree, desc: 'Custom builds & fabrication' },
  { label: 'Hardware Dev', href: '/services/hardware-development', icon: IconCpu, desc: 'From CAD to functional product' },
  { label: 'IoT & Robotics', href: '/services/iot-robotics', icon: IconRocket, desc: 'Embedded systems & automation' },
  { label: 'Incubation', href: '/services/incubation', icon: IconBulb, desc: 'Mentorship & startup support' },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setIsUserOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      setIsUserOpen(false);
      setIsMobileOpen(false);
      await logout();
    } catch (err) {
      console.error('Logout error in Navbar:', err);
      window.location.href = '/';
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 shrink-0">
            <img
              src="/assets/images/logo.png"
              alt="LogicHub"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen(v => !v)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname.startsWith('/services') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Services
                <IconChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <Link to="/services" className="text-xs font-bold text-primary-600 uppercase tracking-widest hover:text-primary-700">
                      View All Services →
                    </Link>
                  </div>
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <s.icon className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{s.label}</p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/appointment"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/appointment') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Contact
            </Link>

            {user && (
              <>
                <Link
                  to="/orders"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/orders') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  My Orders
                </Link>
              </>
            )}
          </div>

          {/* Right Side: Auth + Cart */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cart Always Visible */}
            <Link to="/cart" className="relative p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
              <IconShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                {/* User Dropdown */}
                <div ref={userRef} className="relative">
                  <button
                    onClick={() => setIsUserOpen(v => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    <IconChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUserOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserOpen && (
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 animate-fadeIn">
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                        <IconSettings className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Profile & Settings</span>
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 hover:bg-teal-50 bg-teal-50/30 transition-colors group">
                          <IconLayoutDashboard className="h-4 w-4 text-teal-600" />
                          <span className="text-sm font-bold text-teal-700">Admin Portal</span>
                        </Link>
                      )}
                      <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                        <IconClipboardList className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">My Orders</span>
                      </Link>
                      <Link to="/upload" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                        <IconUpload className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Upload & Print</span>
                      </Link>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-left transition-colors group"
                      >
                        <IconLogout className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-red-500">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <IconLogin className="h-4 w-4" />
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                >
                  <IconUserPlus className="h-4 w-4" />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
              <IconShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileOpen(v => !v)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            <Link to="/" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Home</Link>
            <Link to="/services" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">All Services</Link>
            <div className="pl-3 border-l-2 border-gray-100 ml-3 space-y-1">
              {services.map(s => (
                <Link key={s.href} to={s.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  <s.icon className="h-4 w-4 text-primary-500" />
                  {s.label}
                </Link>
              ))}
            </div>
            <Link to="/appointment" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Contact</Link>

            {user ? (
              <>                <Link to="/orders" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">My Orders</Link>
                <Link to="/profile" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Profile & Settings</Link>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <IconLogout className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <IconLogin className="h-4 w-4" />
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                >
                  <IconUserPlus className="h-4 w-4" />
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
