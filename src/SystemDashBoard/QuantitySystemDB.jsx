import React, { useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

import { Link } from "react-router-dom";
import { VscListFlat } from "react-icons/vsc";
import HeaderSystemDB from "../components/SystemDashBoard/HeaderSystemDB";
import SideBarSystemDB from "../components/SystemDashBoard/SideBarSystemDB";

function QuantitySystemDB() {
  return (
    <div className="w-full h-full pr-5 p-5">
      <div className="w-full flex ">
        <HeaderSystemDB />
      </div>
      <div className="flex ">
        <SideBarSystemDB page="Quantity" />
        <div className="w-full h-full lg:ml-8 mt-10">
          {/* Pangration */}

          <div className={`  mt-10 mb-10`}>
            <table className="w-full h-full mt-5  bg-white  rounded-2xl ">
              <tr className="border-b-[1px] w-full">
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-8 w-[50%]">
                  Quantity of Labs
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[50%]">
                  Quantity of Reports
                </td>
              </tr>

              <tr className="border-b-[1px] w-full">
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 pl-8 ">
                  500
                </td>
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 pl-8 ">
                  200
                </td>
              </tr>
              <tr className="border-b-[1px] w-full">
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 pl-8 ">
                  200
                </td>
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 pl-8 ">
                  20
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuantitySystemDB;
