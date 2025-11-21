import React from "react";

const Navigator = ({ totalSections, currentSection, setCurrentSection }) => {
  const handleNext = () => {
    setCurrentSection((prev) => (prev < totalSections ? prev + 1 : prev));
  };
  const handlePrevious = () => {
    setCurrentSection((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const canNext = currentSection === totalSections ? false : true;
  const canPrev =
    currentSection === 1 || currentSection === totalSections ? false : true;
  return (
    <div className="w-full flex items-center justify-center-safe gap-4 mb-5">
      <button
        disabled={!canPrev}
        onClick={handlePrevious}
        className={`${
          canPrev
            ? "bg-yellow-400 shadow-yellow-800 text-white  active:scale-95 cursor-pointer"
            : "bg-gray-400 shadow-gray-800 text-black cursor-not-allowed"
        } px-4 py-2 text-xl rounded-lg shadow-sm font-bold`}
      >
        Previous
      </button>
      <button
        disabled={!canNext}
        onClick={handleNext}
        className={`${
          canNext
            ? "bg-yellow-400 shadow-yellow-800 text-white  active:scale-95 cursor-pointer"
            : "bg-gray-400 shadow-gray-800 text-black cursor-not-allowed"
        } px-4 py-2 text-xl rounded-lg shadow-sm font-bold`}
      >
        {currentSection >= totalSections - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default Navigator;
