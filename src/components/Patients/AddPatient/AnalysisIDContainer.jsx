import React from "react";

function AnalysisIDContainer({ nameOfAnalysis, priceAnalysis }) {
  // console.log(nameOfAnalysis);
  return (
    <div className="bg-[#F9FAFF] rounded-xl py-4 px-2 w-full h-full">
      <div className="flex justify-between text-sm font-Poppins-Bold text-[#101828]">
        <p>{nameOfAnalysis}</p>
        <p>{priceAnalysis}</p>
      </div>
    </div>
  );
}

export default AnalysisIDContainer;
