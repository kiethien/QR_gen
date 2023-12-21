"use client";
import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

//import styles
import "./styles.css";
const QRPersonalGenerator = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const[Address, setAddress] = useState('');
    const[Website, setWebsite] = useState('');
    const[Position, setPosition] = useState('');
    const[Company, setCompany] = useState('');

    const [qrImageUrl, setQrImageUrl] = useState('');

    const generateQr = async () => {
        try {
          // Send the link to the backend for QR code generation
          const response = await axios.post('http://localhost:5000/personal_qr_code', {
            name: Name,
            email: Email,
            phone: Phone,
            address: Address,
            website: Website,
            position: Position,
            company: Company,
          });
    
          // Assuming the backend responds with the generated QR code URL
          setQrImageUrl(response.data.qrImageUrl);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      };
      
  return (
    <>
      <Head>
        <title>QR Personal Generator</title>
        <meta name="description" content="Generate QR code for a personal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='header'>
        <h1>QR Personal Generator</h1>
      </div>

      <div className='container'>
        
        <div className="input-group">
          <input
            type="text"
            className="input"
            id="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="Name" className="user-label">
            Name
          </label>
        </div>
      
        <div className="input-group">
          <input
            type="text"
            className="input"
            id="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="Email" className="user-label">
            Email
          </label>
        </div>

        
        <div className="input-group">
          <input
            type="text"
            className="input"
            id="Phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor="Phone" className="user-label">
            Phone
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="input"
            id="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="Address" className="user-label">
            Address
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="input"
            id="Website"
            value={Website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
          <label htmlFor="Website" className="user-label">
            Website
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="input"
            id="Position"
            value={Position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <label htmlFor="Position" className="user-label">
            Position
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="input"
            id="Company"
            value={Company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <label htmlFor="Company" className="user-label">
            Company
          </label>
        </div>
      </div>
      <div className='button'>
        <button className='button1' onClick={generateQr}>Generate QR</button>
      </div>
        {qrImageUrl && <img src={qrImageUrl} alt="Generated QR Code" />}
    </>
  );
};

export default QRPersonalGenerator;

