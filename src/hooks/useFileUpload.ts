import { useState } from 'react';
import { uploadFile, analyzeFile } from '../api/files';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileAnalysis, setFileAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const upload = async (file) => {
    setUploading(true);
    setError(null);
    try {
      const response = await uploadFile(file);
      setUploadedFile(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const analyze = async (fileData) => {
    setAnalyzing(true);
    setError(null);
    try {
      const response = await analyzeFile(fileData);
      setFileAnalysis(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setUploadedFile(null);
    setFileAnalysis(null);
    setError(null);
  };

  return {
    upload,
    analyze,
    reset,
    uploading,
    analyzing,
    uploadedFile,
    fileAnalysis,
    error,
  };
};
