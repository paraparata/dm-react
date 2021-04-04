import React, { useEffect, useState } from "react";
import { Howl } from "howler";

import Button from "../components/ui/Button";
import Control from "../components/bases/Control";
import Grid from "../components/ui/Grid";
import Header from "../components/bases/Header";
import Pad, { generateWaveform } from "../components/bases/Pad";
import Visualizer from "../components/bases/Visualizer";

const pads = [];
const constraints = { audio: true };

for (let i = 0; i < 16; i++) {
  pads.push({ src: null, thumbnail: "" });
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

    mediaRecorder.onstop = async (e) => {
      console.log("data available after MediaRecorder.stop() called.");

      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);

      const audioWaveform = await generateWaveform(blob);
      setAudioBlob(() => {
        return audioBlob.map((item, id) =>
          id === padId ? { src: audioURL, thumbnail: audioWaveform } : item
        );
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
          <Visualizer streamSrc={streamSrc} style={{ width: "100%" }} />
        </div>
        <div
          style={{
            marginBottom: "12px",
            height: "30px",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Button
            variant="blok"
            disabled={true}
            onClick={() => console.log(audioBlob)}
          >
            Play
          </Button>
          <Button variant="blok" disabled={true}>
            Record
          </Button>
        </div>
        <Control />
      </div>
      <div style={{ padding: "0.5rem" }}>
        <div
          style={{
            marginBottom: "8px",
            height: "30px",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Button
            variant="blok"
            style={{ background: !isRecord ? "#ff7b54" : "#939b62" }}
            onClick={() => setIsRecord(false)}
          >
            LiveSession
          </Button>
          <Button
            variant="blok"
            style={{ background: isRecord ? "#ff7b54" : "#939b62" }}
            onClick={() => setIsRecord(true)}
          >
            RecordSession
          </Button>
          <Button variant="blok" onClick={() => setAudioBlob(pads)}>
            ClearAll
          </Button>
        </div>
        <Grid>
          {audioBlob.map((pad, index) => {
            return (
              <Pad
                key={index}
                isHold={isRecord}
                thumbnail={pad.thumbnail}
                onTouchStart={() => handleOnPadTouchStart(index)}
                onTouchEnd={() => handleOnPadTouchEnd(mRecorderState)}
                onClick={() => handleOnPadClick(pad.src)}
              />
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
