"use client";
// Assuming this code is in app/personalData/page.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useQueryClient, QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PersonalQRForm />
    </QueryClientProvider>
  )
}

export async function handler(req, res) {
  try {
    const response = await axios.post('http://localhost:5000/personalQR/generate', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const PersonalQRForm = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ properties: [] });
  const [qrImageUrl, setQrImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/personalDataQR/generate', formData);

      // Invalidate and refetch the data to update the UI
      queryClient.invalidateQueries('personalQR');
      setQrImageUrl(response.data.qrImageUrl);
      console.log('QR Code Image URL:', response.data.qrImageUrl);
    } catch (error) {
      console.error('Error generating Personal QR:', error);
    }
  };

  const handlePropertyChange = (index, key, value) => {
    const newProperties = [...formData.properties];
    newProperties[index] = { key, value };
    setFormData({ ...formData, properties: newProperties });
    
    console.log(newProperties);
  };

  const addProperty = () => {
    setFormData({
      ...formData,
      properties: [...formData.properties, { key: '', value: '' }],
    });
  };

  const removeProperty = (index) => {
    const newProperties = [...formData.properties];
    newProperties.splice(index, 1);
    setFormData({ ...formData, properties: newProperties });
  };

  return (
    <>
    <div>
      <h1>Generate Personal QR</h1>
      <form onSubmit={handleSubmit}>
        {formData.properties.map((property, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Key"
              value={property.key}
              onChange={(e) => handlePropertyChange(index, e.target.value, property.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={property.value}
              onChange={(e) => handlePropertyChange(index, property.key, e.target.value)}
            />
            <button type="button" onClick={() => removeProperty(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addProperty}>
          Add Property
        </button>
        <button type="submit">Generate QR</button>
      </form>

    </div>
    <div>
      <h1></h1>
    {qrImageUrl && <img src={qrImageUrl} alt="Generated QR Code" />}
    </div>
    </>
  );
};

export {PersonalQRForm};
