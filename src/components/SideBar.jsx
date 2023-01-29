import Reat from "react";
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
import { FiSettings } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { t } from "i18next";
import i18n from "../i18n";

function SideBar({ page, section }) {
  const handleLogout=()=>{
    localStorage.setItem("lab_token","");
    localStorage.setItem("lab",false);

    window.location.replace("/login");
  }
  return (
    <div
      className={`h-full ${
        section == "Home" ? "pl-[0.4rem]" : "pl-[2.20rem]"
      }  hidden lg:block`}
    >
      <div
        className={`bg-white rounded-xl w-fit ${
          i18n.language == "en"
            ? `px-1 ${section == "Home" ? "px-[0.3rem] mt-11" : "mt-10"}`
            : `px-4 ${section == "Home" ? "px-[0.65rem] mt-11" : "mt-10"}`
        }  py-5 `}
      >
        <Link to="/" className="flex flex-col items-center ">
          <RiHome5Fill
            className={`w-6 h-6  ${
              page === "Home" ? "text-[#B7C835] " : "text-[#98A2B3]"
            }  `}
          />
          <p
            className={`${
              page === "Home" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }  text-sm mt-1 font-Poppins-Regular `}
          >
            {t("Home")}
          </p>
        </Link>
        <Link to="/Patients" className="flex  flex-col items-center mt-5">
          <IoIosPeople
            className={` w-6 h-6 ${
              page === "Patients" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } `}
          />
          <p
            className={`${
              page === "Patients" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }  text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Patients")}
          </p>
        </Link>
        <Link to="/Analytic" className="flex flex-col items-center mt-5">
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
            {t("Analytic")}
          </p>
        </Link>
        <Link to="/Doctors" className="flex flex-col items-center mt-5">
          <CgProfile
            className={`w-6 h-6 ${
              page === "Doctors" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Doctors" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }  text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Doctors")}
          </p>
        </Link>
        <Link to="/Labs" className="flex flex-col items-center mt-5">
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
            {t("Labs")}
          </p>
        </Link>
        <Link to="/Staff" className="flex flex-col items-center mt-5">
          <MdOutlinePersonPin
            className={`w-6 h-6  ${
              page === "Staff" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Staff" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Staff")}
          </p>
        </Link>
        <Link to="/Store" className="flex flex-col items-center mt-5">
          <FaWarehouse
            className={`w-6 h-6  ${
              page === "Store" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Store" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Store")}
          </p>
        </Link>
        <Link to="/Reports" className="flex flex-col items-center mt-5">
          <RiFileList2Line
            className={`w-6 h-6  ${
              page === "Reports" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Reports" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Reports")}
          </p>
        </Link>
        <Link to="/Accounting" className="flex flex-col items-center mt-5">
          <TbCalculator
            className={`w-6 h-6  ${
              page === "Accounting" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Accounting" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Accounting")}{" "}
          </p>
        </Link>
        <Link to="/Suppliers" className="flex flex-col items-center mt-5">
          <FaShippingFast
            className={`w-6 h-6  ${
              page === "Suppliers" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Suppliers" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Suppliers")}
          </p>
        </Link>
        <Link to="/Settings" className="flex flex-col items-center mt-5">
          <FiSettings
            className={`w-6 h-6  ${
              page === "Settings" ? "text-[#B7C835]" : "text-[#98A2B3]"
            }`}
          />
          <p
            className={`${
              page === "Settings" ? "text-[#B7C835]" : "text-[#98A2B3]"
            } text-sm mt-1 font-Poppins-Regular`}
          >
            {t("Settings")}
          </p>
        </Link>
        <div
        onClick={handleLogout}
        className="flex flex-col items-center mt-28">
          <CiLogout className="w-6 h-6  text-[#F04438]" />
          <p className="text-[#F04438] text-center text-sm mt-1  font-Poppins-Regular">
            {t("Logout")}
          </p>
        </div>
       
      </div>
    </div>
  );
}

export default SideBar;
