import React, { useState } from "react";
import "./Pad.css";

interface OptionalProps {
  id: string;
  active: boolean;
  classes?: string | null;
  onToggleChange: any;
}

function Pad({ id, active, classes = null, onToggleChange }: OptionalProps) {
  const [toggle, setToggle] = useState(active);
  function handleToggle(e: any) {
    const status: boolean = e.target.checked;
    setToggle(status);
    if (onToggleChange) {
      onToggleChange(id, status);
    }
  }

  return (
    <div className={`pad flex rounded-lg ${classes}`}>
      <input
        id={`toggle-${id}`}
        type="checkbox"
        checked={toggle}
        onChange={handleToggle}
      ></input>
      <label htmlFor={`toggle-${id}`}></label>
    </div>
  );
}

export default Pad;
