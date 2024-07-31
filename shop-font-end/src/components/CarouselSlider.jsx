import { Component } from "react";
import Slider from "react-slick";
export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#d9d9d9",
        right: 0,
        zIndex: "2",
        width: "30px",
        height: "50px",
        textAlign: "center",
        lineHeight: "70px",
      }}
      onClick={onClick}
    ></div>
  );
}

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#d9d9d9",
        left: 0,
        zIndex: "2",
        width: "30px",
        height: "50px",
        textAlign: "center",
        lineHeight: "70px",
      }}
      onClick={onClick}
    />
  );
}
