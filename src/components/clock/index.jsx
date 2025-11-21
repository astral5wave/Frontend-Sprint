import React from "react";
import Clock from "./Clock";
import CountDown from "./CountDown";

const Index = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <Clock />
      </div>
      <div className="h-[1px] bg-gray-700 opacity-50 mx-10"></div>
      <div className="flex-1 flex items-center justify-center overflow-auto pb-6">
        <CountDown />
      </div>
    </div>
  );
};

export default Index;
