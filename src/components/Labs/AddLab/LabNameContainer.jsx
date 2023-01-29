import React from "react";

function LabNameContainer({ phone, lab_name, address }) {
  return (
    <div className="flex flex-col space-y-3 bg-[#F9FAFF] rounded-xl py-4 px-3   mt-2">
      <div className="flex items-start ">
        <div className=" flex flex-col space-y-1">
          <p className="text-[#101828] font-Poppins-SemiBold text-sm ">
            {lab_name}
          </p>
          <p className="text-[#98A2B3] font-Poppins-Medium text-xs">{phone}</p>
        </div>
      </div>
      <p className="text-sm font-Poppins-Regular">{address}</p>
    </div>
  );
}

export default LabNameContainer;
