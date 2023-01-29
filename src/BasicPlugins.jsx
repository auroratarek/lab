import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscListFlat } from "react-icons/vsc";
import { BiRadioCircleMarked } from "react-icons/bi";

import { Link } from "react-router-dom";
import SideBar from "./components/SideBar";
import { HiOutlineArrowRight } from "react-icons/hi";
import MeasurementUnits from "./components/Settings/BasicPlugins/MeasurementUnits";
import UnitsStore from "./components/Settings/BasicPlugins/UnitsStore";
import TestMethod from "./components/Settings/BasicPlugins/TestMethod";
import Gender from "./components/Settings/BasicPlugins/Gender";

import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Companies from "./components/Settings/BasicPlugins/Companies";
import PaymentMethod from "./components/Settings/BasicPlugins/PaymentMethod";
import SendMethod from "./components/Settings/BasicPlugins/SendMethod";
import JobTitle from "./components/Settings/BasicPlugins/JobTitle";
import Specialization from "./components/Settings/BasicPlugins/Specialization";

function BasicPlugins() {
  const { t, i18n } = useTranslation();

  const [Section, setSection] = useState("MeasurementUnits");

  const [TestUnitBeforeFilter, setTestUnitBeforeFilter] = useState();
  //  const [TestUnitBeforeFilter, setTestUnitBeforeFilter] = useState();
  //  const [TestUnitBeforeFilter, setTestUnitBeforeFilter] = useState();
  //  const [TestUnitBeforeFilter, setTestUnitBeforeFilter] = useState();

  return (
    <div className="h-full w-full p-5">
      <div className="w-full flex ">
        <Header
        // section={Section}
        // DataBeforeFilter={
        //   type === "MeasurementUnits" ? TestUnitBeforeFilter : ""
        // }
        />
      </div>
      <div className="w-full h-full flex ">
        <SideBar page="Settings" />
        <div className="flex flex-col w-full lg:ml-8 mt-9">
          <h1 className="font-bold text-2xl font-Poppins-Regular ">
            {t("Basic plugins")}
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
            <p className="font-Poppins-Regular text-[#98A2B3]">
              {t("Basic plugins")}
            </p>
          </div>
          <div className="mt-5 flex w-full space-x-5 md:space-x-2 bg-white h-fit p-3 rounded-2xl overflow-x-scroll scrollbar-hide">
            <div
              className={`${
                Section === "MeasurementUnits" ? "bg-[#0D2135]" : "bg-white"
              }  w-fit px-2 flex items-center justify-center  rounded-2xl cursor-pointer py-3 group hover:bg-gray-100`}
              onClick={() => setSection("MeasurementUnits")}
            >
              <p
                className={`text-base flex text-center items-center justify-center  ${
                  Section === "MeasurementUnits" ? "text-white" : "text-black"
                } `}
              >
                {t("Test Units")}
              </p>
            </div>

            <div
              className={`${
                Section === "Gender" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3 `}
              onClick={() => setSection("Gender")}
            >
              <p
                className={`text-base flex items-center justify-center ${
                  Section === "Gender" ? "text-white" : "text-black"
                } `}
              >
                {t("Gender")}
              </p>
            </div>

            {/* <div
              className={`${
                Section === "UnitsStore" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3 `}
              onClick={() => setSection("UnitsStore")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "UnitsStore" ? "text-white" : "text-black"
                } `}
              >
                {t("Units store")}
              </p>
            </div> */}
            {/* 
            <div
              className={`${
                Section === "ScientificDisciplines"
                  ? "bg-[#0D2135]"
                  : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("ScientificDisciplines")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "ScientificDisciplines"
                    ? "text-white"
                    : "text-black"
                } `}
              >
                {t("Scientific disciplines")}
              </p>
            </div> */}

            <div
              className={`${
                Section === "TestMethod" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("TestMethod")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "TestMethod" ? "text-white" : "text-black"
                } `}
              >
                {t("Test method")}
              </p>
            </div>

            {/*new*/}
            <div
              className={`${
                Section === "Companies" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("Companies")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "Companies" ? "text-white" : "text-black"
                } `}
              >
                {t("Companies")}
              </p>
            </div>

            <div
              className={`${
                Section === "PaymentMethod" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("PaymentMethod")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "PaymentMethod" ? "text-white" : "text-black"
                } `}
              >
                {t("Payment methods")}
              </p>
            </div>

            <div
              className={`${
                Section === "SendMethod" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("SendMethod")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "SendMethod" ? "text-white" : "text-black"
                } `}
              >
                {t("Send methods")}
              </p>
            </div>

            <div
              className={`${
                Section === "JobTitle" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("JobTitle")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "JobTitle" ? "text-white" : "text-black"
                } `}
              >
                {t("Job Title")}
              </p>
            </div>

            <div
              className={`${
                Section === "Specialization" ? "bg-[#0D2135]" : "bg-white"
              } w-fit px-2 flex items-center text-center  justify-center  rounded-2xl group cursor-pointer py-3  `}
              onClick={() => setSection("Specialization")}
            >
              <p
                className={`text-base flex items-center justify-center  ${
                  Section === "Specialization" ? "text-white" : "text-black"
                } `}
              >
                {t("Specialization")}
              </p>
            </div>
          </div>

          <div className="w-full">
            <MeasurementUnits
              setDataBeforeFilter={setTestUnitBeforeFilter}
              type={Section}
            />
            {/* <UnitsStore type={Section} /> */}
            <TestMethod type={Section} />
            <Gender type={Section} />
            <Companies type={Section} />
            <PaymentMethod type={Section} />
            <SendMethod type={Section} />
            <JobTitle type={Section} />
            <Specialization type={Section} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicPlugins;
