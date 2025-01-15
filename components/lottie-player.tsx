'use client'

import React from 'react';
import animationData from "@/animations/base.json"
import { useLottie } from "lottie-react";

interface LottiePlayerProps {
  name?: string;
  loop?: boolean;
  autoplay?: boolean;
  width?: string;
  height?: string;
  animationData?: any
}

const LottiePlayer = ({ name, loop = true, autoplay = true, width = '200px', height = '200px', animationData: customAnimationData = animationData }: LottiePlayerProps) => {
  const options = {
    animationData: customAnimationData,
    loop: loop,
    autoplay: autoplay,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const { View } = useLottie(options);

  return (
    <div style={{ width: 200, height: 200, alignSelf: 'center' }}>
      {View}
    </div>
  );
};

export default LottiePlayer;

