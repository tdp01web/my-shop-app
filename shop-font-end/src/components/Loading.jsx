import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import animationData from "../animation/loading.json";
const Loader = () => {
  return (
    <div className="w-full  flex justify-center items-center flex-col">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 260, height: 260 }}
      />
      <p>Đang tải...</p>
    </div>
  );
};

export default Loader;
