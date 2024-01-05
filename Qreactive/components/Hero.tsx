import React from 'react';
import '../app/home.module.css';


const Hero = () => {
  return (
    <section className='flex-col flexCenter overflow-hidden py-24 '>
        <div className='layer-blur'></div>
          <div style={{display: 'flex'}} className='max-container padding-container gap-20 py-10 md:gap-28 lg:py-20 xl:flex-row pb-32 heroContainer'>
            <div className='text-center xl:text-left xl:w-[370px] xl:ml-auto xl:justify-start'
            style={{ marginTop: '110px',
                      textAlign: 'left'}} >
              <h1 style={{color: 'white'}} className='bold-40 lg:bold-70'>Create & Customize Your Dynamic QR code for <span style={{ color: 'rgba(120, 48, 46, 1)' }}>FREE</span> </h1>
                <p className='regular-16 mt-6 text-gray-30'>
                Easily generate, manage and statistically track your QR codes
                </p>
            </div>

        <img style={{
        marginLeft: '30px',
        width: '500px', 
        height: '500px',
        }}  src="QRillus.svg" alt="QR" />
        </div>
      
    </section>
  );
};

export default Hero;

/* Vector */
