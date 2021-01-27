import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "./shared/Button";
import { IconSetting } from "./shared/Icons";
import Modal from "./shared/Modal";
import Pad from "./shared/Pad";

const RACKS: boolean[][] = [
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
];

function handlePad(id: string, active: boolean) {
  console.log(`${id} status is ${active}`);
}

function Rack() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {RACKS.map((rack, rackID) => {
        return (
          <div key={rackID} className="mb-2 px-3 flex justify-between">
            {rack.map((pad, padID) => {
              const quarter: string = padID % 4 === 0 ? "bg-gray-200" : "";

              return (
                <Pad
                  key={uuidv4()}
                  id={`toggle-${uuidv4()}`}
                  active={pad}
                  classes={`px-1 py-1 ${quarter}`}
                  onToggleChange={handlePad}
                />
              );
            })}
            <Button
              key={rackID}
              classes="ml-2 px-1 py-1"
              icon={<IconSetting />}
              onButtonClick={() => setIsModalOpen(true)}
            />
          </div>
        );
      })}
      <Modal
        showModal={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Rack;
