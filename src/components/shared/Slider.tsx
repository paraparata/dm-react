import React, { useState } from "react";
import "./Slider.css";

interface OptProps {
  title: string;
  value: number;
  onSliderChange: any;
}

function Slider({ title, value, onSliderChange }: OptProps) {
  const [sliderValue, setSliderValue] = useState(value);
  function handleSlider(e: any) {
    onSliderChange(+e.target.value);
    setSliderValue(+e.target.value);
  }

  return (
    <div className="slider flex flex-col">
      <span>{title}</span>
      <input
        type="range"
        value={sliderValue}
        min="0"
        max="1"
        step="0.01"
        aria-orientation="vertical"
        onChange={handleSlider}
      />
      <output>{sliderValue}</output>
    </div>
  );
}

export default Slider;
