"use client";

// Import necessary modules and styles
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Import styles
import "./styles.css";

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
    router.push(`/qr_${type.toLowerCase()}`);
    handleTypeSelection(type);
  };

  return (
    <main>
      {/* Container for the page title */}
      <div className="header">
        <h1>Select The QR code</h1>
      </div>

      {/* Container for QR code type buttons */}
      <div className="container">
        {/* Button to navigate to QR Link page */}
        <button className="button1" onClick={() => navigateToQRType("Link")}>
          Link
        </button>

        {/* Button to navigate to QR Text page */}
        <button className="button1" onClick={() => navigateToQRType("Text")}>
          Text
        </button>

        {/* Button to navigate to QR Personal page */}
        <button className="button1" onClick={() => navigateToQRType("Personal")}>
          Personal
        </button>

        {/* Button to navigate to QR List page */}
        <button className="button1" onClick={() => navigateToQRType("List")}>
          List
        </button>
        
      </div>

      {/* Display the selected QR code type */}
      {selectedType && (
        <div className="container">
          <h2>You've selected {selectedType} QR code</h2>
          {/* Additional content or QR code scanning component can be added here */}
        </div>
      )}
    </main>
  );
}

export default QRScanner;
