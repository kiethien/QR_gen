import React from 'react';
import home from'../app/home.module.css';

const Selection = () => {
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" />
      <div className={home.buttonContainer}>
        <button className={home.button}><img src='Link.svg'></img><span>Link/URL</span></button>
        <button className={home.button}><img src='PDF.svg'></img><span>PDF</span></button>
        <button className={home.button}><img src='Text.svg'></img><span>Text</span></button>
        
        
      </div>
      <div className={home.buttonContainer}>
        
        <button className={home.button}><img src='Wifi.svg'></img><span>Wifi</span></button>
        <button className={home.button}><img src='Image.svg'></img><span>Image</span></button>
        <button className={home.button}><img src='Music.svg'></img><span>Music</span></button>
      </div>

      <div className='pb-40'/>
    </div>
  );
}

export default Selection;