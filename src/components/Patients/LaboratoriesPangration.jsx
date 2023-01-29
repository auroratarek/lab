import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { RiSendPlaneLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { BsDash } from "react-icons/bs";
import { GiCircle } from "react-icons/gi";
import SendPatient from "./Laboratories/SendPatient";
import Complete from "./Laboratories/Complete";
import { t } from "i18next";
import ShowPLab from "./Laboratories/ShowPLab";
import EditPLab from "./Laboratories/EditPLab";
import DeletePLab from "./Laboratories/DeletePLab";
import axios from "axios";

// Example items, to simulate fetching from another resources.

function Items({
  setDatas,
  setOpenDeletePatient,
  setOpenEditPatient,
  setOpenShowPatient,
  currentItems,
  setOpenComplete,
  setOpenSendPatient,
}) {
  const PatientSend = () => {
    setOpenSendPatient(true);
  };
  const getAnalaysis = async (id) => {
    await axios.get(`lab-scope/get_result_data?id=${90}`).then((response) => {
      console.log(response.data, "hi");
      setDatas(response.data);
      // setIds((ids) => [...ids, checks[i].value]);
    });
  };
  const CompletePatient = () => {
    setOpenComplete(true);
    getAnalaysis();
  };
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <tr className="border-b-[1px] ">
            <td className="w-fit pr-2 lg:pr-0">
              <input
                name="check"
                type="checkbox"
                className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
              />
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 flex flex-col pr-20 lg:pr-0">
              <p>{item.name}</p>
              <p className="text-xs font-medium text-[#908F8F]">{item.email}</p>
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6  pr-20 lg:pr-0">
              {item.DateOfVisit}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2 pr-20 lg:pr-0">
              {item.Phone}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pr-20 lg:pr-0">
              {item.Gender}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pr-20 lg:pr-0">
              {item.Age}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5 pr-20 lg:pr-0">
              {item.Doctor}
            </td>
            <td>
              <div className="flex space-x-2 items-center py-4">
                <GiCircle
                  className={`text-xl font-bold  ${
                    item.completed
                      ? "bg-[#12B76A] rounded-full text-[#12B76A]"
                      : "text-[#98A2B3]"
                  }  cursor-pointer`}
                  onClick={() => CompletePatient()}
                />
                <BsDash
                  className="text-2xl font-bold text-yellow-600 cursor-pointer"
                  onClick={() => PatientSend()}
                />
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

function LaboratoriesPangration({ section, itemsPerPage, Data }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [OpenSendPatient, setOpenSendPatient] = useState(false);
  const [OpenComplete, setOpenComplete] = useState(false);
  const [OpenDeletePatient, setOpenDeletePatient] = useState(false);
  const [OpenEditPatient, setOpenEditPatient] = useState(false);
  const [OpenShowPatient, setOpenShowPatient] = useState(false);
  const [Datas, setDatas] = useState();
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
    <div className={`${section === "Laboratories" ? "block" : "hidden"}`}>
      <SendPatient open={OpenSendPatient} setOpen={setOpenSendPatient} />
      <Complete Data={Datas} open={OpenComplete} setOpen={setOpenComplete} />
      <ShowPLab open={OpenShowPatient} setOpen={setOpenShowPatient} />
      <EditPLab open={OpenEditPatient} setOpen={setOpenEditPatient} />
      <DeletePLab open={OpenDeletePatient} setOpen={setOpenDeletePatient} />

      <table className="w-full h-full mt-5 bg-white rounded-t-2xl ">
        <tr className="border-b-[1px] w-full">
          <td className="w-fit">
            <input
              id="HeadCheck"
              type="checkbox"
              className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
              onClick={() => Checkall()}
            />
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 ">
            {t("Patient name")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  ">
            {t("Date of visit")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-2">
            {t("Phone number")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%] ">
            {t("Gender")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%]">
            {t("Age")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5">
            {t("Doctor")}
          </td>

          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[15%]">
            {t("Action")}
          </td>
        </tr>
        <Items
          setDatas={setDatas}
          setOpenEditPatient={setOpenEditPatient}
          setOpenDeletePatient={setOpenDeletePatient}
          setOpenShowPatient={setOpenShowPatient}
          currentItems={currentItems}
          className="w-full bg-white"
          setOpenSendPatient={setOpenSendPatient}
          setOpenComplete={setOpenComplete}
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
export default LaboratoriesPangration;
