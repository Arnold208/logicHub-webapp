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
        nozzleSize: '0.4mm',
        supportGeneration: false,
        infillPercentage: 20,
    });

    const [mirroring, setMirroring] = useState({
        mirrorX: false,
        mirrorY: false,
        mirrorZ: false,
    });

    const materials = [
        { name: 'PLA', priceUsd: 25, density: 1.24, description: 'Best for prototypes and decorative items' },
        { name: 'ABS', priceUsd: 22, density: 1.04, description: 'Durable and heat-resistant' },
        { name: 'PETG', priceUsd: 25, density: 1.27, description: 'Strong, flexible, weather-resistant' },
        { name: 'TPU', priceUsd: 30, density: 1.21, description: 'Flexible and rubber-like' },
    ];

    const colors = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Gray'];

    const qualities = [
        { name: 'Draft', layerHeight: '0.28mm', multiplier: 0.6, description: 'Fast and economical' },
        { name: 'Standard', layerHeight: '0.20mm', multiplier: 1.0, description: 'Balanced quality and speed' },
        { name: 'High Detail', layerHeight: '0.12mm', multiplier: 1.8, description: 'Maximum detail and smoothness' },
    ];

    const nozzleSizes = [
        { size: '0.2mm', timeMultiplier: 2.5 },
        { size: '0.4mm', timeMultiplier: 1.0 },
        { size: '0.6mm', timeMultiplier: 0.6 },
        { size: '0.8mm', timeMultiplier: 0.4 },
    ];

    // Estimation Heuristics
    const fileSize = typeof file.size === 'number' ? file.size : 1024 * 1024;
    const baseVolumeCm3 = Math.max((fileSize / (1024 * 1024)) * 15, 10);
    const effectiveVolumeCm3 = baseVolumeCm3 * (0.1 + (config.infillPercentage / 100) * 0.9);

    const exchangeRate = 12; // USD to GHS
    const workmanshipGhs = 50;
    const powerCostPerKwh = 2.5; // GHS
    const printerAvgKw = 0.25; // 250W average for Bambu/Artisan

    const calculatePrice = () => {
        const selectedMaterial = materials.find(m => m.name === config.material) || materials[0];
        const selectedQuality = qualities.find(q => q.name === config.quality) || qualities[1];
        const selectedNozzle = nozzleSizes.find(n => n.size === config.nozzleSize) || nozzleSizes[1];

        const estimatedWeightGrams = effectiveVolumeCm3 * selectedMaterial.density;

        // Time
        let estimatedTimeHours = (effectiveVolumeCm3 / 15) * selectedQuality.multiplier * selectedNozzle.timeMultiplier;
        if (config.supportGeneration) {
            estimatedTimeHours *= 1.3;
        }

        // Cost
        const filamentCostUsd = (estimatedWeightGrams / 1000) * selectedMaterial.priceUsd;
        const filamentCostGhs = filamentCostUsd * exchangeRate;
        const powerCostGhsFixed = printerAvgKw * estimatedTimeHours * powerCostPerKwh;

        const unitPrice = workmanshipGhs + filamentCostGhs + powerCostGhsFixed;
        const subtotal = unitPrice * config.quantity;

        return {
            unitPrice: Math.round(unitPrice),
            subtotal: Math.round(subtotal),
            deliveryCost: 0,
            total: Math.round(subtotal),
            estimatedWeightGrams,
            estimatedTimeHours
        };
    };

    const handleApply = () => {
        const pricing = calculatePrice();
        onAddToCart({ ...config, mirroring }, pricing);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0 bg-white z-10 shadow-sm relative">
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

                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Left Sticky Preview */}
                    <div className="lg:w-5/12 p-6 border-r border-gray-100 overflow-y-auto flex flex-col bg-gray-50/50">
                        <Card className="flex-1 flex flex-col bg-white">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <IconCube className="mr-2 h-6 w-6 text-blue-600" />
                                Model Preview
                            </h3>
                            <div className="flex-1 min-h-[300px] lg:min-h-0 relative mb-4">
                                <STLViewer
                                    key={config.color}
                                    fileData={file.data}
                                    fileName={file.name}
                                    mirrorX={mirroring.mirrorX}
                                    mirrorY={mirroring.mirrorY}
                                    mirrorZ={mirroring.mirrorZ}
                                    color={config.color}
                                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50"
                                />
                            </div>
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
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

                    {/* Right Scrollable Configuration */}
                    <div className="lg:w-7/12 p-6 overflow-y-auto custom-scrollbar bg-white flex flex-col">
                        <div className="space-y-6 flex-1 pb-10">
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
                                    {materials.map((material) => {
                                        const matWeightGrams = effectiveVolumeCm3 * material.density;
                                        const matFilamentCostUsd = (matWeightGrams / 1000) * material.priceUsd;
                                        const matFilamentCostGhs = matFilamentCostUsd * exchangeRate;

                                        // Use a proxy unit cost to show scale
                                        const proxyCost = workmanshipGhs + matFilamentCostGhs + (printerAvgKw * 2 * powerCostPerKwh);

                                        return (
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
                                                <div className="text-right">
                                                    <p className="font-bold text-blue-600">₵{Math.round(proxyCost).toLocaleString()}</p>
                                                    <p className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded mt-1 font-medium inline-block">
                                                        based on {matWeightGrams.toFixed(1)}g
                                                    </p>
                                                </div>
                                            </label>
                                        );
                                    })}
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Nozzle Size</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {nozzleSizes.map((nozzle) => (
                                        <label
                                            key={nozzle.size}
                                            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${config.nozzleSize === nozzle.size
                                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-blue-300 text-gray-700'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="nozzleSize"
                                                value={nozzle.size}
                                                checked={config.nozzleSize === nozzle.size}
                                                onChange={(e) => setConfig({ ...config, nozzleSize: e.target.value })}
                                                className="hidden"
                                            />
                                            <span className="font-semibold">{nozzle.size}</span>
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

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mt-3 mb-4">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Disclaimer:</strong> If you proceed without selecting support generation and our engineers determine supports are necessary for a successful print, your order will be placed on hold and you will be invoiced for the additional support material required.
                                    </p>
                                </div>

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
                        </div>

                        {/* Sticky Footer */}
                        <div className="flex justify-between items-center pt-4 pb-2 border-t border-gray-100 mt-auto bg-white/95 sticky bottom-0 z-10 w-full backdrop-blur-sm">
                            <div className="text-lg font-bold text-gray-900 flex flex-col">
                                <span>Est. Unit Cost: <span className="text-blue-600 text-xl font-extrabold">₵{calculatePrice().unitPrice.toLocaleString()}</span></span>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant="outline" onClick={onCancel}>Cancel</Button>
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
