"use client";

// Import necessary modules and styles
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import axios from "axios";

// Main QRScanner component
function QRScanner() {
  
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

  const logout = async() => {
    await axios.get("http://localhost:5000/logout");
    //clear cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  return (
    <main>
      {/* Container for the page title */}
      <div className={styles.header}>
        <h1>Select The QR code</h1>
      </div>

      {/* Container for QR code type buttons */}
      <div className={styles.container}>
        {/* Button to navigate to QR Link page */}
        <button className={styles.button1} onClick={() => navigateToQRType("qr_link")}>
          Link
        </button>

        {/* Button to navigate to QR Text page */}
        <button className={styles.button1} onClick={() => navigateToQRType("qr_text")}>
          Text
        </button>

        {/* Button to navigate to QR Personal page */}
        <button className={styles.button1} onClick={() => navigateToQRType("qr_personal")}>
          Personal
        </button>

        {/* Button to navigate to QR Personal Data */}
        <button className={styles.button1} onClick={() => navigateToQRType("personalData")}>
          Personal Data
        </button>

        {/* Button to navigate to QR List page */}
        <button className={styles.button1} onClick={() => navigateToQRType("qr_list")}>
          List
        </button>

        {/* Button to log out */}
        <button className={styles.button1} onClick={() => logout()}>
          Logout
        </button>
        
      </div>

      {/* Display the selected QR code type */}
      {selectedType && (
        <div className={styles.container}>
          <h2>You've selected {selectedType} QR code</h2>
          {/* Additional content or QR code scanning component can be added here */}
        </div>
      )}
    </main>
  );
}

export default QRScanner;
