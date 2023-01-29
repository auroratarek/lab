import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiHome5Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { TbActivityHeartbeat } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { ImLab } from "react-icons/im";
import { MdOutlinePersonPin } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { RiFileList2Line } from "react-icons/ri";
import { TbCalculator } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { VscListFlat } from "react-icons/vsc";

import PateintContainer from "./components/Home/PateintContainer";
import Datepicker from "react-tailwindcss-datepicker";
import UK from "./Images/UK.png";
import SA from "./Images/SA.png";
import profile from "./Images/profile.jpg";
import Logo from "./Images/Logo.svg";
import Analysis from "./Images/HomeImg/Analysis.svg";
import AnalysisToday from "./Images/HomeImg/AnalysisToday.svg";
import DoctorsImg from "./Images/HomeImg/DoctorsImg.svg";
import MicroScope from "./Images/HomeImg/MicroScope.svg";
import PatientsImg from "./Images/HomeImg/PatientsImg.svg";
import Workers from "./Images/HomeImg/Workers.svg";

import DoctorContainer from "./components/Home/DoctorContainer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import NotifContainer from "./components/Home/NotifContainer";
import { Link } from "react-router-dom";
import ProfileEdit from "./components/Home/ProfileEdit";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const tests = [
  {
    last: 100,
    current: 50,
  },
  {
    last: 150,
    current: 400,
  },
  {
    last: 200,
    current: 180,
  },
];

const ShowNotification = () => {
  if (document.getElementById("Notification").classList.contains("hidden")) {
    document.getElementById("Notification").classList.remove("hidden");
  } else if (
    !document.getElementById("Notification").classList.contains("hidden")
  ) {
    document.getElementById("Notification").classList.add("hidden");
  }
};

function Home() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const [lang, SetLang] = useState("en");
  const [panel, setPanel] = useState(true);
  const [OpenProfileEdit, SetOpenProfileEdit] = useState(false);
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
        title: {
          display: true,
          text: t("Reviewers Section"),
          color: "black",
          font: { weight: "bold", size: 20 },
          align: "end",
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: t("Last Year"),
        data: tests.map((data) => data.last),
        backgroundColor: "#0D2135",
        borderRadius: 20,
      },
      {
        label: t("Current Year"),
        data: tests.map((data) => data.current),
        backgroundColor: "#B7C835",
        borderRadius: 20,
      },
    ],
  };

  const ShowLaguages = () => {
    if (document.getElementById("lang").classList.contains("hidden")) {
      document.getElementById("lang").classList.remove("hidden");
      document.getElementById("CurrentLang").classList.add("hidden");
      document.getElementById("CloseLangIcon").classList.remove("hidden");
    } else if (!document.getElementById("lang").classList.contains("hidden")) {
      document.getElementById("lang").classList.add("hidden");
      document.getElementById("CurrentLang").classList.remove("hidden");
      document.getElementById("CloseLangIcon").classList.add("hidden");
    }
  };

  useEffect(() => {
    document
      .getElementById("DatePickerHome")
      .children[0].children[0].classList.remove(
        "dark:bg-slate-800",
        "dark:text-white/80",
        "dark:border-slate-600"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[0].classList.remove(
        "dark:bg-slate-800",
        "dark:border-slate-600"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].classList.remove(
        "dark:text-white",
        "dark:border-slate-600"
      );
    // document.getElementById("DatePickerHome").children[0].children[2]
    // .children[1].children[0].children[0].children
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[1].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[1].children[1].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[2].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].classList.remove(
        "dark:border-gray-700"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[1].children[0].classList.remove(
        "dark:border-gray-700"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].classList.remove(
        "dark:bg-slate-800"
      );

    removeTheDark();
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].classList.remove(
        "dark:border-gray-700"
      );

    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[1].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[1].children[1].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[2].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
  }, []);

  const removeTheDark = () => {
    let numbers =
      document.getElementById("DatePickerHome").children[0].children[2]
        .children[1].children[0].children[0].children[0].children[1].children[1]
        .children;
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].classList.remove("dark:bg-white/10");
    }
    let numbers2 =
      document.getElementById("DatePickerHome").children[0].children[2]
        .children[1].children[0].children[0].children[2].children[1].children[1]
        .children;
    for (let i = 0; i < numbers2.length; i++) {
      numbers2[i].classList.remove("dark:bg-white/10");
    }
  };

  const changeToAR = () => {
    SetLang(i18n.language);
    i18n.changeLanguage("ar");
  };

  const changeToEg = () => {
    SetLang(i18n.language);
    i18n.changeLanguage("en");
  };

  const [Data, setData] = useState();
  const [LastPatient, setLastPatient] = useState();
  const [LastDoctor, setLastDoctor] = useState();
  const [Store, setStore] = useState();

  useEffect(() => {
    axios.get(`lab-scope/home`).then((res) => {
      console.log(res);
      setData(res.data);
      setLastPatient(res.data.last_ten_petient);
      setLastDoctor(res.data.myDoctors);
      setStore(res.data.my_store);
    });
  }, []);

  return (
    <div className=" h-full flex justify-around p-5 lg:pr-10">
      <ProfileEdit open={OpenProfileEdit} setOpen={SetOpenProfileEdit} />
      <div className="h-full w-full flex justify-around">
        {/* left */}
        <div>
          <img
            src={Logo}
            className="w-[5.5rem] ml-2 h-20 rounded-xl hidden lg:block bg-[#0D2135] pb-3 pt-2"
          />
          <SideBar page="Home" section="Home" />
        </div>
        {/* center */}
        <div className="w-full lg:w-3/4 h-full relative">
          {/* Notif */}
          <Header section={"Home"} />

          <div
            className={`${
              panel ? "" : "hidden"
            } relative bg-[#0D2135]  w-full h-fit sm:h-60 rounded-3xl mt-10`}
          >
            <div className="w-fit  absolute right-2 top-5">
              <IoIosClose
                onClick={() => setPanel(false)}
                className=" text-2xl cursor-pointer text-[#FFFFFF] border-[1px] rounded-full  mr-8 "
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-evenly items-center h-full  pb-5">
              <img
                src={MicroScope}
                className="mt-3 sm:mt-0 w-[194px] h-[194px]"
              />
              <div className="flex flex-col justify-center space-y-2">
                <p className="text-[#FFFFFF] ">
                  👋
                  <span className="opacity-50 font-Poppins-Regular text-base">
                    {" "}
                    {t("Hi")} , Ali AbuSamra
                  </span>
                </p>
                <p className="text-[#FFFFFF] font-Poppins-Medium text-2xl ">
                  {t("Welcome to LeaLap")}
                </p>
                <p className="text-[#FFFFFF] font-Poppins-Regular text-base opacity-50">
                  {t("We are glad you are joining us. Good day!")}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-8">
            <div className="flex flex-col items-center justify-center w-full  bg-[#E0F2FE] rounded-2xl px-3 pt-5 pb-8">
              <img src={AnalysisToday} className="w-[64px] h-[64px] mb-3" />
              <h1 className="text-base"> {Data && Data.total_today}</h1>
              <p className="text-xs text-[#000000] opacity-50">
                {t("Analysis today")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-[#FEE4E2] rounded-2xl px-3 pt-5 pb-8">
              <img src={PatientsImg} className="w-[64px] h-[64px] mb-3" />
              <h1 className="text-base font-Poppins-Medium">
                {Data && Data.pateint}
              </h1>
              <p className="text-xs text-[#000000] font-Poppins-Regular opacity-50">
                {t("Patients")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-[#FEF0C7] rounded-2xl px-3 pt-5 pb-8">
              <img src={Analysis} className="w-[64px] h-[64px] mb-3" />
              <h1 className="text-base font-Poppins-Medium">
                {Data && Data.total_number_of_analysis}
              </h1>
              <p className="text-xs text-[#000000] font-Poppins-Regular opacity-50">
                {t("Analysis")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-[#D1FADF] rounded-2xl px-3 pt-5 pb-8">
              <img src={Workers} className="w-[64px] h-[64px] mb-3" />
              <h1 className="text-base font-Poppins-Medium">
                {Data && Data.staff}
              </h1>
              <p className="text-xs text-[#000000] font-Poppins-Regular opacity-50">
                {t("Workers")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-[#EAECF5] rounded-2xl px-3 pt-5 pb-8">
              <img src={DoctorsImg} className="w-[64px] h-[64px] mb-3" />
              <h1 className="text-base font-Poppins-Medium">
                {Data && Data.doctors}
              </h1>
              <p className="text-xs text-[#000000] font-Poppins-Regular opacity-50">
                {t("Doctors")}
              </p>
            </div>
          </div>
          {/* Char */}
          <div className="w-full h-[23rem] mt-5 bg-white rounded-2xl p-5">
            <Bar options={options} data={data} />
          </div>

          <div className="w-full h-full  bg-white px-5 pt-10 rounded-lg mt-5">
            <div className="w-full flex justify-between items-center mb-5">
              <h1 className="font-Poppins-Regular text-lg ">
                {t("Store Lab")}
              </h1>
              <div
                id="DatePickerHome"
                className="w-[40%] border-2 rounded-xl  "
              >
                <Datepicker
                  primaryColor={"Dark:bg-blue"}
                  value={value}
                  onChange={handleValueChange}
                />
              </div>
            </div>
            <table className="block w-full h-56 overflow-y-scroll scrollbar-hide mb-5">
              <tr className="border-y-2  sticky top-0 bg-white">
                <td className="py-2 text-[#667085 ]  font-Poppins-Regular pr-20 lg:pr-0  text-sm w-[20%]">
                  {t("Material name")}
                </td>
                <td className="py-2 text-[#667085] font-Poppins-Regular pr-20 lg:pr-0 text-sm  w-[10%]">
                  {t("Quantity")}
                </td>
                <td className="py-2 text-[#667085] font-Poppins-Regular pr-20 lg:pr-0 text-sm w-[10%]">
                  {t("Company")}
                </td>
                <td className="py-2 text-[#667085] font-Poppins-Regular pr-20 lg:pr-0 text-sm w-[10%]">
                  {t("EXP")}
                </td>
                <td className="py-2 text-[#667085] font-Poppins-Regular pr-20 lg:pr-0 text-sm w-[10%]">
                  {t("Model")}
                </td>
                <td className="py-2 text-[#667085] font-Poppins-Regular pr-20 lg:pr-0 text-sm w-[12%]">
                  {t("Test unit")}
                </td>
              </tr>
              {/* Store */}
              {Store &&
                Store.map((item) => (
                  <tr className="mt-2 border-b-[1px]">
                    <td className="py-[0.4rem] ">
                      <div className="flex items-center">
                        <img
                          src={`https://aurora-team.com/labs-obada/public/${item.image}`}
                          className="w-10 h-10 rounded-full"
                        />
                        <p className="ml-2 font-Poppins-Regular">
                          {item.product_name}
                        </p>
                      </div>
                    </td>
                    <td className="py-1 text-sm font-Poppins-Regular">
                      {item.quantity}
                    </td>
                    <td className="py-1 text-sm font-Poppins-Regular">
                      {item.company}
                    </td>
                    <td className="py-1 text-sm font-Poppins-Regular">
                      {item.expire_date ? item.expire_date : item.out_date}
                    </td>
                    <td className="py-1 text-sm font-Poppins-Regular">
                      {item.model}
                    </td>
                    <td className="py-1 text-sm font-Poppins-Regular">
                      {item.test_unit.unit}
                    </td>
                  </tr>
                ))}
              {/* <tr className="mt-2 border-b-[1px]">
                <td className="py-[0.4rem]">
                  <div className="flex items-center">
                    <img src={profile} className="w-10 h-10 rounded-full" />
                    <p className="ml-2 font-Poppins-Regular">Material name</p>
                  </div>
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">100</td>
                <td className="py-1 text-sm font-Poppins-Regular">Company</td>
                <td className="py-1 text-sm font-Poppins-Regular">2022/9/22</td>
                <td className="py-1 text-sm font-Poppins-Regular">
                  Model here
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">Kg</td>
              </tr>
              <tr className="mt-2 border-b-[1px]">
                <td className="py-[0.4rem] mt-2">
                  <div className="flex items-center">
                    <img src={profile} className="w-10 h-10 rounded-full" />
                    <p className="ml-2 font-Poppins-Regular">Material name</p>
                  </div>
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">100</td>
                <td className="py-1 text-sm font-Poppins-Regular">Company</td>
                <td className="py-1 text-sm font-Poppins-Regular">2022/9/22</td>
                <td className="py-1 text-sm font-Poppins-Regular">
                  Model here
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">Kg</td>
              </tr>
              <tr className="mt-2 border-b-[1px]">
                <td className="py-[0.4rem] mt-2">
                  <div className="flex items-center">
                    <img src={profile} className="w-10 h-10 rounded-full" />
                    <p className="ml-2 font-Poppins-Regular">Material name</p>
                  </div>
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">100</td>
                <td className="py-1 text-sm font-Poppins-Regular">Company</td>
                <td className="py-1 text-sm font-Poppins-Regular">2022/9/22</td>
                <td className="py-1 text-sm font-Poppins-Regular">
                  Model here
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">Kg</td>
              </tr>
              <tr className="mt-2 border-b-[1px]">
                <td className="py-[0.4rem] mt-2">
                  <div className="flex items-center">
                    <img src={profile} className="w-10 h-10 rounded-full" />
                    <p className="ml-2 font-Poppins-Regular">Material name</p>
                  </div>
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">100</td>
                <td className="py-1 text-sm font-Poppins-Regular">Company</td>
                <td className="py-1 text-sm font-Poppins-Regular">2022/9/22</td>
                <td className="py-1 text-sm font-Poppins-Regular">
                  Model here
                </td>
                <td className="py-1 text-sm font-Poppins-Regular">Kg</td>
              </tr> */}
            </table>
          </div>

          <div className="w-full h-full  lg:hidden">
            <div className="bg-white pt-16 px-8 h-full flex flex-col items-center justify-center rounded-xl">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-Poppins-semibold ">
                    {t("Last Pateint")}
                  </h1>
                  <Link to="/Patients" className="flex space-x-2 items-center">
                    <p className="text-[#B7C835] font-Poppins-Regular font-semibold">
                      {t("View all")}
                    </p>
                    <div className="border-2 w-fit h-fit rounded-md border-[#B7C835] ">
                      <MdOutlineKeyboardArrowRight className="text-[#B7C835] text-lg opacity-50" />
                    </div>
                  </Link>
                </div>

                <div className=" w-full mt-5 h-80  overflow-y-scroll scrollbar-hide">
                  {LastPatient &&
                    LastPatient.map((item) => (
                      <PateintContainer
                        date_of_visit={item.date_of_visit}
                        name={item.name}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="bg-white px-8 pt-5 mt-10  h-fit flex flex-col rounded-xl">
              <h1 className="font-Poppins-semibold  mb-5 text-lg">
                {t("Doctors section")}
              </h1>
              <div className="h-64 overflow-y-scroll scrollbar-hide">
                {LastDoctor &&
                  LastDoctor.map((item) => (
                    <DoctorContainer name={item.name} address={item.address} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="w-[40%] h-full hidden lg:block">
        <div className="bg-white pt-16 px-5 h-full flex flex-col items-center justify-center rounded-xl">
          <div className="flex flex-col    w-full justify-center items-center">
            <div className="flex flex-col  pb-8  w-full justify-center items-center">
              <div className="w-44 h-44 border-2 relative rounded-full flex justify-center items-center">
                <img src={profile} className="rounded-full w-40 h-40" />
                <TiEdit
                  className="absolute text-[#101828] cursor-pointer bg-white rounded-full p-1 text-4xl right-1 bottom-2"
                  onClick={() => SetOpenProfileEdit(true)}
                />
                <GoPrimitiveDot className="absolute bg-white rounded-full text-[#32D583]  text-2xl left-1 top-6" />
              </div>
              <h1 className="mt-5 text-[#101828] text-xl font-Poppins-Regular font-semibold">
                Ahmed mohammad
              </h1>
              <p className="text-[#98A2B3] text-lg font-Poppins-Regular">
                Admin
              </p>
            </div>
            <hr className="  bg-gray-200 border-[1px] my-4 w-full rounded-lg" />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-Poppins-Regular font-semibold">
                {t("Last Pateint")}
              </h1>
              <Link to="/Patients" className="flex space-x-2 items-center">
                <p className="text-[#B7C835] font-Poppins-Regular font-semibold">
                  {t("View all")}
                </p>
                <div className="border-2 w-fit h-fit rounded-md border-[#B7C835] ">
                  <MdOutlineKeyboardArrowRight className="text-[#B7C835] text-lg opacity-50" />
                </div>
              </Link>
            </div>
            {/* LastPatient */}
            <div className=" w-full mt-5 h-80  overflow-y-scroll scrollbar-hide">
              {LastPatient &&
                LastPatient.map((item) => (
                  <PateintContainer
                    date_of_visit={item.date_of_visit}
                    name={item.name}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="bg-white px-5 pt-5 mt-10  h-fit flex flex-col rounded-xl">
          <h1 className="font-Poppins-Regular font-semibold mb-5 text-lg">
            {t("Doctors section")}
          </h1>
          <div className="h-64 overflow-y-scroll scrollbar-hide">
            {LastDoctor &&
              LastDoctor.map((item) => (
                <DoctorContainer name={item.name} address={item.address} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
