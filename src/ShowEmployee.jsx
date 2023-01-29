import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import "react-datepicker/dist/react-datepicker.css";
import profile from "./Images/profile.jpg";
import { IoIosClose } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { VscListFlat } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { t } from "i18next";

import { RiSearch2Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from "./Images/Logo.svg";
import UK from "./Images/UK.png";
import NotifContainer from "./components/Home/NotifContainer";

import SA from "./Images/SA.png";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
function ShowEmployee() {
  const params = useParams();
  const { t, i18n } = useTranslation();

  const [BirthDate, setBirthDate] = useState(new Date());
  const [WorkDate, setWorkDate] = useState(new Date());
  const [getEmployee, setGetEmployee] = useState();

  const [To, ToonChange] = useState("10:00");
  const [From, FromonChange] = useState("10:00");
  useEffect(() => {
    axios
      .get(`lab-scope/staff-show/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setGetEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const BirthInput = React.forwardRef((props, ref) => {
    return (
      <div className=" p-3  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4  relative m-auto border-[1px] rounded-xl ">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("Date of birth")}
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

  const WorkInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex bg-[#F9FAFF] p-3 py-4 rounded-xl justify-between items-center w-full outline-0 border-2 ">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("Work start")}
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

  function printPage() {
    window.print();
  }
  return (
    <div className="w-full h-full pr-5 p-5">
      <div className="w-full flex ">
        <Header />
      </div>
      <div className="flex ">
        <SideBar page="Staff" />
        <div className="w-full h-full ml-8 mt-10">
          {getEmployee && (
            <div className="flex flex-col w-full justify-between">
              <div className="flex flex-col md:flex-row w-full space-x-2 justify-between border-b-[1px] pb-5">
                <div className="w-fit pr-2  rounded-lg flex items-center mr-5 space-x-5">
                  <img
                    src={`https://aurora-team.com/labs-obada/public/${getEmployee.image}`}
                    className="rounded-full w-[56px] h-[56px]  ml-2"
                  />
                  <h1 className="font-Poppins-Bold  text-xl">
                    {getEmployee.name}
                  </h1>
                </div>

                <div className="flex space-x-5 justify-between items-center">
                  <div className="flex items-center">
                    <p className="font-Poppins-Medium text-[#98A2B3] text-sm font-medium">
                      Added on{" "}
                      {moment(`${getEmployee.created_at}`).format("YYYY/MM/DD")}
                    </p>
                  </div>
                  <div className="hidden bg-[#F04438] w-fit py-3  flex items-center justify-center px-10 md:px-20 rounded-xl cursor-pointer ">
                    <p className="text-sm  flex items-center justify-center font-Poppins-Medium text-white">
                      {t("Delete")}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" mt-5">
                <div className="flex space-y-5 lg:space-y-0  lg:flex-row flex-col lg:space-x-5 w-full">
                  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 lg:w-[60%]">
                    <div className="relative mx-auto w-fit h-full rounded-2xl flex   bg-no-repeat">
                      <img
                        src={`https://aurora-team.com/labs-obada/public/${getEmployee.image}`}
                        className="w-[270px] h-[270px] bg-cover rounded-2xl "
                      />
                      <div className="w-full h-full pt-3 absolute flex justify-end ">
                        <IoIosClose className=" text-2xl  text-[#F04438] bg-[#FFFFFF] rounded-full  mr-2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:w-1/2 flex-grow">
                      <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                        <input
                          disabled
                          value={getEmployee.name}
                          name="Name"
                          placeholder={t("Name")}
                          type="text"
                          className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                        />
                      </div>
                      <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                        <input
                          disabled
                          value={getEmployee.email}
                          name="Email"
                          placeholder={t("Email")}
                          type="email"
                          className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                        />
                      </div>
                      <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                        <input
                          disabled
                          value={getEmployee.phone}
                          name="Phone number"
                          placeholder={t("Phone number")}
                          type="tel"
                          className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                        />
                      </div>
                      <div className="">
                        <ReactDatePicker
                          disabled
                          id="date"
                          value={getEmployee.DOB}
                          dateFormat="yyyy/MM/dd"
                          className=" "
                          customInput={<BirthInput />}
                          selected={BirthDate}
                          onChange={(date) => setBirthDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5 lg:w-[40%]">
                    <textarea
                      disabled
                      value={getEmployee.experiance}
                      placeholder={t("Experience")}
                      name="Experience"
                      className=" bg-[#F9FAFF] row-span-2 text-xs border-[#E4E7EC] w-full h-full  flex  items-center py-3 px-4 outline-0 ring-0   relative  border-[1px] rounded-xl "
                      rows={6}
                    />
                    <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                      <input
                        disabled
                        value={getEmployee.collage}
                        name="College"
                        placeholder={t("College")}
                        type="text"
                        className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                      />
                    </div>
                    <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                      <input
                        disabled
                        value={getEmployee.salary}
                        name="Salary rate"
                        placeholder={t("Salary rate")}
                        type="text"
                        className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex space-y-5 lg:space-y-0  lg:space-x-5 lg:flex-row flex-col  mt-5">
                  <div className="flex flex-col space-y-5 lg:w-[60%]">
                    <div className=" bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                      <input
                        disabled
                        value={getEmployee.address}
                        name="Address"
                        placeholder={t("Address")}
                        type="text"
                        className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                      />
                    </div>
                    <div className=" flex space-x-5 justify-between">
                      <div className="w-fit lg:w-full pr-2  bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center lg:mr-5">
                        <select
                          disabled
                          value={getEmployee.job.name}
                          name="JobTitle"
                          className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                        >
                          <option
                            value=""
                            selected
                            disabled
                            hidden
                            className=""
                          >
                            {getEmployee.job.name}
                          </option>
                        </select>
                      </div>
                      <div className="w-full">
                        <ReactDatePicker
                          disabled
                          id="date"
                          value={getEmployee.work_start}
                          dateFormat="yyyy/MM/dd"
                          className=" "
                          customInput={<WorkInput />}
                          selected={WorkDate}
                          onChange={(date) => setWorkDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5 lg:w-[40%]">
                    <div className="w-full py-1 lg:py-0 flex-grow pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5">
                      <select
                        disabled
                        name="Specialization"
                        className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                      >
                        <option value="" selected disabled hidden className="">
                          {getEmployee.spec
                            ? getEmployee.spec.name
                            : "Specialization"}
                        </option>
                      </select>
                    </div>
                    <div className="flex  bg-[#F9FAFF] items-center justify-end rounded-xl flex-grow">
                      <p className="bg-[#F9FAFF] opacity-80 font-Poppins-Medium text-xs text-[#98A2B3] pl-5">
                        {t("Worktime")}
                      </p>
                      <div className="flex x items-center justify-end rounded-xl flex-grow">
                        <div className="bg-[#F9FAFF] border-[#E4E7EC] px-4  h-fit  flex  items-center   border-r-[1px] rounded-l-xl">
                          <TimePicker
                            disabled
                            disableClock={true}
                            locale="sv-sv"
                            onChange={FromonChange}
                            value={getEmployee.work_time_start}
                            clearIcon={""}
                            className="w-fit text-xs"
                          />
                          <IoMdTime className="text-[#98A2B3] w-[20px] h-[20px]" />
                        </div>
                        <div className="bg-[#F9FAFF] border-[#E4E7EC] px-4  h-fit  flex  items-center   border-l-[1px] rounded-r-xl">
                          <TimePicker
                            value={getEmployee.work_time_end}
                            disabled
                            locale="sv-sv"
                            disableClock={true}
                            onChange={ToonChange}
                            clearIcon={""}
                            // value={To}
                            className="w-fit text-xs"
                          />
                          <IoMdTime className="text-[#98A2B3] w-[20px] h-[20px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <textarea
                  disabled
                  value={getEmployee.note}
                  placeholder={t("Notes")}
                  name="Notes"
                  className="mt-8  text-xs font-Poppins-Medium placeholder:text-[#98A2B3] bg-[#F9FAFF] border-[#E4E7EC] w-full h-full  flex  items-center py-3 px-4 outline-0 ring-0   relative  border-[1px] rounded-xl "
                  rows={5}
                />
                <div className="flex md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-6 justify-end space-x-2 mt-20">
                  <Link
                    to="/Staff"
                    className="print:hidden bg-transparent border-[1px]  border-[#D0D5DD] w-fit  flex items-center justify-center lg:px-16 px-8 py-2 rounded-xl cursor-pointer "
                  >
                    <p className=" text-sm flex items-center justify-center text-black font-Poppins-Regular">
                      {t("Cancel")}
                    </p>
                  </Link>
                  <div
                    id="printbtn"
                    onClick={printPage}
                    className="print:hidden bg-transparent border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center lg:px-16 px-8 py-2 rounded-xl cursor-pointer "
                  >
                    <p className="text-sm flex items-center justify-center text-black font-Poppins-Regular">
                      {t("Print")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowEmployee;
