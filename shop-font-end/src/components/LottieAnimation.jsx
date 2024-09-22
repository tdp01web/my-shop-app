import React from "react";
import Lottie from "lottie-react";
import animationData from "../animation/truck.json";

const LottieAnimationTruck = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 60, height: 60 }}
    />
  );
};

export default LottieAnimationTruck;
