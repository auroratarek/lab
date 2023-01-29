import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscListFlat } from "react-icons/vsc";
import { BiRadioCircleMarked } from "react-icons/bi";

import { Link } from "react-router-dom";
import SideBar from "./components/SideBar";
import { HiOutlineArrowRight } from "react-icons/hi";
import Currencies from "./components/Settings/SystemSettings/Currencies";
import FontUsedPrinting from "./components/Settings/SystemSettings/FontUsedPrinting";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";

function SystemSettings() {
  const { t, i18n } = useTranslation();

  const [Section, setSection] = useState("Currencies");

  return (
    <div className="h-full w-full p-5">
      <div className="w-full flex ">
        <Header />
      </div>
      <div className="w-full h-full flex ">
        <SideBar page="Settings" />
        <div className="flex flex-col w-full lg:ml-8 mt-9">
          <h1 className="font-bold text-2xl font-Poppins-Regular ">
            {t("System Settings")}
          </h1>
          <div className="w-full flex space-x-2 items-center mt-2">
            <BiRadioCircleMarked className="text-2xl text-[#B7C835]" />
            <Link
              to="/Settings"
              className="font-Poppins-Regular text-[#B7C835] underline"
            >
              {t("Setting")}
            </Link>
            <HiOutlineArrowRight className="text-[#98A2B3]" />
            <p className="text-[#98A2B3] font-Poppins-Regular">
              {t("System Settings")}
            </p>
          </div>
          <div className="mt-5 flex w-full space-x-5 md:space-x-2 bg-white h-fit p-3 rounded-2xl ">
            <div
              className={`${
                Section === "Currencies" ? "bg-[#0D2135]" : "bg-white"
              }  w-[18%]  flex items-center justify-center  rounded-2xl cursor-pointer py-3 group hover:bg-gray-100`}
              onClick={() => setSection("Currencies")}
            >
              <p
                className={`text-base flex text-center items-center justify-center group-hover:text-black ${
                  Section === "Currencies" ? "text-white" : "text-black"
                } `}
              >
                {t("Currencies")}
              </p>
            </div>

            <div
              className={`${
                Section === "FontUsedPrinting" ? "bg-[#0D2135]" : "bg-white"
              } w-[18%]  flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("FontUsedPrinting")}
            >
              <p
                className={`text-base flex items-center justify-center group-hover:text-black ${
                  Section === "FontUsedPrinting" ? "text-white" : "text-black"
                } `}
              >
                {t("Font used Printing")}
              </p>
            </div>
          </div>

          <div className="w-full">
            <Currencies type={Section} />
            <FontUsedPrinting type={Section} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;
