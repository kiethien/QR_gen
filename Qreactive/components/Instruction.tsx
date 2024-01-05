import React from 'react';
import home from '../app/home.module.css';

const Instruction = () => {
  return (
    <section className='fflexCentlex-col er overflow-hidden py-24 '>
      <img style={{
        margin: '0 auto',
          
        }}  src="instruction.svg" alt="Instruction" />
      <div
      className='max-container padding-container gap-20 py-10 md:gap-28 lg:py-20 xl:flex-row pb-32'
  style={{
    width: '1000px',
    height: '270px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '50%',
  }}
>
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(120, 48, 46, 0.4)', 
      filter: 'blur(60px)', 
      borderRadius: '50%',
    }}
  ></div>
  <p
    className='text-base lg:text-lg xl:text-xl md:text-sm sm:text-xs'
    style={{
      display: 'flex',
      fontSize: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '0',
      color: 'rgba(120, 48, 46, 1)',
      flexWrap: 'wrap'
    }}
  >
    Create QR code in 3 steps
  </p>
</div>
      <div className={home.Container}>
        <div className={home.Rectangle}>
          <img src="choose.png" alt="Choose" />
            <div className={home.Rectangle2}>
              <p className = {home.rec2text}>Step 1:</p>
            </div>
            <p className = {home.rectext}>Choose the type</p>
        </div>

      
        <div className={home.Rectangle}>
          <img src="generate.png" alt="Generate" />
            <div className={home.Rectangle2}>
              <p className = {home.rec2text}>Step 2:</p>
            </div>
            <p className = {home.rectext}>Generate QR code</p>
        </div>

       
        <div className={home.Rectangle}>
          <img src="download.png" alt="Save" />
            <div className={home.Rectangle2}> 
              <p className = {home.rec2text}>Step 3:</p>
            </div>
            <p className = {home.rectext}>Customize and download</p>
        </div>
      </div>
    </section>
  );
};

export default Instruction;
