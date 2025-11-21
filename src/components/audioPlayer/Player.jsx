import React from "react";
import { ImLoop } from "react-icons/im";
import {
  FaFastForward,
  FaFastBackward,
  FaPlayCircle,
  FaPauseCircle,
} from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";

const initialState = {
  isLooping: false,
  isPlaying: false,
  volume: 100,
  progress: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loop":
      return { ...state, isLooping: action.payload };
    case "play/pause":
      return { ...state, isPlaying: action.payload };
    case "backward":
      return { ...state, progress: Math.max(state.progress - 5, 0) };
    case "forward":
      return { ...state, progress: Math.min(state.progress + 5, 100) };
    case "progressUpdate":
      return { ...state, progress: Math.min(Math.max(action.payload, 0), 100) };
    case "volumeUpdate":
      return { ...state, volume: Math.min(Math.max(action.payload, 0), 100) };
    case "reset":
      return {
        ...initialState,
        volume: state.volume,
        isLooping: state.isLooping,
        isPlaying: true,
      };
    default:
      return state;
  }
};

const Player = ({ source }) => {
  const [playerSetting, dispatch] = React.useReducer(reducer, initialState);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!source || !audio) return;
    audio.pause();
    audio.currentTime = 0;
    dispatch({ type: "reset" });
  }, [source]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      audio.currentTime = 0;
      audio.volume = Math.min(Math.max(playerSetting.volume / 100, 0), 1);
      audio.loop = playerSetting.isLooping;
      if (playerSetting.isPlaying) audio.play().catch(() => {});
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [source, playerSetting.isLooping, playerSetting.volume, playerSetting.isPlaying]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = playerSetting.isLooping;
    audio.volume = Math.min(Math.max(playerSetting.volume / 100, 0), 1);

    if (playerSetting.isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [playerSetting.isPlaying, playerSetting.isLooping, playerSetting.volume]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const dur = audio.duration;
      if (Number.isFinite(dur) && dur > 0) {
        const percent = (audio.currentTime / dur) * 100;
        dispatch({ type: "progressUpdate", payload: percent });
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, [source]);

  const handleSeek = (pct) => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
      const dur = audio.duration;
      audio.currentTime = (pct / 100) * dur;
    }
  };

  return (
    <div className="h-30 w-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-t-2xl flex flex-col justify-between p-4 shadow-lg">
      <audio ref={audioRef} src={source || null}></audio>

      <div className="w-full h-1.5 flex items-center justify-center mb-2">
        <ScrollIndicator
          progress={playerSetting.progress}
          dispatch={dispatch}
          type="player"
          onSeek={handleSeek}
        />
      </div>

      <div className="flex justify-around items-center text-gray-200 text-3xl">
        <button
          onClick={() =>
            dispatch({ type: "loop", payload: !playerSetting.isLooping })
          }
          className="active:scale-95"
        >
          <ImLoop
            className={`hover:text-yellow-400 ${
              playerSetting.isLooping ? "text-yellow-400" : ""
            } transition-colors duration-100 cursor-pointer`}
          />
        </button>

        <button
          className="active:scale-95"
          onClick={() => {
            dispatch({ type: "backward" });
            handleSeek(playerSetting.progress - 5);
          }}
        >
          <FaFastBackward className="hover:text-yellow-400 transition-colors duration-100 cursor-pointer" />
        </button>

        <button
          onClick={() =>
            dispatch({ type: "play/pause", payload: !playerSetting.isPlaying })
          }
          className="active:scale-95"
        >
          {playerSetting.isPlaying ? (
            <FaPauseCircle className="text-yellow-400 transition-colors duration-100 cursor-pointer" />
          ) : (
            <FaPlayCircle className="hover:text-yellow-400 transition-colors duration-100 cursor-pointer" />
          )}
        </button>

        <button
          className="active:scale-95"
          onClick={() => {
            dispatch({ type: "forward" });
            handleSeek(playerSetting.progress + 5);
          }}
        >
          <FaFastForward className="hover:text-yellow-400 transition-colors duration-100 cursor-pointer" />
        </button>

        <div className="flex items-center gap-2 group">
          <AiFillSound className="hover:text-yellow-400 transition-colors duration-100 cursor-pointer" />
          <div className="w-20 h-2 group-hover:opacity-100 opacity-0">
            <ScrollIndicator
              progress={playerSetting.volume}
              dispatch={dispatch}
              type="volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollIndicator = ({ progress, dispatch, type, onSeek }) => {
  const ref = React.useRef(null);

  const handleMouseDown = (e) => {
    const clickX = e.clientX;
    const dimension = ref.current.getBoundingClientRect();
    const pct = ((clickX - dimension.left) / dimension.width) * 100;
    const clamped = Math.min(Math.max(pct, 0), 100);

    if (type === "player") {
      dispatch({ type: "progressUpdate", payload: clamped });
      onSeek && onSeek(clamped);
    } else {
      dispatch({ type: "volumeUpdate", payload: clamped });
    }
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className="h-full w-full bg-gray-600 flex rounded-full overflow-hidden cursor-pointer"
    >
      <div
        className="h-full bg-yellow-400 relative rounded-r-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Player;
