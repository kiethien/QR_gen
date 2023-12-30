"use client";

import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";


const QRLinkGenerator = () => {
  const [qrLink, setQrLink] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');

  const generateQr = async () => {
    try {
      // Send the link to the backend for QR code generation
      const response = await axios.post('http://localhost:5000/link/generate', {
        link: qrLink,
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
        <title>QR Link Generator</title>
        <meta name="description" content="Generate QR code for a link" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <h1>QR Link Generator</h1>
      </div>
      <div className={styles.container}>
      <div className={styles.input_group}>
          <input
            type="text"
            className={styles.input}
            id="Link"
            value={qrLink}
            onChange={(e) => setQrLink(e.target.value)}
            required
          />
          <label htmlFor="Link" className={styles.user_label}>
            Link
          </label>
        </div>
        <button className={styles.button1} onClick={generateQr}>Generate QR</button>
        <br />
        <div>Link: {qrLink}</div>
        {qrImageUrl && <img src={qrImageUrl} alt="Generated QR Code" />}
      </div>
    </>
  );
};

export default QRLinkGenerator;
