import { t } from "i18next";
import React from "react";
import profile from "../../Images/profile.jpg";

function DoctorContainer({name,address}) {
  return (
    <div className="flex items-center justify-between  mt-2">
      <div className="flex justify-center items-center">
        {/* <img src={profile} className="rounded-full w-[56px] h-[56px] mr-2" /> */}
        <div className="font-Poppins-Regular ">
          <p className="text-[#101828] text-sm ">{name}</p>
          <p className="text-[#98A2B3] text-xs">{address}</p>
        </div>
      </div>
      <p className="font-Poppins-Regular text-[#B7C835] text-xs mt-5 font-semibold">
        {/* 100 {t("Analysis")} */}
      </p>
    </div>
  );
}

export default DoctorContainer;
