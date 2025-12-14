import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { IconUser, IconLogout, IconLogin, IconUserPlus, IconShoppingCart } from '@tabler/icons-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (

    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Logo */}
            <img
              src="/assets/images/logo.png"
              alt="LogicHub"
              className="h-10 w-auto object-contain"
            />
            {/* Ghana Flag Removed as per request */}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Services
            </Link>
            <Link to="/services/3d-printing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              3D Printing
            </Link>
            <Link to="/appointment" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Contact
            </Link>

            {user && (
              <>
                <Link to="/upload" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Upload & Print
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Orders
                </Link>

                <Link to="/cart" className="relative group">
                  <div className="p-2 text-gray-600 group-hover:text-primary transition-colors">
                    <IconShoppingCart className="h-6 w-6" />
                    {itemCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {itemCount}
                      </span>
                    )}
                  </div>
                </Link>
              </>
            )}

            {!user && (
              <Link to="/upload" className="text-primary font-semibold hover:text-primary-hover transition-colors">
                Start Printing
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-background-muted transition-colors"
                >
                  <IconUser className="h-5 w-5 text-text-secondary" />
                  <span className="text-text-primary font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <IconLogout className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-text-primary hover:bg-background-muted rounded-lg transition-colors"
                >
                  <IconLogin className="h-5 w-5" />
                  <span className="font-medium">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-md"
                >
                  <IconUserPlus className="h-5 w-5" />
                  <span className="font-medium">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
