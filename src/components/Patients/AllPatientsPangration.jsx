import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import ShowPatient from "./ShowPatient";
import EditPatient from "./EditPatient";
import DeletePatient from "./DeletePatient";
import { t } from "i18next";

// Example items, to simulate fetching from another resources.

function Items({
  setOpenDeletePatient,
  setOpenShowPatient,
  setOpenEditPatient,
  currentItems,
}) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <tr className="border-b-[1px] ">
            <td className="w-fit">
              <input
                name="check"
                type="checkbox"
                className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
              />
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 flex flex-col">
              <p>{item.name}</p>
              <p className="text-xs font-Poppins-Regular font-medium text-[#908F8F]">
                {item.email}
              </p>
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
              {item.DateOfVisit}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
              {item.Phone}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
              {item.Gender}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
              {item.Age}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5">
              {item.Doctor}
            </td>
            <td>
              <div className="flex space-x-2 py-4">
                <AiOutlineEye
                  className="text-2xl text-black cursor-pointer"
                  onClick={() => setOpenShowPatient(true)}
                />
                <TiEdit
                  className="text-2xl  opacity-50 cursor-pointer"
                  onClick={() => setOpenEditPatient(true)}
                />

                <IoTrashOutline
                  className="text-2xl text-[#F04438] cursor-pointer"
                  onClick={() => setOpenDeletePatient(true)}
                />
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}

function AllPatientsPangration({ itemsPerPage, Data }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [OpenEditPatient, setOpenEditPatient] = useState(false);
  const [OpenShowPatient, setOpenShowPatient] = useState(false);
  const [OpenDeletePatient, setOpenDeletePatient] = useState(false);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = Data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(Data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );

    setItemOffset(newOffset);
  };
  const Checkall = () => {
    if (document.getElementById("HeadCheck").checked) {
      let checks = document.getElementsByName("check");
      for (let i = 0; i <= checks.length; i++) {
        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheck").checked) {
      let checks = document.getElementsByName("check");
      for (let i = 0; i <= checks.length; i++) {
        checks[i].checked = false;
      }
    }
  };
  return (
    <div className={` overflow-x-scroll`}>
      <ShowPatient open={OpenShowPatient} setOpen={setOpenShowPatient} />
      <EditPatient open={OpenEditPatient} setOpen={setOpenEditPatient} />
      <DeletePatient open={OpenDeletePatient} setOpen={setOpenDeletePatient} />

      <table className="w-full h-full mt-5 bg-white rounded-t-2xl ">
        <tr className="border-b-[1px] w-full">
          <td className="w-fit  pr-2 lg:pr-0">
            <input
              id="HeadCheck"
              type="checkbox"
              className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
              onClick={() => Checkall()}
            />
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  pr-20 lg:pr-0">
            {t("Patient name")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2   pr-20 lg:pr-0">
            {t("Date of visit")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-2 pr-20 lg:pr-0">
            {t("Phone number")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%] pr-20 lg:pr-0 ">
            {t("Gender")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%] pr-20 lg:pr-0">
            {t("Age")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5 pr-20 lg:pr-0">
            {t("Doctor")}
          </td>

          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[13%] pr-20 lg:pr-0">
            {t("Action")}
          </td>
        </tr>
        <Items
          setOpenEditPatient={setOpenEditPatient}
          setOpenShowPatient={setOpenShowPatient}
          setOpenDeletePatient={setOpenDeletePatient}
          currentItems={currentItems}
          className="w-full bg-white"
        />
      </table>

      <ReactPaginate
        breakLabel={<BsThreeDots />}
        nextLabel={
          <div className="bg-white py-[0.4rem] px-2  rounded-lg">
            <HiOutlineArrowRight className="bg-white text-xl" />
          </div>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel={
          <div className="bg-white py-[0.4rem] px-2  rounded-lg">
            <HiOutlineArrowLeft className="bg-white text-xl" />
          </div>
        }
        pageClassName="bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
        containerClassName="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
        activeClassName="bg-[#B7C835] text-[#FFFFFF] "
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
export default AllPatientsPangration;
