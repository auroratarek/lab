import { t } from "i18next";
import React from "react";

function FontUsedPrinting({ type }) {
  return (
    <div className={`${type === "FontUsedPrinting" ? "block" : "hidden"} mt-5`}>
      <div className="grid grid-cols-2 w-full  gap-5">
        <select
          name="EnglishFonts"
          className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-sm  outline-none px-4 py-2 cursor-pointer"
        >
          <option value="" selected disabled hidden className="">
            {t("English Fonts")}
          </option>
        </select>

        <select
          name="ArabicFonts"
          className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-sm  outline-none px-4 py-2 cursor-pointer"
        >
          <option value="" selected disabled hidden className="">
            {t("Arabic Fonts")}
          </option>
        </select>
      </div>
      <div className=" flex justify-end space-x-8 mt-8 ">
        <div className="bg-transparent border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-16 py-2 rounded-xl cursor-pointer ">
          <p className="text-sm flex items-center justify-center text-black font-Poppins-Regular">
            {t("Cancel")}
          </p>
        </div>
        <div className="bg-[#B7C835] w-fit  flex items-center justify-center px-28 py-3 rounded-xl cursor-pointer ">
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            {t("Save")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FontUsedPrinting;
