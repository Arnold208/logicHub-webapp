import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import { useOrders } from '../context/OrderContext';
import {
  IconMapPin,
  IconPhone,
  IconUser,
  IconMail,
  IconCreditCard,
  IconCheck,
  IconReceipt,
} from '@tabler/icons-react';

import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [deliveryOption, setDeliveryOption] = useState('third-party');
  // Both pickup and third-party delivery on-platform are 0 cost. The customer pays the rider directly.
  const deliveryCost = 0;
  const total = cartTotal + deliveryCost;

  // Calculate estimates
  const totalPrintTime = items.reduce((sum, item) => {
    // Rough estimate from Quote logic: base 480 + multipliers
    // We should ideally store this in CartItem or have a shared utility
    // For now, simple mock sum or just sum quantity * 60 mins
    return sum + (item.config.quantity * 60);
  }, 0);

  const estimatedDeliveryDate = deliveryOption === 'third-party' ? '2-3 days via rider' : 'Pickup in 2-3 days';

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
  });

  const [paying, setPaying] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    setPaying(true);
    setPaymentError(null);

    try {
      const orderData = {
        items: items.map(item => ({
          service: '3D Printing',
          name: item.file.name,
          price: item.pricing.subtotal,
          quantity: item.config.quantity,
          config: item.config,
          storagePath: item.file.path // Assuming we have a path from upload
        })),
        total: total,
        customerName: formData.fullName,
        customerEmail: formData.email,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          deliveryOption: deliveryOption
        }
      };

      const newOrder = await addOrder(orderData);

      if (newOrder) {
        setOrderId(newOrder.id);
        clearCart();
        setOrderComplete(true);
      } else {
        setPaymentError('Order creation failed. Please ensure you are logged in and try again.');
      }
    } catch (error: any) {
      console.error('Order creation failed:', error);
      setPaymentError(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <IconCheck className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your order. We've received your payment and will start processing your print job shortly.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order ID</p>
            <p className="text-2xl font-bold text-blue-600">{orderId}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Estimated Print Time</p>
              <p className="font-semibold text-gray-900">~{Math.round(totalPrintTime / 60)} hours</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Delivery</p>
              <p className="font-semibold text-gray-900">{estimatedDeliveryDate}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/orders')}>
              <IconReceipt className="mr-2 h-5 w-5" />
              View My Orders
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (paying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <Card className="text-center">
          <Loader size="lg" text="Processing payment..." />
          <p className="mt-6 text-gray-600">Please wait while we confirm your payment</p>
        </Card>
      </div>
    );
  }

  if (paymentError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Failed</h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">{paymentError}</p>
          <p className="text-xs text-gray-400 mb-6">
            This is likely a temporary issue. Please ensure you are logged in and try again. If the problem persists, the administrator needs to update the database security policies.
          </p>
          <button
            onClick={() => setPaymentError(null)}
            className="w-full px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            ← Try Again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-teal-600 to-teal-800 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Checkout</h1>
          <p className="text-gray-100 text-lg">Complete your order with secure payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <IconMapPin className="mr-2 h-6 w-6 text-blue-600" />
                Delivery Method
              </h3>

              <div className="space-y-3 mb-6">
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryOption === 'third-party' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                  <input type="radio" name="delivery" value="third-party" checked={deliveryOption === 'third-party'} onChange={(e) => setDeliveryOption(e.target.value)} className="w-5 h-5 text-primary mt-1" />
                  <div className="ml-3 flex-1">
                    <span className="font-semibold text-gray-900">Third-Party Delivery (Uber, Bolt, Yango)</span>
                    <p className="text-sm text-gray-500">We ship via a secure third-party rider. Customer bears delivery cost upon arrival.</p>
                  </div>
                </label>

                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryOption === 'pickup' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                  <input type="radio" name="delivery" value="pickup" checked={deliveryOption === 'pickup'} onChange={(e) => setDeliveryOption(e.target.value)} className="w-5 h-5 text-primary mt-1" />
                  <div className="ml-3 flex-1">
                    <span className="font-semibold text-gray-900">Facility Pickup (Free)</span>
                    <p className="text-sm text-gray-500">Collect your prints directly from our facility when ready.</p>
                  </div>
                </label>
              </div>

              {deliveryOption === 'third-party' && (
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Shipping Address</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <IconUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <IconPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="12 Independence Avenue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Accra"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Greater Accra"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <IconCreditCard className="mr-2 h-6 w-6 text-primary" />
                Payment Method
              </h3>

              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white mb-4">
                <p className="text-sm opacity-90 mb-4 font-semibold">Pay securely via Paystack</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold">₵{total.toLocaleString()}</div>
                  <div className="flex space-x-2">
                    <span className="bg-white/20 px-2 py-1 rounded text-xs font-semibold">Mobile Money</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-xs font-semibold">Card</span>
                  </div>
                </div>
                <p className="text-xs opacity-80">
                  Payment will be processed securely through Paystack. (Live integration pending, using mock processor).
                </p>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={handlePayment}
                className="bg-green-600 hover:bg-green-700"
              >
                <IconCheck className="mr-2 h-5 w-5" />
                Complete Payment
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                By completing this payment, you agree to our terms of service
              </p>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.file.name} (x{item.config.quantity})</span>
                    <span className="font-medium text-gray-900">₵{item.pricing.subtotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₵{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryOption === 'third-party' ? 'Paid to Rider' : 'Free (Pickup)'}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-200">
                  <span>Total</span>
                  <span className="text-primary">₵{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <span>Quality guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <span>Order tracking available</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
