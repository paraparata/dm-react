import React from "react";
import styles from "./Control.module.scss";

import Button from "../../ui/Button";

const pads = [];

for (let i = 0; i < 8; i++) {
  pads.push(i);
}

export default function Control() {
  return (
    <div className={styles.control}>
      {pads.map((pad) => {
        return <Button key={pad} variant="full" disabled={true} />;
      })}
    </div>
  );
}
