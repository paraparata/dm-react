import React from "react";

import Button from "../components/ui/Button/Button";
import Control from "../components/bases/Control/Control";
import Grid from "../components/ui/Grid/Grid";
import Header from "../components/bases/Header/Header";

const pads = [];

for (let i = 0; i < 16; i++) {
  pads.push(i);
}

export default function Drumpads() {
  const handleOnPadClick = (e) => {
    e.preventDefault();
    console.log("hai click");
  };
  const handleOnPadTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
  };
  const handleOnPadTouchEnd = (e) => {
    e.preventDefault();
    console.log("touch end");
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div>
        <Header />
        <hr />
      </div>
      <div style={{ flex: 1, padding: "0.5rem" }}>
        <div
          style={{
            marginBottom: "12px",
            height: "30px",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Button variant="blok">Play</Button>
          <Button variant="blok">Record</Button>
        </div>
        <Control />
        <div
          style={{
            marginTop: "12px",
            height: "30px",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Button variant="blok">Keys</Button>
          <Button variant="blok">ClearNote</Button>
          <Button variant="blok">ClearAll</Button>
          <Button variant="blok">Bars</Button>
        </div>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <Grid>
          {pads.map((pad) => {
            return <Button key={pad} variant="full" />;
          })}
        </Grid>
      </div>
    </div>
  );
}
