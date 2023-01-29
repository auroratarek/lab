import React from "react";
import profile from "../../Images/profile.jpg";
import { GoPrimitiveDot } from "react-icons/go";

function NotifContainer() {
  return (
    <div className="flex items-center justify-between  border-b-2 pb-2 mt-7">
      <div className="flex items-center">
        <img src={profile} className="rounded-full w-[54px] h-[54px] mr-2" />
        <div className="font-Poppins-Regular ">
          <p className="text-[#101828] text-lg font-Poppins-Bold ">
            Patient name
          </p>
          <p className="text-[#98A2B3] text-sm mt-2">
            Analysis name - Phone number
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end mb-2">
        <p className="font-Poppins-Regular text-[#98A2B3] text-sm mb-2 ">
          02/11/2022
        </p>
        <GoPrimitiveDot className="w-[10px] h-[10px] mt-2 text-[#F04438]" />
      </div>
    </div>
  );
}

export default NotifContainer;
