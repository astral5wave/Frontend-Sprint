import React from "react";

const StepBar = ({ totalSections, currentSection }) => {
  return (
    <div className="flex my-2 gap-0">
      { totalSections && new Array(totalSections-1).fill(0).map((item, index) => {
        return (
          <div
          key={index}
            className={`${
              index < currentSection - 1 ? "bg-green-600" : "bg-blue-600"
            } px-8 py-2 rounded-lg text-2xl shadow-lg text-white font-bold`}
          >{`Section ${index + 1}`}</div>
        );
      })}
    </div>
  );
};

export default StepBar;
