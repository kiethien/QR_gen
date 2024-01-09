"use client";
import React from 'react';
import home from'../app/home.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Selection = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(null);
   // Function to handle selection
   
   const handleTypeSelection = (type) => {
    setSelectedType(type);
  };
  const navigateToQRType = (type) => {
    router.push(`${type.toLowerCase()}`);
    handleTypeSelection(type);
  };
  return (
    <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" />
    <div className={home.buttonContainer}>
      <button className={home.button} onClick={() => navigateToQRType("qr_Link")}><img src='Link.svg'></img><span>Link/URL</span></button>
      <button className={home.button}><img src='PDF.svg'></img><span>PDF</span></button>
      <button className={home.button} onClick={() => navigateToQRType("qr_text")}><img src='Text.svg'></img><span>Text</span></button>
      
      
    </div>
    <div className={home.buttonContainer}>
      
      <button className={home.button}><img src='Wifi.svg'></img><span>Wifi</span></button>
      <button className={home.button} onClick={() => navigateToQRType("qr_personal")}><img src='Image.svg'></img><span>vCard</span></button>
      <button className={home.button}><img src='Music.svg'></img><span>Music</span></button>
    </div>

    
    </div>

    
    

    
  );
}

export default Selection;