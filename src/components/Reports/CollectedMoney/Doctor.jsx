import React, { useState } from "react";
import { FcPrint } from "react-icons/fc";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import { t } from "i18next";

function Doctor({ SubSection }) {
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const FromInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-4 rounded-xl justify-between items-center w-full outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("From")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black text-xs font-Poppins-Medium"
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
      <div className="flex p-4 rounded-xl justify-between items-center w-full outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("To")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black text-xs font-Poppins-Medium"
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
    <div className={`${SubSection === "Doctor" ? "" : "hidden"}`}>
      <div className="bg-white mt-5 p-5 rounded-2xl">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  ">
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              name="PatientName"
              placeholder={t("Patient name")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              name="Doctor"
              placeholder={t("Doctor")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              name="AnalysisName"
              placeholder={t("Analysis name")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              name="DrRatio"
              placeholder={t("Dr.Ratio")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              name="DoctorAmount"
              placeholder={t("Doctor's amount")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              name="Checkups"
              placeholder={t("Checkups")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
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

      <div className="mt-5 grid grid-cols-3 lg:grid-cols-6 gap-5 items-center">
        <div className="flex flex-col w-full h-full text-center items-center bg-white space-y-3 px-8 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Patients")}</p>
        </div>
        <div className="flex flex-col w-full h-full text-center items-center bg-white space-y-3 px-8 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Doctors")}</p>
        </div>
        <div className="flex flex-col w-full h-full text-center items-center bg-white space-y-3 px-8 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Analysis")}</p>
        </div>
        <div className="flex flex-col w-full h-full text-center items-center bg-white space-y-3 px-8 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">50%</h1>
          <p className="font-Poppins-Regular text-xs">{t("Dr.Ratio")}</p>
        </div>
        <div className="flex flex-col w-full h-full text-center items-center bg-white space-y-3 px-8 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Doctor amounts")}</p>
        </div>
        <div className="flex flex-col w-full h-full text-center items-center bg-white space-y-3 px-8 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Amount analysis")}</p>
        </div>
      </div>

      <div className="w-full h-full flex flex-col  bg-white px-8 pt-10 pb-5 rounded-lg mt-5">
        <div className="flex justify-between w-full">
          <h1 className="font-Poppins-Medium text-lg ">
            {t("Collected money")}
          </h1>
          <div className="w-fit border-2 rounded-xl items-center flex space-x-5 px-10">
            <FcPrint className="text-xl" />
            <p className="font-Poppins-Medium text-sm">{t("Print")}</p>
          </div>
        </div>
        <div className="overflow-scroll scrollbar-hide h-64  w-full mt-5">
          <table className=" w-full    mb-5">
            <tr className="border-y-2 sticky top-0 bg-white">
              <td className="py-3 text-[#667085] pr-20 lg:pr-0 font-Poppins-Regular  text-sm  ">
                {t("Patient name")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-0 font-Poppins-Regular text-sm  ">
                {t("Doctor's name")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-0 font-Poppins-Regular text-sm ">
                {t("Analysis name")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-0 font-Poppins-Regular text-sm ">
                {t("Dr. Ratio")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-0 font-Poppins-Regular text-sm ">
                {t("Doctor's amount")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-0 font-Poppins-Regular text-sm ">
                {t("Amount analysis")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-0 font-Poppins-Regular text-sm ">
                {t("Date")}
              </td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">
                    Savannah Nguyen
                  </p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Dr.Mark F.Barry
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Marvin McKinney
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">10%</td>
              <td className="py-3 text-sm font-Poppins-Regular">58741101</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">15/08/2022</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
