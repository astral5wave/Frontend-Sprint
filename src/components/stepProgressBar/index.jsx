import React from "react";
import Navigator from "./Navigator";
import StepBar from "./StepBar";
import StepSection from "./StepSection";
const index = () => {
  const [totalSections, setTotalSections] = React.useState();
  const [currentSection, setCurrentSection] = React.useState();
  React.useEffect(() => {
    setTotalSections(7);
    setCurrentSection(1);
  }, []);
  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="h-5/6 w-5/6 flex flex-col items-center justify-between">
          <StepBar
            totalSections={totalSections}
            currentSection={currentSection}
          />
          <StepSection currentSection={currentSection} totalSections={totalSections}/>
          <Navigator totalSections={totalSections} setCurrentSection={setCurrentSection} currentSection={currentSection}/>
        </div>
      </div>
    </div>
  );
};

export default index;
