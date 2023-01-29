import React, { useState } from "react";
import profile from "../../Images/profile.jpg";
import { BsThreeDots } from "react-icons/bs";
import { FaMobile } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { t } from "i18next";
import DeleteEmployee from "./DeleteEmployee";

function EmployerContainer({
  id,
  name,
  setDataBeforeFilter,
  work,
  page,
  setData,
  phone,
  email,
  image,
}) {
  const [OpenDeleteEmployss, setOpenDeleteEmployss] = useState(false);
  const [ide, setIde] = useState(0);

  const ShowSettings = () => {
    if (
      document.getElementById(`DropSettings-${id}`).classList.contains("hidden")
    ) {
      document.getElementById(`DropSettings-${id}`).classList.remove("hidden");
      document.getElementById(`DropSettings-${id}`).classList.add("flex");
    } else if (
      !document
        .getElementById(`DropSettings-${id}`)
        .classList.contains("hidden")
    ) {
      document.getElementById(`DropSettings-${id}`).classList.add("hidden");
      document.getElementById(`DropSettings-${id}`).classList.remove("flex");
    }
  };

  const remove = (id) => {
    if (
      !document
        .getElementById(`DropSettings-${id}`)
        .classList.contains("hidden")
    ) {
      document.getElementById(`DropSettings-${id}`).classList.add("hidden");
      document.getElementById(`DropSettings-${id}`).classList.remove("flex");
    }
    setIde(id);
    console.log(id);
    setOpenDeleteEmployss(true);
  };
  return (
    <div className="w-full rounded-2xl bg-white mt-10">
      <DeleteEmployee
        setDataBeforeFilter={setDataBeforeFilter}
        page={page}
        setData={setData}
        id={ide}
        name={name}
        open={OpenDeleteEmployss}
        setOpen={setOpenDeleteEmployss}
      />
      <div className="relative w-full flex">
        <div className="relative w-1/3">
          <BsThreeDots
            className="m-5 cursor-pointer"
            onClick={() => ShowSettings()}
          />
        </div>
        <div className=" flex-grow flex items-center  ">
          <img
            src={`https://aurora-team.com/labs-obada/public/${image}`}
            className="rounded-full w-[72px] h-[72px] mt-[-3rem] ml-7 sm:ml-2"
          />
        </div>
      </div>
      <div className="w-full h-full relative">
        {/* Drop */}
        <div
          id={`DropSettings-${id}`}
          className="hidden  flex-col w-[60%] absolute top-0 left-5 pt-3 px-1 rounded-md  shadow-around pb-2 bg-white"
        >
          <Link
            to={`/Staff/ShowEmployee/${id}`}
            className="w-full flex items-center space-x-2 py-1 relative group"
          >
            <div className="bg-[#b7c835] opacity-10 absolute w-full h-full rounded-md hidden group-hover:block" />

            <AiFillEye className="text-[#98A2B3] text-xl" />
            <h1 className="font-Poppins-Regular text-[#98A2B3] text-sm">
              {t("View profile")}
            </h1>
          </Link>

          <Link
            // to="/Staff/EditEmployee"
            to={`/Staff/EditEmployee/${id}`}
            className="flex items-center space-x-2 py-1  relative group"
          >
            <div className="bg-[#b7c835] opacity-10 absolute w-full h-full rounded-md hidden group-hover:block" />
            <RiEdit2Fill className="text-[#B7C835] text-xl" />
            <h1 className="font-Poppins-Regular font-semibold text-[#B7C835] text-sm">
              {t("Edit")}
            </h1>
          </Link>

          <div
            className="flex cursor-pointer items-center space-x-2 py-1 relative group"
            onClick={() => remove(id)}
          >
            <div className="bg-[#b7c835] opacity-10 absolute w-full h-full rounded-md hidden group-hover:block" />
            <IoMdTrash className="text-[#F04438] text-xl " />
            <h1 className="font-Poppins-Regular text-[#F04438] text-sm">
              {t("Delete")}
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col pb-2 border-b-[1px]">
          <h1 className="font-Poppins-SemiBold text-base">{name}</h1>
          <p className="font-Poppins-Medium text-[#98A2B3] text-xs">{work}</p>
        </div>

        <div className="flex  items-center py-3  border-b-[1px] space-x-2 pl-5  ">
          <FaMobile className="text-[#667085] w-[18px] h-[18px]" />
          <p className="font-Poppins-Medium text-[#667085] text-xs">{phone}</p>
        </div>

        <div className="flex  items-center   border-b-[1px] space-x-2 pl-5  py-4 ">
          <MdEmail className="text-[#667085] w-[18px] h-[18px]" />
          <p className="font-Poppins-Medium text-[#667085] text-xs">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployerContainer;
