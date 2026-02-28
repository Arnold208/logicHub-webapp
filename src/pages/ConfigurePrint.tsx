import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { STLViewer } from '../components/3d/STLViewer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { IconCube, IconPalette, IconSettings, IconCheck } from '@tabler/icons-react';

export const ConfigurePrint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, mirroring } = location.state || {};

  const [config, setConfig] = useState({
    quantity: 1,
    material: 'PLA',
    color: 'White',
    quality: 'Standard',
    nozzleSize: '0.4mm',
    supportGeneration: false,
    infillPercentage: 20,
  });

  if (!file) {
    navigate('/upload');
    return null;
  }

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
  // We use the file size as a very rough proxy for model complexity/volume since we don't slice in browser.
  // Assuming 1MB STL ~ 15cm3 of solid volume as a massive over-generalization. 
  // A real app would parse the STL volume using Three.js here.
  const baseVolumeCm3 = Math.max((file.size / (1024 * 1024)) * 15, 10);

  // Calculate solid volume based on infill
  // 100% infill = base volume * 1. 20% infill = base volume * (0.2 + 0.1 for walls)
  const effectiveVolumeCm3 = baseVolumeCm3 * (0.1 + (config.infillPercentage / 100) * 0.9);

  const selectedMaterial = materials.find(m => m.name === config.material) || materials[0];
  const selectedQuality = qualities.find(q => q.name === config.quality) || qualities[1];

  // Weight = Volume * Density
  const estimatedWeightGrams = effectiveVolumeCm3 * selectedMaterial.density;

  // Bambu Lab X1 Carbon / Snapmaker Artisan speed heuristics
  // Assume average 15 cm3/hr for standard settings on these fast printers
  const selectedNozzle = nozzleSizes.find(n => n.size === config.nozzleSize) || nozzleSizes[1];
  let estimatedTimeHours = (effectiveVolumeCm3 / 15) * selectedQuality.multiplier * selectedNozzle.timeMultiplier;

  // Add support time penalty if checked
  if (config.supportGeneration) {
    estimatedTimeHours *= 1.3;
  }

  // Cost Variables from Spreadsheet
  const exchangeRate = 12; // USD to GHS
  const workmanshipGhs = 50;
  const powerCostPerKwh = 2.5; // GHS
  const printerAvgKw = 0.25; // 250W average for Bambu/Artisan

  const filamentCostUsd = (estimatedWeightGrams / 1000) * selectedMaterial.priceUsd;
  const filamentCostGhs = filamentCostUsd * exchangeRate;

  const powerCostGhsFixed = printerAvgKw * estimatedTimeHours * powerCostPerKwh;

  // Total Unit Cost
  const totalUnitCostGhs = workmanshipGhs + filamentCostGhs + powerCostGhsFixed;
  const finalCostGhs = totalUnitCostGhs * config.quantity;

  const handleProceed = () => {
    navigate('/quote', {
      state: {
        file,
        mirroring,
        config,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-teal-600 to-teal-800 py-12 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Configure Print Settings</h1>
          <p className="text-gray-100 text-sm lg:text-base">Customize your print to meet your exact requirements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
          {/* Sticky Preview Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-[400px] lg:h-[calc(100vh-8rem)] flex flex-col">
            <Card className="flex-1 flex flex-col p-4 shadow-xl border-0">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <IconCube className="mr-2 h-6 w-6 text-primary" />
                Model Preview
              </h3>
              <div className="flex-1 min-h-0 relative mb-4">
                <STLViewer
                  key={config.color}
                  fileData={file.data}
                  mirrorX={mirroring?.mirrorX}
                  mirrorY={mirroring?.mirrorY}
                  mirrorZ={mirroring?.mirrorZ}
                  color={config.color}
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100/50"
                />
              </div>
              <div className="p-4 bg-gray-50 rounded-xl shrink-0 border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">File:</span> {file.name}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Est. Volume:</span> {effectiveVolumeCm3.toFixed(1)} cm³
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Scrollable Configuration Column */}
          <div className="lg:w-7/12 overflow-y-auto pr-2 pb-12 custom-scrollbar">
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
                  {materials.map((material) => {
                    // Calculate specific estimated price roughly for this material selection
                    const matWeightGrams = effectiveVolumeCm3 * material.density;
                    const matFilamentCostUsd = (matWeightGrams / 1000) * material.priceUsd;
                    const matFilamentCostGhs = matFilamentCostUsd * exchangeRate;
                    const matTotalUnitCostGhs = workmanshipGhs + matFilamentCostGhs + powerCostGhsFixed;

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
                          <p className="font-bold text-blue-600">GHS {matTotalUnitCostGhs.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">est. total (1x)</p>
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
                        className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                        style={{
                          backgroundColor: color.toLowerCase(),
                        }}
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900">Support Generation</p>
                      <p className="text-sm text-gray-600">Add support structures for overhangs and complex geometry</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.supportGeneration}
                      onChange={(e) => setConfig({ ...config, supportGeneration: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Disclaimer:</strong> If you proceed without selecting support generation and our engineers determine supports are necessary for a successful print, your order will be placed on hold and you will be invoiced for the additional support material required.
                    </p>
                  </div>

                  <div className="mt-6">
                    <label className="block font-semibold text-gray-900 mb-2">
                      Infill Percentage: {config.infillPercentage}%
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
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Lightweight</span>
                      <span>Balanced</span>
                      <span>Solid</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg">
                    <IconCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Our pricing utilizes advanced heuristics factoring in Bambu Lab X1C / Snapmaker Artisan print speeds, local power costs (GHS {powerCostPerKwh.toFixed(1)}/kWh), and precise material density.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0">
                <h3 className="text-lg font-bold mb-4 text-gray-200">Estimated Quote</h3>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Est. Material ({estimatedWeightGrams.toFixed(1)}g)</span>
                    <span>GHS {filamentCostGhs.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Est. Time ({estimatedTimeHours.toFixed(1)} hrs)</span>
                    <span>GHS {powerCostGhsFixed.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Workmanship (Setup Base)</span>
                    <span>GHS {workmanshipGhs.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 my-2 pt-2 flex justify-between text-sm font-semibold text-gray-300">
                    <span>Unit Price</span>
                    <span>GHS {totalUnitCostGhs.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-gray-700 pt-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Estimated Cost</p>
                    <p className="text-xs text-gray-500">Subject to final slicing software review.</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-400">GHS {finalCostGhs.toFixed(2)}</p>
                </div>
              </Card>

            </div>

          </div>

          <div className="flex justify-between mt-8 sticky bottom-4 bg-white/90 backdrop-blur-md p-4 border border-gray-200 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-10 w-full">
            <Button variant="outline" onClick={() => navigate('/upload')}>
              Back to Upload
            </Button>
            <Button size="lg" onClick={handleProceed} className="px-8 shadow-lg shadow-blue-500/30">
              Proceed to Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
