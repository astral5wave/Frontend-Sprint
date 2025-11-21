import React from "react";

const StepSection = ({ currentSection, totalSections }) => {
  return (
    <div className="h-full w-5/6 bg-green-500 my-2 rounded-2xl flex items-center justify-center text-6xl text-white font-semibold">
        {
            currentSection===totalSections?"Form Submitted":`Section ${currentSection}`
        }
    </div>
  );
};

export default StepSection;
