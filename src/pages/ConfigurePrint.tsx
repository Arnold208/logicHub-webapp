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
    supportGeneration: false,
    infillPercentage: 20,
  });

  if (!file) {
    navigate('/upload');
    return null;
  }

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
    <div className="min-h-screen bg-gradient-to-br from-primary via-teal-600 to-teal-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Configure Print Settings</h1>
          <p className="text-gray-100 text-lg">Customize your print to meet your exact requirements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sticky Preview Column */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <IconCube className="mr-2 h-6 w-6 text-primary" />
                Model Preview
              </h3>
              <STLViewer
                fileData={file.data}
                mirrorX={mirroring?.mirrorX}
                mirrorY={mirroring?.mirrorY}
                mirrorZ={mirroring?.mirrorZ}
                color={config.color}
              />
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">File:</span> {file.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-all">
                  <div>
                    <p className="font-semibold text-gray-900">Support Generation</p>
                    <p className="text-sm text-gray-600">Add support structures for overhangs</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.supportGeneration}
                    onChange={(e) => setConfig({ ...config, supportGeneration: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                </label>

                <div>
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
              </div>
            </Card>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => navigate('/upload')}>
                Back to Upload
              </Button>
              <Button size="lg" onClick={handleProceed}>
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
