import React from "react";
import "./Slider.css";

function Slider() {
  return (
    <div className="slider flex flex-col">
      <span>Gain</span>
      <input type="range" aria-orientation="vertical" />
      <output />
    </div>
  );
}

export default Slider;
