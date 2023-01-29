import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import HeaderDoctorDH from "./components/DoctorDashBoardComponents/HeaderDoctorDH";
import DoctorDashBoardPangration from "./components/DoctorDashBoardComponents/DoctorDashBoardPangration";

const labs = [
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
  {
    id: 1,
    patientName: "ahmed",
    date: "1/1/2023",
    LabName: "halabi",
  },
];

function DoctorDashBoard() {
  return (
    <div className="w-full h-full pr-5 p-5">
      <HeaderDoctorDH />
      <div className="flex ">
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full justify-between">
            <div className="flex w-full  space-x-2">
              <div className="w-fit pr-2 bg-white rounded-lg flex items-center mr-5">
                <select className=" w-fit  rounded-lg font-Poppins-Medium  text-base outline-none px-4 py-2 cursor-pointer">
                  <option value="" selected disabled hidden>
                    Sort by
                  </option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pangration */}

          <DoctorDashBoardPangration itemsPerPage={8} Data={labs} />
        </div>
      </div>
    </div>
  );
}

export default DoctorDashBoard;
