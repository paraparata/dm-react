import React from "react";

import Controller from "./Controller";
import Rack from "./Rack";
import Modal from "./shared/Modal";
import "./DrumMachine.css";

const RotateDir = () => (
  <div className="portrait text-center">
    <span>
      To make it works, <br />
      rotate your phone.
    </span>
  </div>
);

function DrumMachine() {
  return (
    <div className="h-screen w-screen">
      <RotateDir />
      <div className="landscape h-full w-full">
        <Controller />
        <Rack />
        <Modal />
      </div>
    </div>
  );
}

export default DrumMachine;
