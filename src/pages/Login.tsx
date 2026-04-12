import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { IconMail, IconLock, IconArrowLeft, IconEye, IconEyeOff } from '@tabler/icons-react';

import bgImage from '../assets/images/service_3d_printing_1765723641692.png';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      if (!success) setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side: Branding / Image (Hidden on smaller screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt="3D Printing Facility"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-primary-900/20" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8">
            <IconArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <img
            src="/assets/images/logo.png"
            alt="LogicHub"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            "LogicHub has completely transformed how quickly we can iterate on hardware prototypes."
          </h2>
          <p className="text-gray-300 font-medium">Join 500+ innovators bringing their ideas to life.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12 lg:p-24 bg-white relative">
        {/* Mobile Logo & Home Link */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">
            <IconArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>
        <div className="lg:hidden flex justify-center mb-10 mt-6">
          <img
            src="/assets/images/logo.png"
            alt="LogicHub"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-600">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-shake">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm shadow-sm border-l-4 border-l-green-500 flex items-center">
              <span className="mr-2">Welcome back! Signing you in...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <div className="relative">
                <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-900">Password</label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <IconLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <IconEyeOff className="h-5 w-5" />
                  ) : (
                    <IconEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading} size="lg" className="mt-2 text-base shadow-lg shadow-primary-900/20">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
