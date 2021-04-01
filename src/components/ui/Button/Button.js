import React from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

export default function Button({ variant, onClick, children, ...props }) {
  const className = cn(styles.button, {
    [styles["button-super"]]: variant === "super",
    [styles["button-blok"]]: variant === "blok",
    [styles["button-full"]]: variant === "full",
  });

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
