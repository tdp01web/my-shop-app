// src/component/LottieAnimation.js
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../../../../../public/animation/Animation.json";

const LottieAnimation = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 70, height: 70 }}
    />
  );
};

export default LottieAnimation;
