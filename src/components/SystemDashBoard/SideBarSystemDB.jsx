import React from "react";
import { GiTestTubes } from "react-icons/gi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { ImLab } from "react-icons/im";
import { CiLogout } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";
import { TfiRulerPencil } from "react-icons/tfi";
import { TbGenderMale } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

import { GiHypodermicTest } from "react-icons/gi";

import { Link } from "react-router-dom";

function SideBarSystemDB({ page }) {
    const handleLogout=()=>{
    localStorage.setItem("token","");
    localStorage.setItem("admin",false);

    window.location.replace("/login");
  }
  return (
    <div className="h-full pl-[2rem] hidden lg:block">
      <div className="bg-white rounded-xl w-fit py-5 px-1 mt-10">
        <Link to="/SystemDashBoard" className="flex flex-col items-center ">
          <GiTestTubes
            className={`w-6 h-6  ${
              page === "Colors" ? "text-[#B7C835] " : "text-[#98A2B3]"
            }  `}
          />
          <p
            className={`${
              page === "Colors" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }  text-sm mt-1 font-Poppins-Regular text-center`}
          >
            Type of Tupe
          </p>
        </Link>

        <Link
          to="/SystemDashBoard/Analytic"
          className="flex flex-col items-center mt-5"
        >
          <TbActivityHeartbeat
            className={`w-6 h-6 ${
              page === "Analytic" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }  border-2 rounded-md`}
          />
          <p
            className={`${
              page === "Analytic" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            Analytic
          </p>
        </Link>

        <Link
          to="/SystemDashBoard/Labs"
          className="flex flex-col items-center mt-5"
        >
          <ImLab
            className={`w-6 h-6  ${
              page === "Labs" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Labs" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            Labs
          </p>
        </Link>
        <Link
          to="/SystemDashBoard/Quantity"
          className="flex flex-col items-center mt-5"
        >
          <FaDatabase
            className={`w-6 h-6  ${
              page === "Quantity" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Quantity" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            Quantity
          </p>
        </Link>
        <Link
          to="/SystemDashBoard/MeasuringUnit"
          className="flex flex-col items-center mt-5"
        >
          <TfiRulerPencil
            className={`w-6 h-6  ${
              page === "MeasuringUnit" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "MeasuringUnit" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-xs mt-1  font-Poppins-Regular text-center`}
          >
            Test Unit
          </p>
        </Link>
        <Link
          to="/SystemDashBoard/TestMethod"
          className="flex flex-col items-center mt-5"
        >
          <GiHypodermicTest
            className={`w-6 h-6  ${
              page === "TestMethod" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "TestMethod" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular text-center`}
          >
            Test Method
          </p>
        </Link>
        <Link
          to="/SystemDashBoard/Gender"
          className="flex flex-col items-center mt-5"
        >
          <TbGenderMale
            className={`w-6 h-6  ${
              page === "Gender" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Gender" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular text-center`}
          >
            Gender
          </p>
        </Link>
        <Link
          to="/SystemDashBoard/ProfileSDB"
          className="flex flex-col items-center mt-5"
        >
          <CgProfile
            className={`w-6 h-6  ${
              page === "Profile" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Profile" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular text-center`}
          >
            Profile
          </p>
        </Link>
        <div
        onClick={handleLogout}
        className="flex flex-col items-center mt-[11.8rem]">
          <CiLogout className="w-6 h-6  text-[#F04438]" />
          <p className="text-[#F04438] text-sm mt-1  font-Poppins-Regular">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideBarSystemDB;
