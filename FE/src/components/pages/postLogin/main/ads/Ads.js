import patopoker from './images/patopokers.webp';
import { useAuth } from '../../../../auth/authcontext/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import './ads.css';

function Ads() {
  const { darkMode } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      handleImageLoad();
    }
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`panel-side-box ${darkMode && 'darkmode-on'}`}>
      <h2 className='panel-header'>
        Twoja <span className='span-brand'>Reklama</span>
      </h2>
      <div className={`adding-box ${imageLoaded ? 'image-loaded' : ''}`}>
        <img
          className='patopoker'
          src={patopoker}
          alt='Pato Poker Game'
          onLoad={handleImageLoad}
          ref={imageRef}
        />
      </div>
    </div>
  );
}

export default Ads;
