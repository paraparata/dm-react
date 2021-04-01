import React, { useState } from "react";

import Button from "./shared/Button";
import { IconPause, IconPlay, IconStop } from "./shared/Icons";

interface OptProps {
  onPlayPause: any;
  onRandomSteps: any;
  onRandomDrums: any;
  onClearSteps: any;
  onTempoChange: any;
}

function Controller({
  onPlayPause,
  onRandomSteps,
  onRandomDrums,
  onClearSteps,
  onTempoChange,
}: OptProps) {
  const [isPause, setIsPause] = useState(true);
  const playPause = isPause ? <IconPlay /> : <IconPause />;

  function handlePlayPause() {
    let value = isPause;
    setIsPause(!value);
    onPlayPause();
  }

  function handleStop() {
    console.log("Stop");
  }

  function handleRandomSteps() {
    onRandomSteps();
  }

  function handleRandomDrums() {
    onRandomDrums();
  }

  function handleClearSteps() {
    onClearSteps();
  }

  function handleTempoChange() {
    onTempoChange();
  }

  return (
    <div className="w-full mb-2 px-2 py-2 space-x-4 bg-green-300">
      <Button icon={playPause} onButtonClick={handlePlayPause} />
      <Button icon={<IconStop />} onButtonClick={handleStop} />
      <Button
        title="Ranbdom Steps"
        classes="px-1 py-1 rounded border border-gray-900 text-sm"
        onButtonClick={handleRandomSteps}
      />
      <Button
        title="Random Drums"
        classes="px-1 py-1 rounded border border-gray-900 text-sm"
        onButtonClick={handleRandomDrums}
      />
      <Button
        title="Clear Steps"
        classes="px-1 py-1 rounded border border-gray-900 text-sm"
        onButtonClick={handleClearSteps}
      />
      <Button
        title="Clear Steps"
        classes="px-1 py-1 rounded border border-gray-900 text-sm"
        onButtonClick={handleTempoChange}
      />
    </div>
  );
}

export default Controller;
