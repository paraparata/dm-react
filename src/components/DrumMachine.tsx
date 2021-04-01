import React, { useState, useEffect, useMemo } from "react";

import Controller from "./Controller";
import Led from "./shared/Led";
import Rack from "./Rack";
import PRESETS from "../assets/presets";
import "./DrumMachine.css";
import { debug } from "console";

let audioContext: AudioContext;
audioContext = new AudioContext();

const bufferSize = 2 * audioContext.sampleRate;
const noiseBuffer = audioContext.createBuffer(
  1,
  bufferSize,
  audioContext.sampleRate
);
const output = noiseBuffer.getChannelData(0);

for (let i = 0; i < bufferSize; i += 1) {
  output[i] = Math.random() * 2 - 1;
}

function scheduleNote(instrument: any, startTime: any) {
  const osc = audioContext.createOscillator();
  const mainGainNode = audioContext.createGain();
  const whiteNoise = audioContext.createBufferSource();

  const oscVol = audioContext.createGain();
  osc.connect(oscVol);
  oscVol.gain.setValueAtTime((1 - instrument.sineNoiseMix) * 2, startTime);
  oscVol.connect(mainGainNode);
  mainGainNode.connect(audioContext.destination);
  osc.start(startTime);
  osc.stop(startTime + instrument.decay);
  osc.frequency.setValueAtTime(instrument.freq, startTime);
  osc.frequency.exponentialRampToValueAtTime(
    instrument.freq * instrument.endPitch,
    startTime + instrument.decay
  );

  const noiseVol = audioContext.createGain();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;
  whiteNoise.connect(noiseVol);
  noiseVol.gain.setValueAtTime(instrument.sineNoiseMix * 2, startTime);
  noiseVol.connect(mainGainNode);
  whiteNoise.start(startTime);
  whiteNoise.stop(startTime + instrument.decay);
  mainGainNode.gain.setValueAtTime(instrument.gain, startTime);
  mainGainNode.gain.exponentialRampToValueAtTime(
    0.01,
    startTime + instrument.decay
  );
}

const RotateDir = () => (
  <div className="portrait text-center">
    <span>
      To make it works, <br />
      rotate your phone.
    </span>
  </div>
);

export default function DrumMachine() {
  const [pattern, setPattern] = useState<any>([]);
  const [instruments, setInstruments] = useState<
    {
      freq: number;
      gain: number;
      decay: number;
      endPitch: number;
      sineNoiseMix: number;
    }[]
  >([]);
  // eslint-disable-next-line
  const [stepCount, setStepCount] = useState(16);
  const [currentStep, setCurrentStep] = useState(0);
  const [secondsPerStep, setSecondsPerStep] = useState(0);
  const [lastScheduledTime, setLastScheduledTime] = useState(0);
  const [nextStepTime, setNextStepTime] = useState(0);
  const [mutes, setMutes] = useState<boolean[]>([]);
  const [playing, setPlaying] = useState(true);
  const [tempo, setTempo] = useState(120);
  const [audioTime, setAudioTime] = useState<any>(undefined);

  useEffect(() => {
    console.log(instruments);

    // Add some instruments
    for (let i = 0; i < 4; i += 1) {
      setInstruments((preVal) => {
        return [
          ...preVal,
          {
            freq: 100,
            gain: 0.2,
            decay: 0.01,
            endPitch: 0.01,
            sineNoiseMix: 0.01,
          },
        ];
      });
      setMutes((preVal) => [...preVal, false]);
      randomizeDrums();
    }
    // Create empty patterns
    for (let i = 0; i < instruments.length; i += 1) {
      setPattern([...pattern, []]);
      for (let j = 0; j < stepCount; j += 1) {
        setPattern(() => {
          pattern[i].push({ active: false });
          return pattern;
        });
      }
    }

    updateAudioTime();

    loadPreset(PRESETS[0]);
    if (!window.AudioContext) setPlaying((preVal) => !preVal);
  }, []);

  function pausePlay() {
    setPlaying((preVal) => !preVal);
    audioContext.createOscillator().start();
  }

  function loadPreset(preset: any) {
    const loadedPreset: any = [].concat(preset);
    setPattern(loadedPreset.pattern);
    setTempo(loadedPreset.tempo);
    setInstruments(loadedPreset.instruments);

    for (let i = 0; i < mutes.length; i += 1) {
      setMutes(() => {
        mutes[i] = false;
        return mutes;
      });
    }
  }

  function randomizeSteps() {
    for (let i = 0; i < pattern.length; i += 1) {
      for (let j = 0; j < pattern[i].length; j += 1) {
        setPattern(() => {
          pattern[i][j].active = Math.random() > 0.5;
          return pattern;
        });
      }
    }
  }

  function randomizeDrums() {
    for (const inst of instruments) {
      inst.freq = Math.random() * 3000 + 100;
      inst.decay = Math.random() * 0.8 + 0.01;
      inst.endPitch = Math.random() * 0.8 + 0.01;
      inst.sineNoiseMix = Math.random() * 1 + 0.01;
    }
  }

  function clearSteps() {
    for (let i = 0; i < pattern.length; i += 1) {
      for (let j = 0; j < pattern[i].length; j += 1) {
        setPattern(() => {
          pattern[i][j].active = false;
          return pattern;
        });
      }
    }
    for (let i = 0; i < mutes.length; i += 1) {
      setMutes(() => {
        mutes[i] = false;
        return mutes;
      });
    }
  }

  function getSchedule(step: any, currentTime: any) {
    let stepTime =
      step * secondsPerStep +
      (currentTime - (currentTime % (secondsPerStep * stepCount)));
    if (stepTime < currentTime) {
      // skip to the next pattern if it's already too late
      stepTime += secondsPerStep * stepCount;
    }
    return stepTime;
  }

  function updateAudioTime() {
    if (playing) {
      const LOOK_AHEAD = 0.1;
      setSecondsPerStep(60 / tempo / 4);
      setAudioTime(audioContext.currentTime);
      setCurrentStep(Math.floor((audioTime / secondsPerStep) % stepCount));

      for (const inst of pattern) {
        if (!mutes[inst]) {
          for (const step in pattern[inst]) {
            if (pattern[inst][step].active) {
              const schedule = getSchedule(step, audioTime);
              if (
                schedule > 0 &&
                schedule - audioTime < LOOK_AHEAD &&
                schedule > lastScheduledTime
              ) {
                scheduleNote(instruments[inst], schedule);
              }
            }
          }
        }
      }

      setLastScheduledTime(audioTime + LOOK_AHEAD);
    }
    requestAnimationFrame(updateAudioTime);
  }

  return (
    <div className="h-screen w-screen">
      <RotateDir />
      <div className="landscape h-full w-full">
        <Controller
          onPlayPause={pausePlay}
          onRandomSteps={randomizeSteps}
          onRandomDrums={randomizeDrums}
          onClearSteps={clearSteps}
          onTempoChange={() => console.log("hey")}
        />
        <div className="px-3 flex justify-between">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (val) => {
              return (
                // <div className="mx-auto">
                <Led key={val} active={false} />
                // </div>
              );
            }
          )}
          <span></span>
        </div>
        <Rack />
      </div>
    </div>
  );
}
