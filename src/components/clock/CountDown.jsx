import React from "react";
const initial = 300;
const CountDown = () => {
  const [isCounting, setIsCounting] = React.useState(false);
  const [remainigTime, setRemainingTime] = React.useState(initial);
  React.useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        setRemainingTime((prev) => (prev == 0 ? 0 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white select-none">
      <div className="bg-gray-800/60 px-10 py-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 border border-gray-700">
        <h1 className="font-extrabold text-3xl text-blue-400 tracking-widest">
          COUNTDOWN TIMER
        </h1>

        <div className="text-6xl font-mono font-semibold tracking-widest text-blue-300 drop-shadow-lg">
          {`${Math.floor(remainigTime / 3600)
            .toString()
            .padStart(2, "0")} : ${Math.floor((remainigTime % 3600) / 60)
            .toString()
            .padStart(2, "0")} : ${((remainigTime % 3600) % 60)
            .toString()
            .padStart(2, "0")}`}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setIsCounting(true)}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 font-semibold tracking-wide"
          >
            Start
          </button>
          <button
            onClick={() => setIsCounting(false)}
            className="px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 active:scale-95 font-semibold tracking-wide"
          >
            Pause
          </button>
          <button
            onClick={() => {
              setRemainingTime(initial);
              setIsCounting(false);
            }}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 active:scale-95 font-semibold tracking-wide"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
