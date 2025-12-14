import { useState } from 'react';
import { STLViewer } from '../3d/STLViewer';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { IconCube, IconPalette, IconSettings } from '@tabler/icons-react';

interface PrintConfiguratorProps {
    file: {
        name: string;
        size: number;
        data: string | ArrayBuffer | null;
    };
    onAddToCart: (config: any, pricing: any) => void;
    onCancel: () => void;
    remainingFiles?: number;
}

export const PrintConfigurator = ({ file, onAddToCart, onCancel, remainingFiles = 0 }: PrintConfiguratorProps) => {
    const [config, setConfig] = useState({
        quantity: 1,
        material: 'PLA',
        color: 'White',
        quality: 'Standard',
        supportGeneration: false,
        infillPercentage: 20,
    });

    const [mirroring, setMirroring] = useState({
        mirrorX: false,
        mirrorY: false,
        mirrorZ: false,
    });

    const materials = [
        { name: 'PLA', price: 5000, description: 'Best for prototypes and decorative items' },
        { name: 'ABS', price: 7000, description: 'Durable and heat-resistant' },
        { name: 'PETG', price: 8500, description: 'Strong, flexible, weather-resistant' },
    ];

    const colors = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Gray'];

    const qualities = [
        { name: 'Draft', layerHeight: '0.3mm', description: 'Fast and economical' },
        { name: 'Standard', layerHeight: '0.2mm', description: 'Balanced quality and speed' },
        { name: 'High Detail', layerHeight: '0.1mm', description: 'Maximum detail and smoothness' },
    ];

    const calculatePrice = () => {
        const baseMaterialCost = { PLA: 5000, ABS: 7000, PETG: 8500 }[config.material] || 5000;
        const qualityMultiplier = { Draft: 1.0, Standard: 1.3, 'High Detail': 1.6 }[config.quality] || 1.0;
        const supportCost = config.supportGeneration ? 2000 : 0;
        const infillMultiplier = 1 + (config.infillPercentage / 100) * 0.5;

        const unitPrice = baseMaterialCost * qualityMultiplier * infillMultiplier + supportCost;
        const subtotal = unitPrice * config.quantity;

        // Delivery cost is calculated at checkout/cart, here we calculate item cost
        return {
            unitPrice: Math.round(unitPrice),
            subtotal: Math.round(subtotal),
            deliveryCost: 0, // Placeholder
            total: Math.round(subtotal), // Item total
        };
    };

    const handleApply = () => {
        const pricing = calculatePrice();
        onAddToCart({ ...config, mirroring }, pricing);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Configure Print: {file.name}</h2>
                        {remainingFiles > 0 && (
                            <p className="text-sm text-gray-600 mt-1">
                                {remainingFiles} more {remainingFiles === 1 ? 'file' : 'files'} to configure after this
                            </p>
                        )}
                    </div>
                    <Button variant="secondary" onClick={onCancel} size="sm">Close</Button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <IconCube className="mr-2 h-6 w-6 text-blue-600" />
                                Model Preview
                            </h3>
                            <STLViewer
                                fileData={file.data}
                                mirrorX={mirroring.mirrorX}
                                mirrorY={mirroring.mirrorY}
                                mirrorZ={mirroring.mirrorZ}
                            />
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Mirroring</h4>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" checked={mirroring.mirrorX} onChange={e => setMirroring({ ...mirroring, mirrorX: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-600">X-Axis</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" checked={mirroring.mirrorY} onChange={e => setMirroring({ ...mirroring, mirrorY: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-600">Y-Axis</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" checked={mirroring.mirrorZ} onChange={e => setMirroring({ ...mirroring, mirrorZ: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-600">Z-Axis</span>
                                    </label>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quantity</h3>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={config.quantity}
                                onChange={(e) => setConfig({ ...config, quantity: parseInt(e.target.value) || 1 })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
                            />
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <IconSettings className="mr-2 h-6 w-6 text-blue-600" />
                                Material
                            </h3>
                            <div className="space-y-3">
                                {materials.map((material) => (
                                    <label
                                        key={material.name}
                                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${config.material === material.name
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                name="material"
                                                value={material.name}
                                                checked={config.material === material.name}
                                                onChange={(e) => setConfig({ ...config, material: e.target.value })}
                                                className="w-5 h-5 text-blue-600"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{material.name}</p>
                                                <p className="text-sm text-gray-600">{material.description}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-blue-600">₵{material.price.toLocaleString()}/unit</p>
                                    </label>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <IconPalette className="mr-2 h-6 w-6 text-blue-600" />
                                Color
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {colors.map((color) => (
                                    <label
                                        key={color}
                                        className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${config.color === color
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="color"
                                            value={color}
                                            checked={config.color === color}
                                            onChange={(e) => setConfig({ ...config, color: e.target.value })}
                                            className="hidden"
                                        />
                                        <div
                                            className="w-6 h-6 rounded-full mx-auto mb-2 border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        ></div>
                                        <p className="text-sm font-medium text-gray-900">{color}</p>
                                    </label>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Print Quality</h3>
                            <div className="space-y-3">
                                {qualities.map((quality) => (
                                    <label
                                        key={quality.name}
                                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${config.quality === quality.name
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                name="quality"
                                                value={quality.name}
                                                checked={config.quality === quality.name}
                                                onChange={(e) => setConfig({ ...config, quality: e.target.value })}
                                                className="w-5 h-5 text-blue-600"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{quality.name}</p>
                                                <p className="text-sm text-gray-600">{quality.description}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">{quality.layerHeight}</p>
                                    </label>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced</h3>
                            <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-all">
                                <div>
                                    <p className="font-semibold text-gray-900">Support Generation</p>
                                    <p className="text-sm text-gray-600">Add supports</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={config.supportGeneration}
                                    onChange={(e) => setConfig({ ...config, supportGeneration: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded"
                                />
                            </label>

                            <div className="mt-4">
                                <label className="block font-semibold text-gray-900 mb-2">
                                    Infill: {config.infillPercentage}%
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="5"
                                    value={config.infillPercentage}
                                    onChange={(e) => setConfig({ ...config, infillPercentage: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </Card>

                        <div className="flex justify-between pt-4">
                            <div className="text-lg font-bold text-gray-900">
                                Est. Unit Cost: <span className="text-primary">₵{calculatePrice().unitPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex space-x-4">
                                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                                <Button onClick={handleApply}>
                                    {remainingFiles > 0 ? 'Add & Configure Next' : 'Add to Cart'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
