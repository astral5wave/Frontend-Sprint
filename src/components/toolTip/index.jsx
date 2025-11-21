import React from "react";
import data from "./toolTipData.js";

const index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-10">
      <div className="grid grid-cols-3 gap-6 w-5/6">
        {data.map((item, index) => <ToolTip key={index} text={item.text} toolTip={item.toolTip}/>)}
      </div>
    </div>
  );
};

const ToolTip = ({ text, toolTip }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer flex flex-col  items-center justify-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200"
    >
      <div className="text-2xl font-semibold text-gray-800">{text}</div>
      <div
        className={`absolute -top-12 ${
          isHovered ? "block" : "hidden"
        } bg-gray-800 text-white  text-sm px-3 py-2 rounded-lg whitespace-nowrap`}
      >
        {toolTip}
      </div>
    </div>
  );
};

export default index;
