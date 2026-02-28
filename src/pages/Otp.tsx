import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { IconArrowLeft, IconShieldCheck } from '@tabler/icons-react';

import bgImage from '../assets/images/service_iot_robotics_1765723715509.png';

export const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Focus first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Focus previous input on backspace
        if (e.key === 'Backspace' && index > 0 && otp[index] === '' && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');

        if (code.length < 6) {
            setError('Please enter the full 6-digit code');
            return;
        }

        setError('');
        setLoading(true);

        // Mock API call
        setTimeout(() => {
            setLoading(false);
            // Let's pretend it succeeds and auto-logs them in to home
            navigate('/login');
        }, 1500);
    };

    const handleResend = () => {
        // Mock resend
        setError('');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left side: Branding / Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden flex-col justify-between p-12">
                <div className="absolute inset-0">
                    <img
                        src={bgImage}
                        alt="IoT Robotics Lab"
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
                        "Your security is our top priority."
                    </h2>
                    <p className="text-gray-300 font-medium">We ensure your intellectual property and projects remain strictly confidential.</p>
                </div>
            </div>

            {/* Right side: Form */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12 lg:px-24 xl:px-32 bg-white relative">
                <div className="lg:hidden absolute top-8 left-8">
                    <Link to="/forgot-password" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">
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
                    <div className="mb-2 text-center">
                        <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <IconShieldCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Verify Code</h1>
                        <p className="text-gray-600">Enter the 6-digit verification code sent to your email or phone.</p>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                        <div className="flex justify-center gap-2 sm:gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 bg-gray-50"
                                    required
                                />
                            ))}
                        </div>

                        <Button type="submit" fullWidth disabled={loading} size="lg" className="text-base shadow-lg shadow-primary-900/20">
                            {loading ? 'Verifying...' : 'Verify & Continue'}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <p className="text-gray-600">
                            Didn't receive the code?{' '}
                            <button onClick={handleResend} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                Resend code
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
