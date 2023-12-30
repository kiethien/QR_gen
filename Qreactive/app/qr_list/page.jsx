"use client";
// pages/qrList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const QRList = () => {
  const [qrCodes, setQRCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/qrList/list');
        setQRCodes(response.data.qrCodes);
        setLoading(false); // Set loading to false once data is fetched

        console.log(response.data.qrCodes);
      } catch (error) {
        console.error('Error fetching QR codes:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchQRCodes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.get(`http://localhost:5000/profile/delete/${id}`);
      //refresh the page
      const updatedQRCodes = qrCodes.filter((code) => code._id !== id);
      setQRCodes(updatedQRCodes);
    }
    catch (error) {
      console.error(`Error deleting QR code with id ${id}:`, error);
    }
  }


  const handleEdit = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/edit/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  const handleEditLink = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/qr_link/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  const handleEditText = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/qr_text/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }




      

  return (
    <div>
      <h1>QR List</h1>
      {loading ? (
        <p>Loading QR codes...</p>
      ) : (
        <ul>
          {qrCodes.map((code, index) => (
            <li key={index}>
              <p>Name: {code.name}</p>
              <p>Type: {code.type}</p>
              
              <img src={code.QRcode} alt={code.name} />
              <button onClick={() => {
                if (code.type === "link" ){
                  handleEditLink(code._id);
                } else if (code.type === "personal"){
                  handleEdit(code._id);
                }
                else if (code.type === "text"){
                  handleEditText(code._id);
                }
                }}>Edit</button> 
              <button onClick={() => handleDelete(code._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default QRList;
