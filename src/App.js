import React, { useState, useRef } from "react";
import TimeSlider from "react-input-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.scss";
import {
  faForward,
  faBackward,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import audios from "./audios";
import {  constructTimeMMSS } from "./helpers/timer";
const App = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  return (
    <div className="App">
      <div className="Now-Playing">Now playing :</div>
      <img
        className={`Song-Thumbnail ${
          !isPlay ? "Song-Thumbnail-Spin-Pause" : ""
        }`}
        src={audios[audioIndex].cover}
        alt="tet"
      />
      <h2 className="Song-Title">{audios[audioIndex].title}</h2>
      <h3 className="Singer">{audios[audioIndex].artist}</h3>
      <h4 className="Album">{audios[audioIndex].album}</h4>
      <div className="Control-Button-Group">
        <div
          className="Prev-Button"
          onClick={() => setAudioIndex((audioIndex - 1) % audios.length)}
        >
          <FontAwesomeIcon icon={faBackward} />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? (
            <FontAwesomeIcon icon={faPauseCircle} />
          ) : (
            <FontAwesomeIcon icon={faPlayCircle} />
          )}
        </div>
        <div
          className="Next-Button"
          onClick={() => setAudioIndex((audioIndex + 1) % audios.length)}
        >
          <FontAwesomeIcon icon={faForward} />
        </div>
      </div>
      <div className="Seek-Area">
        <div>
          {constructTimeMMSS(currentTime)}
        </div>
        <TimeSlider
          axis="x"
          xmax={duration}
          x={currentTime}
          onChange={handleTimeSliderChange}
          styles={{
            track: {
              backgroundColor: "#03151f",
              margin: "0 10px",
              height: "3px",
            },
            active: {
              backgroundColor: "#333",
              height: "3px",
            },
            thumb: {
              marginTop: "0px",
              width: "8px",
              height: "10px",
              backgroundColor: "#333",
              borderRadius: 0,
            },
          }}
        />
        <div>
          {constructTimeMMSS(duration)}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audios[audioIndex].src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setPlay(false)}
      />
    </div>
  );
};

export default App;
