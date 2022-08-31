import React, { useEffect } from 'react';

import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    body.style.backgroundColor = '#000';
    return () => {
      body.removeAttribute('style');
    };
  });
  return (
    <>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
      <div className='firefly'></div>
    </>
  );
};

export default BackgroundAnimation;
