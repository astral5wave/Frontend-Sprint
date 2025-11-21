import React from "react";

const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  const todayDate = currentDateTime.toDateString().split(" ");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center  text-white select-none">
      <div className="bg-gray-800/60  px-10 py-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border border-gray-700">
        <h1 className="font-extrabold text-3xl text-blue-400 tracking-widest">
          DIGITAL CLOCK
        </h1>

        <div className="text-6xl font-mono font-semibold tracking-widest text-blue-300 drop-shadow-lg">
          {`${currentDateTime
            .getHours()
            .toString()
            .padStart(2, "0")} : ${currentDateTime
            .getMinutes()
            .toString()
            .padStart(2, "0")} : ${currentDateTime
            .getSeconds()
            .toString()
            .padStart(2, "0")}`}
        </div>

        <div className="text-lg font-medium text-gray-300 tracking-wide">
          {`${todayDate[0]}, ${todayDate[1]} ${todayDate[2]}, ${todayDate[3]}`}
        </div>
      </div>
    </div>
  );
};

export default Clock;
