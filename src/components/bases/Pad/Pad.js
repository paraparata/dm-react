import React from "react";
import WaveformGenerator from "waveform-generator-web";

import Button from "../../ui/Button";

export const generateWaveform = async (blob) => {
  const options = {
    waveformColor: "#2e2e2e",
    waveformWidth: 20,
    waveformHeight: 20,
    barGap: 1.5,
    drawMode: "svg",
  };
  const buffer = await blob.arrayBuffer();
  const waveformGenerator = new WaveformGenerator(buffer);
  const result = await waveformGenerator.getWaveform(options);

  return result;
};

export default function Pad({
  isHold,
  thumbnail,
  onTouchStart,
  onTouchEnd,
  onClick,
}) {
  if (isHold) {
    return (
      <Button
        variant="full"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            width: "80%",
            aspectRatio: "1/1",
            border: "1px solid #2e2e2e",
            borderRadius: "4px",
            background: `url(${thumbnail})`,
          }}
        />
      </Button>
    );
  } else {
    return (
      <Button
        variant="full"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "80%",
            aspectRatio: "1/1",
            border: "1px solid #2e2e2e",
            borderRadius: "4px",
            background: `url(${thumbnail})`,
          }}
        />
      </Button>
    );
  }
}
