import React, { useState } from "react";
import { FcPrint } from "react-icons/fc";
import { IoCalendarOutline } from "react-icons/io5";
import DebtNames from "../../Images/Debt/DebtNames.svg";
import Amount from "../../Images/Debt/Amount.svg";

import ReactDatePicker from "react-datepicker";
import { t } from "i18next";

function Debt({ section }) {
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());

  const FromInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-3 rounded-xl justify-between items-center w-full outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Regular">
          {t("From")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black font-Poppins-Regular"
          >
            {props.value || props.placeholder}
          </label>
          <IoCalendarOutline
            onClick={props.onClick}
            className="ml-5 text-[#98A2B3]"
          />
        </div>
      </div>
    );
  });

  const ToInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-3 rounded-xl justify-between items-center w-full outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Regular">
          {t("To")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black font-Poppins-Regular"
          >
            {props.value || props.placeholder}
          </label>
          <IoCalendarOutline
            onClick={props.onClick}
            className="ml-5 text-[#98A2B3]"
          />
        </div>
      </div>
    );
  });
  return (
    <div className={`${section === "Debt" ? "block" : "hidden"}`}>
      <div className="bg-white mt-5 p-5 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 col-start-1 col-end-4">
            <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
              <input
                name="Name"
                placeholder={t("Name")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
              />
            </div>
            <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
              <input
                name="Amount"
                placeholder={t("Amount")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 col-start-1 col-end-4">
            <div className="w-full flex ">
              <ReactDatePicker
                id="date"
                dateFormat="yyyy/MM/dd"
                className=" "
                customInput={<FromInput />}
                selected={FromDate}
                onChange={(date) => setFromDate(date)}
              />
            </div>
            <div className="w-full flex ">
              <ReactDatePicker
                id="date"
                dateFormat="yyyy/MM/dd"
                className=" "
                customInput={<ToInput />}
                selected={ToDate}
                onChange={(date) => setToDate(date)}
              />
            </div>

            <div className="flex items-center space-x-5">
              <button
                type="button"
                className="flex border-[#D0D5DD] border-[1px] w-2/5 py-3 font-Poppins-Medium text-sm  bg-[#FFFFFF] justify-center rounded-xl text-black"
              >
                {t("Reset")}
              </button>

              <button
                type="button"
                className="flex  flex-grow py-3 font-Poppins-Medium text-sm  bg-[#B7C835] justify-center rounded-xl text-white"
              >
                {t("Apply")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 items-center">
        <div className="flex justify-center w-full items-center bg-white space-x-4 px-10 py-6 rounded-2xl">
          <img src={DebtNames} className="w-[52px] h-[52px]" />
          <div className="flex flex-col items-center space-y-3">
            <h1 className="font-Poppins-Bold  text-base">10000</h1>
            <p className="font-Poppins-Regular text-xs">{t("Names")}</p>
          </div>
        </div>
        <div className="flex justify-center w-full items-center bg-white space-x-4 px-10 py-6 rounded-2xl">
          <img src={Amount} className="w-[52px] h-[52px]" />
          <div className="flex flex-col items-center space-y-3">
            <h1 className="font-Poppins-Bold  text-base">10000</h1>
            <p className="font-Poppins-Regular text-xs">{t("Amount")}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col  bg-white px-8 pt-10 pb-5 rounded-lg mt-5">
        <div className="flex justify-between w-full">
          <h1 className="font-Poppins-Medium text-lg ">{t("Debt")}</h1>
          <div className="w-fit border-2 rounded-xl items-center flex space-x-5 px-10">
            <FcPrint className="text-xl" />
            <p className="font-Poppins-Medium text-sm">{t("Print")}</p>
          </div>
        </div>
        <div className="overflow-y-scroll scrollbar-hide h-64  w-full mt-5">
          <table className=" w-full    mb-5">
            <tr className="border-y-2 sticky top-0 bg-white">
              <td className="py-3 text-[#667085] pr-14 lg:pr-0  font-Poppins-Regular  text-sm  ">
                {t("Name (Patient or lab or company)")}
              </td>
              <td className="py-3 text-[#667085] pr-14 lg:pr-0 font-Poppins-Regular text-sm  ">
                {t("Date")}
              </td>
              <td className="py-3 text-[#667085] pr-14 lg:pr-0 font-Poppins-Regular text-sm ">
                {t("Amount (ID)")}
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">Singletechno</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">18/09/2022</td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Debt;
