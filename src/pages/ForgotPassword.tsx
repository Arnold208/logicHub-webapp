import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { IconMail, IconArrowLeft } from '@tabler/icons-react';

import bgImage from '../assets/images/service_hardware_dev_1765723694180.png';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            // In a real app, we might navigate to OTP page with state:
            // navigate('/otp', { state: { email } });
        }, 1500);
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left side: Branding / Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden flex-col justify-between p-12">
                <div className="absolute inset-0">
                    <img
                        src={bgImage}
                        alt="Hardware Development Focus"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-primary-900/20" />
                </div>

                <div className="relative z-10">
                    <Link to="/login" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8">
                        <IconArrowLeft className="w-5 h-5 mr-2" />
                        Back to Login
                    </Link>
                    <img
                        src="/assets/images/logo.png"
                        alt="LogicHub"
                        className="h-10 w-auto object-contain brightness-0 invert"
                    />
                </div>

                <div className="relative z-10 text-white max-w-lg">
                    <h2 className="text-3xl font-bold mb-4 leading-tight">
                        "Securely regain access to your workspace."
                    </h2>
                    <p className="text-gray-300 font-medium">Don't lose momentum. Reset your password and get back to building.</p>
                </div>
            </div>

            {/* Right side: Form */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12 lg:px-24 xl:px-32 bg-white relative">
                <div className="lg:hidden absolute top-8 left-8">
                    <Link to="/login" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">
                        <IconArrowLeft className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>
                </div>
                <div className="lg:hidden flex justify-center mb-8 mt-6">
                    <img
                        src="/assets/images/logo.png"
                        alt="LogicHub"
                        className="h-12 w-auto object-contain"
                    />
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Forgot Password</h1>
                        <p className="text-gray-600">Enter your email address and we'll send you instructions to reset your password.</p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                                <div className="relative">
                                    <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                                        placeholder="you@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" fullWidth disabled={loading} size="lg" className="text-base shadow-lg shadow-primary-900/20">
                                {loading ? 'Sending request...' : 'Send Reset Instructions'}
                            </Button>
                        </form>
                    ) : (
                        <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconMail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Check your email</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                We've sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>. Please check your inbox and spam folder.
                            </p>
                            <Button onClick={() => navigate('/otp')} fullWidth variant="outline" className="border-primary-200 hover:bg-primary-50">
                                Enter OTP manually
                            </Button>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Remember your password?{' '}
                            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
