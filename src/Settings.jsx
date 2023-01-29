import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscListFlat } from "react-icons/vsc";
import { GoSettings } from "react-icons/go";
import { BsPrinter } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { RiListSettingsLine } from "react-icons/ri";
import { HiOutlineArrowRight } from "react-icons/hi";

import { Link } from "react-router-dom";
import SideBar from "./components/SideBar";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
function Settings() {
  const { t, i18n } = useTranslation();

  return (
    <div className="h-full w-full p-5">
      <div className="w-full flex ">
        <Header />
      </div>
      <div className="w-full h-full flex ">
        <SideBar page="Settings" />
        <div className="flex flex-col w-full lg:ml-8 mt-9">
          <h1 className="font-bold text-2xl font-Poppins-Regular ">
            {t("Settings")}
          </h1>
          <div className="w-full  grid grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            <Link
              to="/Settings/SystemSettings"
              className="bg-white w-full lg:col-start-1 lg:col-end-3 hover:bg-[#B7C835] group p-5 pt-20 rounded-xl cursor-pointer"
            >
              <RiListSettingsLine className="text-4xl text-[#B7C835] group-hover:text-white" />
              <div className="flex space-x-2 group-hover:text-white items-center mt-2">
                <h1 className="font-Poppins-Bold text-lg">
                  {t("System Settings")}
                </h1>
                <HiOutlineArrowRight />
              </div>
            </Link>

            <div className="bg-white w-full lg:col-start-3 lg:col-end-4 hover:bg-[#B7C835] group pl-5 pb-5 pt-20 rounded-xl cursor-pointer">
              <BsPrinter className="text-4xl ml-2 text-[#B7C835] group-hover:text-white" />
              <div className="flex space-x-2 group-hover:text-white items-center mt-2">
                <h1 className="font-Poppins-Bold text-lg">
                  {t("Print Settings")}
                </h1>
                <HiOutlineArrowRight />
              </div>
            </div>

            <Link
              to="/Settings/BasicPlugins"
              className="bg-white w-full hover:bg-[#B7C835] group px-2 pl-3 pb-5 pt-20 rounded-xl cursor-pointer"
            >
              <RiListSettingsLine className="text-4xl ml-2 text-[#B7C835] group-hover:text-white" />
              <div className="flex space-x-2 group-hover:text-white items-center mt-2">
                <h1 className="font-Poppins-Bold text-lg">
                  {t("Basic plugins")}
                </h1>
                <HiOutlineArrowRight />
              </div>
            </Link>

            <div className="bg-white w-full hover:bg-[#B7C835] group pl-5 pb-5 pt-20 rounded-xl cursor-pointer">
              <div className="border-2 w-fit rounded-lg border-[#B7C835] group-hover:border-white">
                <RxPerson className="text-4xl group-hover:text-white text-[#B7C835]" />
              </div>
              <div className="flex space-x-2 items-center group-hover:text-white mt-2">
                <h1 className="font-Poppins-Bold text-lg">
                  {t("System Owner")}
                </h1>
                <HiOutlineArrowRight />
              </div>
            </div>

            <div className="bg-white w-full hover:bg-[#B7C835]  group pl-4 pr-1 pb-5 pt-20 rounded-xl cursor-pointer">
              <div className="border-2 p-1 w-fit rounded-lg border-[#B7C835] group-hover:border-white">
                <GoSettings className="text-3xl group-hover:text-white text-[#B7C835]" />
              </div>
              <div className="flex space-x-2 items-center group-hover:text-white mt-2">
                <h1 className="font-Poppins-Bold text-lg">
                  {t("Premissions")}
                </h1>
                <HiOutlineArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
