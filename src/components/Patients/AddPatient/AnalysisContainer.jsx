import React from "react";
import profile from "../../../Images/profile.jpg";

function AnalysisContainer({ name, analys_name, onClick, id }) {
  console.log(name);
  return (
    <div onClick={onClick} className="flex items-center mt-2">
      <img src={profile} className="rounded-2xl w-[44px] h-[44px] mr-2" />
      <div className=" flex flex-col space-y-2">
        <p id={id} className="text-[#101828] font-Poppins-SemiBold text-sm ">
          {name}
        </p>
        <p className="text-[#98A2B3] font-Poppins-Medium text-xs">
          {analys_name}
        </p>
      </div>
    </div>
  );
}

export default AnalysisContainer;
