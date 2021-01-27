import React from "react";

interface OptionalProps {
  classes?: string | undefined;
  icon?: any | null;
  title?: string | null;
  onButtonClick: any;
}

function Button({
  classes = "my-auto px-2 py-2 rounded-lg border-2 border-gray-900",
  icon = null,
  title = null,
  onButtonClick,
}: OptionalProps) {
  return (
    <button className={classes} onClick={onButtonClick}>
      {icon}
      {title}
    </button>
  );
}

export default Button;
