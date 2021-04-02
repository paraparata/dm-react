import React, { useEffect, useState } from "react";
import { Howl } from "howler";

import Button from "../components/ui/Button/Button";
import Control from "../components/bases/Control/Control";
import Grid from "../components/ui/Grid/Grid";
import Header from "../components/bases/Header/Header";
import Visualizer from "../components/bases/Visualizer/Visualizer";

const pads = [];
const constraints = { audio: true };

for (let i = 0; i < 16; i++) {
  pads.push(null);
}

export default function Drumpads() {
  const [streamSrc, setStreamSrc] = useState();
  const [audioBlob, setAudioBlob] = useState(pads);
  const [isRecord, setIsRecord] = useState(false);
  const [mRecorderState, setMRecorderState] = useState();

  const onGUMSuccess = (stream, padId) => {
    let chunks = [];
    const mediaRecorder = new MediaRecorder(stream);
    setMRecorderState(mediaRecorder);

    setStreamSrc(stream);

    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");

    mediaRecorder.onstop = (e) => {
      console.log("data available after MediaRecorder.stop() called.");

      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      setAudioBlob(() => {
        return audioBlob.map((item, id) => (id === padId ? audioURL : item));
      });
      console.log("recorder stopped");
    };

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
  };
  const onGUMError = (err) => {
    console.log("The following error occured: " + err);
  };

  const handleOnPadTouchStart = (padId) => {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported");
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        onGUMSuccess(stream, padId);
      }, onGUMError);
    } else {
      console.log("getUserMediua not supported");
    }
  };
  const handleOnPadTouchEnd = (mediaRecorder) => {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
  };
  const handleOnPadClick = (audioPad) => {
    console.log(audioPad);
    const sound = new Howl({
      src: [audioPad],
      format: ["ogg"],
    });
    sound.play();
  };

  useEffect(() => {
    window.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      true
    );
    return () => {
      window.removeEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
        },
        true
      );
    };
  }, []);

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
          <Visualizer streamSrc={streamSrc} />
        </div>
        <div
          style={{
            marginBottom: "12px",
            height: "30px",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Button variant="blok" onClick={() => setIsRecord(false)}>
            Play
          </Button>
          <Button variant="blok" onClick={() => setIsRecord(true)}>
            Record
          </Button>
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
          <Button variant="blok" onClick={() => console.log(audioBlob)}>
            Keys
          </Button>
          <Button variant="blok">ClearNote</Button>
          <Button variant="blok">ClearAll</Button>
          <Button variant="blok">Bars</Button>
        </div>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <Grid>
          {audioBlob.map((pad, index) => {
            if (isRecord) {
              return (
                <Button
                  key={index}
                  variant="full"
                  onTouchStart={() => handleOnPadTouchStart(index)}
                  onTouchEnd={() => handleOnPadTouchEnd(mRecorderState)}
                />
              );
            } else {
              return (
                <Button
                  key={index}
                  variant="full"
                  onClick={() => handleOnPadClick(pad)}
                />
              );
            }
          })}
        </Grid>
      </div>
    </div>
  );
}
