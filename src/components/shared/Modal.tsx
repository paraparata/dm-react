import React from "react";
import { Transition } from "@headlessui/react";

import Button from "./Button";
import Slider from "./Slider";
import "./Modal.css";

interface EffectType {
  title: string;
  value: number;
  handler: any;
}
interface OptProps {
  showModal: boolean;
  onModalClose: any;
}

const effects: EffectType[] = [
  {
    title: "Gain",
    value: 0,
    handler: (value: number) => {
      console.log(value);
    },
  },
  {
    title: "Pitch",
    value: 0,
    handler: (value: number) => {
      console.log(value);
    },
  },
  {
    title: "Length",
    value: 0,
    handler: (value: number) => {
      console.log(value);
    },
  },
  {
    title: "Env",
    value: 0,
    handler: (value: number) => {
      console.log(value);
    },
  },
  {
    title: "Noise",
    value: 0,
    handler: (value: number) => {
      console.log(value);
    },
  },
];

function Modal({ showModal, onModalClose }: OptProps) {
  function handleClose() {
    onModalClose();
  }

  return (
    <Transition show={showModal}>
      <div className="z-10">
        <Transition.Child
          enter="transition ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="h-full w-full absolute top-0 left-0 bg-gray-900 bg-opacity-50"></div>
        </Transition.Child>
        <div
          className={`${
            showModal ? "modal-in" : "modal-out"
          } w-full px-8 py-4 absolute bottom-0 rounded-xl rounded-b-none bg-white text-center`}
        >
          <div className="flex justify-between">
            {effects.map((effect, index) => {
              return (
                <Slider
                  key={index}
                  title={effect.title}
                  value={effect.value}
                  onSliderChange={effect.handler}
                />
              );
            })}
            <div className="flex flex-col">
              <Button
                classes="my-auto px-2 py-1 rounded border-2 border-gray-900"
                title="M"
                onButtonClick={() => console.log("Mute")}
              />
              <Button
                classes="my-auto px-2 py-1 rounded border-2 border-gray-900"
                title="x"
                onButtonClick={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default Modal;
