'use client'

import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';

interface LottiePlayerProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  width?: string;
  height?: string;
  fullScreen?: boolean; // New prop to enable full-screen
}

const LottiePlayer = ({ 
  animationData, 
  loop = true, 
  autoplay = true, 
  width = '200px', 
  height = '200px', 
  fullScreen = false 
}: LottiePlayerProps) => {
  const options = {
    animationData,
    loop,
    autoplay,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const scale = 2

  const { View } = useLottie(options);

  const style = fullScreen
    ? { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 50 ,   transform: `scale(${scale})`, // Apply scaling
        transformOrigin: 'top'}
    : { width, height };

  return <div id="animation-lottie" style={style}>{View}</div>;
};

export default LottiePlayer;
