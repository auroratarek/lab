import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../Images/Logo.svg";
import UK from "../../Images/UK.png";

import SA from "../../Images/SA.png";
import { VscListFlat } from "react-icons/vsc";
import { Link } from "react-router-dom";

function drawer() {
  document.getElementById("drawerBody").classList.remove("hidden");
  document
    .getElementById("drawerBody")
    .classList.add(
      "flex",
      "fixed",
      "h-screen",
      "w-full",
      "bg-transparent",
      "top-0",
      "left-0",
      "lg:hidden",
      "z-10"
    );
}
function closeDrawer() {
  document.getElementById("drawerBody").classList.add("hidden");
}
function HeaderSystemDB() {
  const [lang, SetLang] = useState("UK");

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
  return (
    <div className="w-full   relative flex  justify-between">
      <img
        src={Logo}
        className="w-[5rem] h-20 rounded-xl bg-[#0D2135] ml-9 mr-8 pb-3 pt-2 hidden lg:block"
      />
      <div className="bg-white mr-[-1rem] lg:mr-0 rounded-l-xl ">
        <VscListFlat
          id="drawerbtn"
          className="text-black  text-xl m-2  cursor-pointer w-10 h-20 lg:hidden "
          onClick={() => drawer()}
        />
      </div>
      <div className=" p-5 bg-white flex items-center justify-between flex-grow rounded-xl">
        <div className="flex items-center w-[32%] flex-grow lg:flex-grow-0 mr-5 lg:mr-0  rounded-2xl bg-[#F2F4F7]">
          <RiSearch2Line className="ml-2 text-[#B9B9B9]  text-3xl" />
          <input
            dir="rtl"
            lang="ar"
            placeholder="Find the names of the reviewers here"
            className="p-2 bg-[#F2F4F7] w-full  focus:outline-none px-4  placeholder-[#B9B9B9] text-left rounded-2xl"
            type="text"
          />
        </div>
      </div>
      {/* Drawer */}
      <div id="drawerBody" className=" hidden  ">
        <div
          id="drawer"
          className=" w-full bg-[#0D2135] opacity-80 h-full md:w-1/2"
        >
          <div className="p-4">
            <AiOutlineClose
              className="text-xl text-white cursor-pointer "
              onClick={() => closeDrawer()}
            />
          </div>
          <div className="flex flex-col ml-10 md:ml-20 space-y-1 w-full justify-center  h-4/5 text-white ">
            {/* border-b-2 border-[#847244] */}
            <Link
              to="/SystemDashBoard"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center  text-xl  p-2 md:w-1/2 w-3/4"
            >
              <div className="font-Poppins-Regular text-sm">Type of Tupe</div>
            </Link>
            <Link
              to="/SystemDashBoard/Analytic"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4  text-xl p-2 "
            >
              <div className="font-Poppins-Regular text-sm">Analytic</div>
            </Link>
            <Link
              to="/SystemDashBoard/Labs"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4   text-xl p-2"
            >
              <div className="font-Poppins-Regular text-sm">Labs </div>
            </Link>
            <Link
              to="/SystemDashBoard/Quantity"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4   text-xl p-2"
            >
              <div className="font-Poppins-Regular text-sm">Quantity </div>
            </Link>
            <Link
              to="/SystemDashBoard/MeasuringUnit"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4   text-xl p-2"
            >
              <div className="font-Poppins-Regular text-sm">Test Unit </div>
            </Link>
            <Link
              to="/SystemDashBoard/TestMethod"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4   text-xl p-2"
            >
              <div className="font-Poppins-Regular text-sm">Test Method </div>
            </Link>
            <Link
              to="/SystemDashBoard/Gender"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4   text-xl p-2"
            >
              <div className="font-Poppins-Regular text-sm">Gender </div>
            </Link>
            <Link
              to="/SystemDashBoard/Profile"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4   text-xl p-2"
            >
              <div className="font-Poppins-Regular text-sm">Profile </div>
            </Link>
            <Link
              to="/SystemDashBoard"
              className="hover:bg-black rounded-xl cursor-pointer flex justify-center md:w-1/2 w-3/4  text-xl p-2"
            >
              <div className="font-Poppins-Regular text-sm">Logout</div>
            </Link>
          </div>
        </div>
        <div className="hidden sm:block h-full w-full bg-black opacity-40" />
      </div>
    </div>
  );
}

export default HeaderSystemDB;
