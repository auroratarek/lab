import React, { useState } from "react";
import SideBar from "./components/SideBar";

import "react-datepicker/dist/react-datepicker.css";
import AnalysisCount from "./components/Reports/AnalysisCount";
import Reviewers from "./components/Reports/Reviewers";
import Revenues from "./components/Reports/Revenues";
import Expenses from "./components/Reports/Expenses";
import Store from "./components/Reports/Store";
import DoctorsReport from "./components/Reports/DoctorsReport";
import OfficesReport from "./components/Reports/OfficesReport";
import Examinations from "./components/Reports/Examinations";
import CollectedMoney from "./components/Reports/CollectedMoney";
import Debt from "./components/Reports/Debt";
import { VscListFlat } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Reports() {
  const { t, i18n } = useTranslation();

  const [getOffices, setGetOffices] = useState();
  const [Section, setSection] = useState("Analysis");

  const RevenuesSection = () => {
    setSection("Revenues");
  };

  const AnalysisSection = () => {
    setSection("Analysis");
  };

  const ReviewersSection = () => {
    setSection("Reviewers");
  };

  const ExpensesSection = () => {
    setSection("Expenses");
  };

  const StoreSection = () => {
    setSection("Store");
  };

  const DoctorsSection = () => {
    setSection("Doctors");
  };

  const MoneySection = () => {
    setSection("Money");
  };

  const DebtSection = () => {
    setSection("Debt");
  };
  const ExaminationsSection = () => {
    setSection("Examinations");
  };

  const getPaidBills = async (page) => {
    await axios.get(`lab-scope/pays?page=${page}`).then((response) => {
      console.log(response.data, "hi");
      setGetOffices(response.data);
    });
  };
  const officesSection = () => {
    getPaidBills(1);
    console.log(getOffices, "fc");
    setSection("offices");
  };

  return (
    <div className="w-full h-full pr-5 p-5">
      <div className="w-full flex ">
        <Header />
      </div>
      <div className="flex ">
        <SideBar page="Reports" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full justify-between">
            <div className="flex w-full space-x-5 md:space-x-2 bg-white h-fit p-3 rounded-2xl overflow-x-scroll scrollbar-hide">
              <div
                className={`${
                  Section === "Analysis" ? "bg-[#0D2135]" : "bg-white"
                }  w-fit px-1 flex items-center justify-center  rounded-2xl cursor-pointer py-3 flex-[0_0_14.5%]`}
                onClick={() => AnalysisSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex text-center items-center justify-center ${
                    Section === "Analysis" ? "text-white" : "text-black"
                  } `}
                >
                  {t("Analysis count")}
                </p>
              </div>

              <div
                className={`${
                  Section === "Reviewers" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center text-center  justify-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => ReviewersSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center ${
                    Section === "Reviewers" ? "text-white" : "text-black"
                  } `}
                >
                  {t("Reviewers")}
                </p>
              </div>
              <div
                className={`${
                  Section === "Revenues" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => RevenuesSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center ${
                    Section === "Revenues" ? "text-white" : "text-black"
                  } `}
                >
                  {t("Revenues")}
                </p>
              </div>

              <div
                className={`${
                  Section === "Expenses" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => ExpensesSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center ${
                    Section === "Expenses" ? "text-white" : "text-black"
                  } `}
                >
                  {t("Expenses")}
                </p>
              </div>

              <div
                className={`${
                  Section === "Store" ? "bg-[#0D2135]" : "bg-white"
                }  w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => StoreSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center ${
                    Section === "Store" ? "text-white" : "text-black"
                  } `}
                >
                  {t("Store")}
                </p>
              </div>

              <div
                className={`${
                  Section === "Doctors" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => DoctorsSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center  ${
                    Section === "Doctors" ? "text-white" : "text-black"
                  } `}
                >
                  {t("Doctors")}
                </p>
              </div>

              <div
                className={`${
                  Section === "offices" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => officesSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center ${
                    Section === "offices" ? "text-white" : "text-black"
                  }`}
                >
                  {t("Scientific offices")}
                </p>
              </div>

              <div
                className={`${
                  Section === "Examinations" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => ExaminationsSection()}
              >
                <p
                  className={` font-Poppins-Medium text-sm flex items-center justify-center ${
                    Section === "Examinations" ? "text-white" : "text-black"
                  } `}
                >
                  {t("Examinations")}
                </p>
              </div>

              <div
                className={`${
                  Section === "Money" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => MoneySection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center ${
                    Section === "Money" ? "text-white" : "text-black"
                  }`}
                >
                  {t("Collected money")}
                </p>
              </div>

              <div
                className={`${
                  Section === "Debt" ? "bg-[#0D2135]" : "bg-white"
                } w-fit px-1 flex items-center justify-center text-center  rounded-2xl cursor-pointer py-3  flex-[0_0_14.5%]`}
                onClick={() => DebtSection()}
              >
                <p
                  className={`font-Poppins-Medium text-sm flex items-center justify-center  ${
                    Section === "Debt" ? "text-white" : "text-black"
                  }`}
                >
                  {t("Debt")}
                </p>
              </div>
            </div>
          </div>

          {/* Pangration */}
          <AnalysisCount section={Section} />
          <Reviewers section={Section} />
          <Revenues section={Section} />
          <Expenses section={Section} />
          <Store section={Section} />
          <DoctorsReport section={Section} />
          <OfficesReport
            getOffices={getOffices}
            setGetOffices={setGetOffices}
            section={Section}
          />
          <Examinations section={Section} />
          <CollectedMoney section={Section} />
          <Debt section={Section} />
        </div>
      </div>
    </div>
  );
}

export default Reports;
