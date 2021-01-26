import React from "react";

import Button from "./shared/Button";
import { IconPlay, IconStop } from "./shared/Icons";

function Controller() {
  return (
    <div className="w-full mb-2 px-2 py-2 space-x-4 bg-green-300">
      <Button icon={<IconPlay />} onButtonClick={() => console.log("hai")} />
      <Button icon={<IconStop />} onButtonClick={() => console.log("hai")} />
    </div>
  );
}

export default Controller;
