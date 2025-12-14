import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropzone } from '@mantine/dropzone';
import { STLViewer } from '../components/3d/STLViewer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import { SuccessModal } from '../components/ui/SuccessModal';
import { IconUpload, IconCheck, IconSettings } from '@tabler/icons-react';
import { useCart } from '../context/CartContext';
import { PrintConfigurator } from '../components/print/PrintConfigurator';

interface UploadedFile {
  id: string;
  file: File;
  data: string | ArrayBuffer | null;
  configured: boolean;
}

export const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [configuringFile, setConfiguringFile] = useState<UploadedFile | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [totalConfigured, setTotalConfigured] = useState(0);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleDrop = (files: File[]) => {
    setLoading(true);
    const newFiles: UploadedFile[] = [];
    let processedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newFiles.push({
            id: Math.random().toString(36).substr(2, 9),
            file,
            data: e.target.result,
            configured: false,
          });
        }
        processedCount++;
        if (processedCount === files.length) {
          setUploadedFiles((prev) => [...prev, ...newFiles]);
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleConfigure = (uploadedFile: UploadedFile) => {
    setConfiguringFile(uploadedFile);
  };

  const handleAddToCart = (config: any, pricing: any) => {
    if (configuringFile) {
      addToCart({
        id: configuringFile.id,
        file: {
          name: configuringFile.file.name,
          size: configuringFile.file.size,
          data: configuringFile.data,
        },
        mirroring: config.mirroring,
        config: {
          quantity: config.quantity,
          material: config.material,
          color: config.color,
          quality: config.quality,
          supportGeneration: config.supportGeneration,
          infillPercentage: config.infillPercentage
        },
        pricing: pricing
      });

      // Mark as configured
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === configuringFile.id ? { ...f, configured: true } : f))
      );

      // Remove from uploaded files list
      removeFile(configuringFile.id);
      setConfiguringFile(null);
      setTotalConfigured((prev) => prev + 1);

      // Check if there are more files to configure
      const remainingFiles = uploadedFiles.filter(
        (f) => !f.configured && f.id !== configuringFile.id
      );

      if (remainingFiles.length === 0) {
        // All files configured - show success modal
        setShowSuccessModal(true);
      } else {
        // Auto-open next file configurator
        const nextFile = remainingFiles[0];
        setTimeout(() => {
          setConfiguringFile(nextFile);
        }, 300);
      }
    }
  };

  const unconfiguredCount = uploadedFiles.filter((f) => !f.configured).length;
  const configuredCount = totalConfigured;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-teal-600 to-teal-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your 3D Model</h1>
          <p className="text-gray-100 text-lg">
            Upload your STL, OBJ, or 3MF file to get started
          </p>
          {configuredCount > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <IconCheck className="h-5 w-5 text-white" />
              <span className="text-white font-medium">
                {configuredCount} {configuredCount === 1 ? 'item' : 'items'} in cart
              </span>
            </div>
          )}
        </div>

        <Card className="mb-8 hover:shadow-xl transition-shadow duration-300">
          <Dropzone
            onDrop={handleDrop}
            accept={['.stl', '.obj', '.3mf']}
            maxSize={50 * 1024 * 1024}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-primary hover:bg-gray-50 transition-all cursor-pointer"
          >
            <div className="text-center">
              <IconUpload className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Drop your 3D files here or click to browse
              </p>
              <p className="text-gray-500 mb-4">Supports STL, OBJ, and 3MF files up to 50MB</p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  .stl
                </span>
                <span className="flex items-center gap-1">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  .obj
                </span>
                <span className="flex items-center gap-1">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  .3mf
                </span>
              </div>
            </div>
          </Dropzone>
        </Card>

        {loading && (
          <div className="text-center py-8">
            <Loader text="Processing files..." />
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Uploaded Models</h2>
              {unconfiguredCount > 0 && (
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white font-medium">
                    {unconfiguredCount} to configure
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {uploadedFiles.map((file) => (
                <Card
                  key={file.id}
                  className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 shadow-inner">
                        <STLViewer fileData={file.data} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{file.file.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Size: {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {file.configured ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <IconCheck className="h-5 w-5" />
                            <span className="text-sm font-medium">Configured & Added to Cart</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-blue-600">
                            <IconSettings className="h-4 w-4 animate-spin" />
                            <span className="text-sm font-medium">Ready to configure</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 w-full md:w-auto">
                      <button
                        onClick={() => removeFile(file.id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        Remove
                      </button>
                      <Button
                        onClick={() => handleConfigure(file)}
                        className="flex items-center gap-2"
                      >
                        <IconSettings className="h-4 w-4" />
                        Configure Print
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {configuringFile && (
          <PrintConfigurator
            file={{
              name: configuringFile.file.name,
              size: configuringFile.file.size,
              data: configuringFile.data
            }}
            onCancel={() => setConfiguringFile(null)}
            onAddToCart={handleAddToCart}
            remainingFiles={unconfiguredCount - 1}
          />
        )}

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            setTotalConfigured(0);
          }}
          onViewCart={() => navigate('/cart')}
          itemsConfigured={configuredCount}
        />
      </div>
    </div>
  );
};
