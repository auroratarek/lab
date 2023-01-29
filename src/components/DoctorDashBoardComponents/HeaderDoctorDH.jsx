import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../Images/Logo.svg";
import UK from "../../Images/UK.png";

import SA from "../../Images/SA.png";

function HeaderDoctorDH() {
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
        className="w-[5.5rem] h-20 rounded-xl bg-[#0D2135] ml-9 mr-8 pb-3 pt-2 hidden lg:block"
      />
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

        <div className="flex justify-center items-center space-x-5">
          <div
            className="relative bg-[#F2F4F7] p-[0.6rem] w-fit lg:p-[0.6rem] rounded-full "
            onClick={() => ShowLaguages()}
          >
            <img
              id="CurrentLang"
              src={lang === "UK" ? UK : SA}
              className="w-6 sm:w-6 h-6 rounded-full cursor-pointer"
            />
            <AiOutlineClose
              id="CloseLangIcon"
              className="hidden text-xl text-black cursor-pointer "
            />
            <div
              id="lang"
              className="hidden  absolute w-[80%] right-[0.21rem] rounded-b-xl shadow-md   flex-col justify-center items-center  bg-[#F2F4F7]    "
            >
              <div
                className="mt-1 bg-[#F2F4F7] p-[0.2rem] hover:bg-gray-200 w-fit  rounded-full cursor-pointer"
                onClick={() => SetLang("SA")}
              >
                <img src={SA} className=" w-16 sm:w-6 h-6 rounded-full" />
              </div>
              <div
                className=" bg-[#F2F4F7] p-[0.2rem] w-fit hover:bg-gray-200  rounded-full cursor-pointer"
                onClick={() => SetLang("UK")}
              >
                <img src={UK} className=" w-16 sm:w-6 h-6 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDoctorDH;
