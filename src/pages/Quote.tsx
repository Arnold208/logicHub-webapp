import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  IconTruck,
  IconMapPin,
  IconReceipt,
  IconCheck,
  IconCube,
  IconClock,
} from '@tabler/icons-react';
import imgPrinting from '../assets/images/service_3d_printing_1765723641692.png';

export const Quote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, mirroring, config } = location.state || {};
  const [deliveryOption, setDeliveryOption] = useState('delivery');

  if (!file || !config) {
    navigate('/upload');
    return null;
  }

  const materialPrices = {
    PLA: 5000,
    ABS: 7000,
    PETG: 8500,
  };

  const qualityMultipliers = {
    Draft: 1.0,
    Standard: 1.3,
    'High Detail': 1.6,
  };

  const calculatePrice = () => {
    const baseMaterialCost = materialPrices[config.material] || 5000;
    const qualityMultiplier = qualityMultipliers[config.quality] || 1.0;
    const supportCost = config.supportGeneration ? 2000 : 0;
    const infillMultiplier = 1 + (config.infillPercentage / 100) * 0.5;

    const unitPrice = baseMaterialCost * qualityMultiplier * infillMultiplier + supportCost;
    const subtotal = unitPrice * config.quantity;
    const deliveryCost = deliveryOption === 'delivery' ? 3000 : 0;
    const total = subtotal + deliveryCost;

    return {
      unitPrice: Math.round(unitPrice),
      subtotal: Math.round(subtotal),
      deliveryCost,
      total: Math.round(total),
    };
  };

  const calculateEstimates = () => {
    const baseVolume = 150;
    const volumeWithInfill = baseVolume * (config.infillPercentage / 100);

    const basePrintTime = 480;
    const qualityTimeMultipliers = {
      Draft: 0.7,
      Standard: 1.0,
      'High Detail': 1.5,
    };
    const printTime = basePrintTime * qualityTimeMultipliers[config.quality] * config.quantity;

    return {
      filamentUsage: Math.round(volumeWithInfill * config.quantity),
      printTime: Math.round(printTime),
      estimatedDelivery: deliveryOption === 'delivery' ? '3-5 business days' : 'Ready for pickup in 2-3 days',
    };
  };

  const pricing = calculatePrice();
  const estimates = calculateEstimates();

  const handleProceed = () => {
    navigate('/checkout', {
      state: {
        file,
        mirroring,
        config,
        deliveryOption,
        pricing,
        estimates,
      },
    });
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-teal-600 to-teal-800 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Your Quote</h1>
          <p className="text-gray-100 text-lg">Review your order details and pricing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <IconCube className="h-10 w-10 text-gray-900 mx-auto mb-3 stroke-[1.5]" />
            <p className="text-sm text-gray-600">Estimated Filament</p>
            <p className="text-2xl font-bold text-gray-900">{estimates.filamentUsage}g</p>
          </Card>

          <Card className="text-center">
            <IconClock className="h-10 w-10 text-gray-900 mx-auto mb-3 stroke-[1.5]" />
            <p className="text-sm text-gray-600">Print Time</p>
            <p className="text-2xl font-bold text-gray-900">{formatTime(estimates.printTime)}</p>
          </Card>

          <Card className="text-center">
            <IconTruck className="h-10 w-10 text-gray-900 mx-auto mb-3 stroke-[1.5]" />
            <p className="text-sm text-gray-600">Delivery</p>
            <p className="text-lg font-bold text-gray-900">{estimates.estimatedDelivery}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <IconReceipt className="mr-2 h-6 w-6 text-blue-600" />
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">File</span>
                  <span className="font-semibold text-gray-900">{file.name}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold text-gray-900">{config.quantity} unit{config.quantity > 1 ? 's' : ''}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Material</span>
                  <span className="font-semibold text-gray-900">{config.material}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Color</span>
                  <span className="font-semibold text-gray-900">{config.color}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Quality</span>
                  <span className="font-semibold text-gray-900">{config.quality}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Infill</span>
                  <span className="font-semibold text-gray-900">{config.infillPercentage}%</span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Support Structures</span>
                  <span className="font-semibold text-gray-900">
                    {config.supportGeneration ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <IconTruck className="mr-2 h-6 w-6 text-blue-600" />
                Delivery Method
              </h3>

              <div className="space-y-3">
                <label
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryOption === 'delivery'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                    }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryOption === 'delivery'}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-5 h-5 text-primary mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">Home Delivery</p>
                      <p className="font-bold text-primary">₵3,000</p>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">Delivered to your doorstep in 3-5 business days</p>
                  </div>
                </label>

                <label
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryOption === 'pickup'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                    }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryOption === 'pickup'}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-5 h-5 text-primary mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">Pickup</p>
                      <p className="font-bold text-green-600">Free</p>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      Collect from our facility in 2-3 days
                    </p>
                    <div className="flex items-start space-x-2 mt-2 p-2 bg-background-muted rounded">
                      <IconMapPin className="h-4 w-4 text-text-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-text-secondary">One Airport Square, Airport City, Accra</p>
                    </div>
                  </div>
                </label>
              </div>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Price Breakdown</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Unit Price</span>
                  <span>₵{pricing.unitPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Quantity (×{config.quantity})</span>
                  <span>₵{pricing.subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{pricing.deliveryCost === 0 ? 'Free' : `₵${pricing.deliveryCost.toLocaleString()}`}</span>
                </div>

                <div className="border-t-2 border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-primary">₵{pricing.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <IconCheck className="h-5 w-5 text-green-600" />
                  <span>Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <IconCheck className="h-5 w-5 text-green-600" />
                  <span>Free design review</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <IconCheck className="h-5 w-5 text-green-600" />
                  <span>Secure payment</span>
                </div>
              </div>

              <Button size="lg" fullWidth onClick={handleProceed}>
                Proceed to Checkout
              </Button>

              <button
                onClick={() => navigate('/configure-print', { state: { file, mirroring } })}
                className="w-full mt-3 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Modify Configuration
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
