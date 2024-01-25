// Importing necessary modules

"use client";

import Head from 'next/head';
import React, {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

// Importing styles
import styles from './styles.module.css';

const QRPersonalGenerator = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [Website, setWebsite] = useState('');
  const [Position, setPosition] = useState('');
  const [Company, setCompany] = useState('');

  const [qrImageUrl, setQrImageUrl] = useState('');
  // Router instance
  const router = useRouter();


  // State to track the selected QR code type
  const [selectedType, setSelectedType] = useState(null);

  // Function to handle type selection
  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  // Function to navigate to a specific QR code type page
  const navigateToQRType = (type) => {
    router.push(`${type}`);
    handleTypeSelection(type);
  };

  const generateQr = async () => {
    try {
      // Send the link to the backend for QR code generation
      const response = await axios.post('http://localhost:5000/personalQR/generate', {
        name: Name,
        email: Email,

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
          <meta name="description" content="Generate QR code for a personal"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <div className={styles.header}>
          {/* Back button */}
          <button className={styles.backButton} onClick={() => router.back()}>
            <img src="/returnBack.png" alt="return Icon" className={styles.icon}/>

            Back
          </button>
          <div className={styles.headerContent}>
            <h1>Select type of QR code</h1>
          </div>
        </div>
        <div className={styles.container}>
          <div className="flex-row ">
            <button className={styles.button2} onClick={() => navigateToQRType("qr_link")}>

              <img src="/link.png" alt="Link Icon" className={styles.icon}/>
              Link
            </button>

            {/* Button to navigate to QR Text page */}
            <button className={styles.button2} onClick={() => navigateToQRType("qr_text")}>
              <img src="/text.png" alt="Text Icon" className={styles.icon}/>

              Text
            </button>

            {/* Button to navigate to QR Personal page */}
            <button className={styles.button2} onClick={() => navigateToQRType("qr_personal")}>
              <img src="/vcard.png" alt="Vcard Icon" className={styles.icon}/>

              Vcard
            </button>

            {/* Button to navigate to QR Personal Data */}
            <button className={styles.button2} onClick={() => navigateToQRType("personalData")}>
              <img src="/person.png" alt="Person Icon" className={styles.icon}/>

              Custom
            </button>

            {/* Button to navigate to QR List page */}
            <button className={styles.button2} onClick={() => navigateToQRType("qr_wifi")}>
              <img src="/wifi.png" alt="Wifi Icon" className={styles.icon}/>

              Wifi
            </button>
            <button className={styles.button2} onClick={() => navigateToQRType("qr_email")}>
              <img src="/mail.png" alt="Mail Icon" className={styles.icon}/>

              Email
            </button>
          </div>
          <div className="w-3/4 border-0 border-r-4 flex flex-col items-center bg-white">

            <div className="flex flex-row ml-16">
              {/* First input field */}
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
                  Type of information
                </label>
              </div>
              <div style={{margin: '0 10px'}}></div>

              {/* Second input field */}
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
                  Information
                </label>
                {/* Remove button */}
                <button className={styles.button2}>
                  Remove
                </button>
              </div>
            </div>
            {/* Add button */}
            <div className="mr-16">
              <button className={styles.button2}>
                Add
              </button>
            </div>


            {/* Generate QR button */}
            <div className="mr-16">
              <div className={styles.button}>
                <button className={styles.button1} onClick={generateQr}>
                  Generate QR
                </button>
              </div>

              {/* Display generated QR code */}
              {qrImageUrl && <img src={qrImageUrl} alt="Generated QR Code"/>}
            </div>
          </div>


        </div>
      </>
  );
};

export default QRPersonalGenerator;