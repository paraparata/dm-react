import React from "react";

import Button from "./Button";

function Modal() {
  return (
    <div className="z-10">
      <div className="h-full w-full absolute top-0 left-0 bg-gray-900 bg-opacity-50">
        <div className="w-full px-4 py-4 absolute bottom-0 rounded-xl rounded-b-none bg-white text-center">
          <span className="text-4xl text-red-600">Hai</span>
          <div className="space-y-2">
            <Button
              classes="w-full px-3 py-2 rounded bg-white border-2 border-blue-500 text-blue-500 font-semibold"
              title="Submit"
              onButtonClick={() => console.log("Submitting..")}
            />
            <Button
              classes="w-full px-3 py-2 rounded bg-white border-2 border-red-400 text-red-400 font-semibold"
              title="Close"
              onButtonClick={() => console.log("Closing..")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
