"use client";

import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
const QRLinkGenerator = () => {
  const [qrText, setQrText] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');

  const generateQr = async () => {
    try {
      // Send the link to the backend for QR code generation
      const response = await axios.post('http://localhost:5000/text/generate', {
        text: qrText,
      });

      // Assuming the backend responds with the generated QR code URL
      setQrImageUrl(response.data.qrImageUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

    return (
        <>
        <Head>
            <title>QR Text Generator</title>
            <meta name="description" content="Generate QR code for a text" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.header}>
            <h1>QR Text Generator</h1>
        </div>
    
        <div className={styles.container}>
          <div className={styles.input_group}>
            <input
              type="text"
              className={styles.input}
              id="Text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              required
            />
            <label htmlFor="Text" className={styles.user_label}>
              Text
            </label>
        </div>
        
        <div className={styles.button}>
            <button className={styles.button1} onClick={generateQr}>Generate QR</button>
            <br />
        </div>
            <div>Text: {qrText}</div>
            {qrImageUrl && <img src={qrImageUrl} alt="Generated QR Code" />}
        </div>
        </>
    );
}

export default QRLinkGenerator;
    