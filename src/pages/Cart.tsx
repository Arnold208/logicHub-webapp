import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { STLViewer } from '../components/3d/STLViewer';
import { IconTrash, IconShoppingCart, IconArrowRight } from '@tabler/icons-react';

export const Cart = () => {
    const { items, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <IconShoppingCart className="h-10 w-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">Start by uploading a 3D model to print.</p>
                    <Button onClick={() => navigate('/upload')}>
                        Upload 3D Model
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <Card key={item.id} className="relative">
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <IconTrash className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        <STLViewer
                                            fileData={item.file.data}
                                            mirrorX={item.mirroring.mirrorX}
                                            mirrorY={item.mirroring.mirrorY}
                                            mirrorZ={item.mirroring.mirrorZ}
                                        />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{item.file.name}</h3>

                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium text-gray-900">Material:</span> {item.config.material}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900">Color:</span> {item.config.color}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900">Quality:</span> {item.config.quality}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900">Infill:</span> {item.config.infillPercentage}%
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900">Quantity:</span> {item.config.quantity}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900">Supports:</span> {item.config.supportGeneration ? 'Yes' : 'No'}
                                            </div>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                                            <div className="text-sm text-gray-500">
                                                {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                            <div className="text-lg font-bold text-primary">
                                                ₵{item.pricing.subtotal.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₵{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-sm italic">Calculated at checkout</span>
                                </div>

                                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-primary">₵{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                fullWidth
                                onClick={() => navigate('/checkout')}
                                className="flex items-center justify-center space-x-2"
                            >
                                <span>Proceed to Checkout</span>
                                <IconArrowRight className="h-5 w-5" />
                            </Button>

                            <div className="mt-4 text-center">
                                <Button variant="secondary" fullWidth onClick={() => navigate('/upload')}>
                                    Add More Items
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
