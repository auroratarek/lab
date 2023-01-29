import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { RiSendPlaneLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import EditAccountExport from "./EditAccountExport";
import DeleteAccountExport from "./DeleteAccountExport";
import { t } from "i18next";
// Example items, to simulate fetching from another resources.

function Items({
  setOpenDeleteAccountingExports,
  setOpenEditAccountingExports,
  currentItems,
}) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <tr className="border-b-[1px] ">
            <td className="w-fit">
              <input
                type="checkbox"
                className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
              />
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 flex flex-col">
              <p>{item.date}</p>
              <p className="text-xs font-medium text-[#908F8F]">{item.email}</p>
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
              {item.day}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
              {item.payment_amount}
            </td>
            <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
              {item.note}
            </td>
            <td>
              <div className="flex space-x-2 py-4">
                <TiEdit
                  className="text-2xl  opacity-50 cursor-pointer"
                  onClick={() => setOpenEditAccountingExports(true)}
                />
                <IoTrashOutline
                  className="text-2xl text-[#F04438] cursor-pointer"
                  onClick={() => setOpenDeleteAccountingExports(true)}
                />
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}

function ExportPangration({ section, itemsPerPage, Data }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [OpenEditAccountingExports, setOpenEditAccountingExports] =
    useState(false);
  const [OpenDeleteAccountingExports, setOpenDeleteAccountingExports] =
    useState(false);

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

  return (
    <div
      className={`${
        section === "exports" ? "block" : "hidden"
      } overflow-x-scroll`}
    >
      <EditAccountExport
        open={OpenEditAccountingExports}
        setOpen={setOpenEditAccountingExports}
      />
      <DeleteAccountExport
        open={OpenDeleteAccountingExports}
        setOpen={setOpenDeleteAccountingExports}
      />
      <table className="w-full h-full mt-8 bg-white rounded-t-2xl ">
        <tr className="border-b-[1px] w-full">
          <td className="w-[5%] pr-2 lg:pr-0">
            <input
              type="checkbox"
              className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
            />
          </td>
          <td className="text-sm pr-24 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 pl-2">
            {t("Date")}
          </td>
          <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[25%] ">
            {t("Day")}
          </td>
          <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 ">
            {t("Payment_amount")}
          </td>
          <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2  ">
            {t("Note")}
          </td>
          <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[9%]">
            {t("Action")}
          </td>
        </tr>
        <Items
          setOpenDeleteAccountingExports={setOpenDeleteAccountingExports}
          setOpenEditAccountingExports={setOpenEditAccountingExports}
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
export default ExportPangration;
