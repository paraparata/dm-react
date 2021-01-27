import React, { useState } from "react";

import Button from "./shared/Button";
import { IconPause, IconPlay, IconStop } from "./shared/Icons";

function Controller() {
  const [isPause, setIsPause] = useState(true);
  const playPause = isPause ? <IconPlay /> : <IconPause />;

  function handlePlayPause() {
    let value = isPause;
    setIsPause(!value);
  }
  return (
    <div className="w-full mb-2 px-2 py-2 space-x-4 bg-green-300">
      <Button icon={playPause} onButtonClick={handlePlayPause} />
      <Button icon={<IconStop />} onButtonClick={() => console.log("hai")} />
    </div>
  );
}

export default Controller;
