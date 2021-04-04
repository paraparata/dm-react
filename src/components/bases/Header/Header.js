import React from "react";
import styles from "./Header.module.scss";

import Button from "../../ui/Button";

import MenuIcon from "../../icons/Menu";
import ThreeDotsVer from "../../icons/ThreeDotsVer";

export default function Header() {
  return (
    <header className={styles.header}>
      <Button>
        <MenuIcon width="20" height="20" />
      </Button>
      <span>KOLALA</span>
      <Button>
        <ThreeDotsVer width="20" height="20" />
      </Button>
    </header>
  );
}
