"use client";
import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

//import styles
import styles from "./styles.module.css";
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
          const response = await axios.post('http://localhost:5000/personalQR/generate', {
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

      <div className={styles.header}>
        <h1>QR Personal Generator</h1>
      </div>

      <div className={styles.container}>
        
        <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="Name" className={styles.user_label}>
            Name
          </label>
        </div>
      
        <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="Email" className={styles.user_label}>
            Email
          </label>
        </div>

        
        <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor="Phone" className={styles.user_label}>
            Phone
          </label>
        </div>

        <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="Address" className={styles.user_label}>
            Address
          </label>
        </div>

        <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Website"
            value={Website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
          <label htmlFor="Website" className={styles.user_label}>
            Website
          </label>
        </div>

        <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Position"
            value={Position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <label htmlFor="Position" className={styles.user_label}>
            Position
          </label>
        </div>

        <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Company"
            value={Company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <label htmlFor="Company" className={styles.user_label}>
            Company
          </label>
        </div>
      </div>
      <div className={styles.button}>
        <button className={styles.button1} onClick={generateQr}>Generate QR</button>
      </div>
        {qrImageUrl && <img src={qrImageUrl} alt="Generated QR Code" />}
    </>
  );
};

export default QRPersonalGenerator;

