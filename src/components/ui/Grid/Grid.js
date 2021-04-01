import React from "react";
import cn from "classnames";
import styles from "./Grid.module.scss";

export default function Grid({ variant, children }) {
  const className = cn(styles.grid);

  return <div className={className}>{children}</div>;
}
