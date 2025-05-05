"use client";

import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

export default function TestUpload() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString().substring(11, 19)} - ${message}`]);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Reset states
      setError('');
      setImageUrl(null);
      setLoading(true);
      addLog(`Selected file: ${file.name} (${file.type}, ${Math.round(file.size / 1024)}KB)`);
      
      // Check file size - limit to 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('Image is too large. Maximum size is 5MB.');
        setLoading(false);
        return;
      }
      
      // Show the local preview first
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          try {
            // Set the local preview
            const base64Image = e.target.result as string;
            setImagePreview(base64Image);
            addLog(`File read as base64, length: ${base64Image.length} chars`);
            
            // Try all methods one by one
            
            // 1. First try the test endpoint
            addLog('Attempting upload via test-upload endpoint...');
            try {
              const testResponse = await fetch('/api/test-upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Image }),
              });
              
              const testData = await testResponse.json();
              
              if (testResponse.ok) {
                addLog(`✅ Success with test-upload: ${testData.url}`);
                setImageUrl(testData.url);
                setLoading(false);
                return;
              } else {
                addLog(`❌ Failed with test-upload: ${testData.error}`);
              }
            } catch (testError) {
              addLog(`❌ Exception with test-upload: ${testError instanceof Error ? testError.message : 'Unknown error'}`);
            }
            
            // 2. Try the original upload endpoint with explicit folder
            addLog('Attempting upload via regular upload endpoint with explicit folder...');
            try {
              const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  image: base64Image,
                  folder: 'subcategories'
                }),
              });
              
              const uploadData = await uploadResponse.json();
              
              if (uploadResponse.ok) {
                addLog(`✅ Success with upload endpoint: ${uploadData.url}`);
                setImageUrl(uploadData.url);
                setLoading(false);
                return;
              } else {
                addLog(`❌ Failed with upload endpoint: ${uploadData.error}`);
              }
            } catch (uploadError) {
              addLog(`❌ Exception with upload endpoint: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
            }
            
            // 3. Try manual base64 formatting
            addLog('Attempting with explicit base64 format...');
            try {
              // Extract just the base64 data without the prefix
              let pureBase64 = base64Image;
              if (base64Image.includes('base64,')) {
                pureBase64 = base64Image.split('base64,')[1];
                addLog('Extracted pure base64 data');
              }
              
              const manualResponse = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  image: `data:image/jpeg;base64,${pureBase64}`,
                  folder: 'subcategories'
                }),
              });
              
              const manualData = await manualResponse.json();
              
              if (manualResponse.ok) {
                addLog(`✅ Success with manual formatting: ${manualData.url}`);
                setImageUrl(manualData.url);
              } else {
                addLog(`❌ Failed with manual formatting: ${manualData.error}`);
                throw new Error(manualData.error);
              }
            } catch (manualError) {
              addLog(`❌ All methods failed. Last error: ${manualError instanceof Error ? manualError.message : 'Unknown error'}`);
              setError('Failed to upload image after multiple attempts. Check console for details.');
            }
            
          } catch (error) {
            addLog(`❌ Fatal error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setError(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
          } finally {
            setLoading(false);
          }
        }
      };
      
      reader.onerror = () => {
        setError('Error reading file. Please try again.');
        setLoading(false);
        addLog('❌ Error reading file');
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Test Subcategory Image Upload</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Upload Test</h2>
          <div className="flex items-center space-x-4">
            {imagePreview && (
              <div className="w-24 h-24 rounded border overflow-hidden flex items-center justify-center bg-gray-100">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="flex-grow">
              <label className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <FiUpload className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {loading ? 'Uploading...' : 'Upload image to subcategories folder'}
                </span>
                <input 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </label>
            </div>
          </div>
        </div>
        
        {imageUrl && (
          <div className="mb-4">
            <h3 className="font-medium text-sm mb-1">Upload Result:</h3>
            <div className="bg-green-50 p-3 rounded border border-green-200 break-all">
              <p className="text-xs">{imageUrl}</p>
            </div>
            <div className="mt-2">
              <img 
                src={imageUrl} 
                alt="Uploaded" 
                className="max-w-full h-auto max-h-40 object-contain border rounded"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-auto max-h-80">
        <h3 className="font-mono text-sm mb-2">Logs:</h3>
        <pre className="text-xs font-mono">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </pre>
      </div>
    </div>
  );
} 