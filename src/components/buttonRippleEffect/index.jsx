import React from "react";
import "./ripple.css";
const index = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [buttonProperty, setButtonProperty] = React.useState({
    width: 0,
    top: 0,
    left: 0,
  });
  const handleRipple = (event) => {
    setIsAnimating(true);
    setButtonProperty(() => {
      const element = event.target.getBoundingClientRect();
      return {
        width: element.width * 2,
        top: event.clientY - element.top - element.width,
        left: event.clientX - element.left - element.width,
      };
    });
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="relative overflow-hidden rounded-2xl shadow-xl ">
        <button
          onClick={(event) => handleRipple(event)}
          className="bg-purple-600 px-8 py-4 text-white text-4xl  font-bold cursor-pointer"
        >
          Click me
        </button>
        <div
          style={{
            width: `${buttonProperty.width}px`,
            top: `${buttonProperty.top}px`,
            left: `${buttonProperty.left}px`,
          }}
          className={`absolute ${isAnimating ? "ripple" : "hidden"} aspect-square`}
        ></div>
      </div>
    </div>
  );
};

export default index;
