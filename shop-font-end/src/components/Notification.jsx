import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import animationData from "../animation/loading.json";
import { TypeAnimation } from "react-type-animation";

const NotificationWrapper = styled.div`
  width: 50%;
  background-color: white;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AnimationWrapper = styled.div`
  width: 260px;
  height: 260px;
`;

const TextWrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-top: 1rem;
`;

const Notification = () => {
  return (
    <NotificationWrapper>
      <AnimationWrapper>
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </AnimationWrapper>
      <TextWrapper>
        <TypeAnimation
          sequence={[
            "Sản phẩm này không khả dụng", // Dòng chữ đầu tiên
            1500, // Thời gian hiển thị
            "Vui lòng chọn sản phẩm khác", // Dòng chữ thứ hai
            1500, // Thời gian hiển thị
          ]}
          wrapper="span"
          speed={40} // Tốc độ gõ
          style={{
            display: "inline-block",
          }}
          repeat={Infinity}
        />
      </TextWrapper>
    </NotificationWrapper>
  );
};

export default Notification;
