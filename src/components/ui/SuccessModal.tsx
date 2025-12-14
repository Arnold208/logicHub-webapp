import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { IconCheck, IconShoppingCart } from '@tabler/icons-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewCart: () => void;
    itemsConfigured: number;
    autoRedirectSeconds?: number;
}

export const SuccessModal = ({
    isOpen,
    onClose,
    onViewCart,
    itemsConfigured,
    autoRedirectSeconds = 3
}: SuccessModalProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            navigate('/cart');
        }, autoRedirectSeconds * 1000);

        return () => clearTimeout(timer);
    }, [isOpen, autoRedirectSeconds, navigate]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 flex items-center justify-center p-4 animate-fadeIn">
            <Card className="max-w-md w-full text-center transform animate-slideUp">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <IconCheck className="h-10 w-10 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-3">All Set!</h2>
                <p className="text-gray-600 mb-2">
                    {itemsConfigured} {itemsConfigured === 1 ? 'item' : 'items'} configured and added to your cart.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                    Redirecting to cart in {autoRedirectSeconds} seconds...
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={onClose}
                        className="order-2 sm:order-1"
                    >
                        Upload More Files
                    </Button>
                    <Button
                        fullWidth
                        onClick={onViewCart}
                        className="order-1 sm:order-2 flex items-center justify-center gap-2"
                    >
                        <IconShoppingCart className="h-5 w-5" />
                        View Cart Now
                    </Button>
                </div>
            </Card>
        </div>
    );
};
