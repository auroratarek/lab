import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import EditCurrenceies from "./EditCurrenceies";
import DeleteCurrencies from "./DeleteCurrencies";
import { t } from "i18next";

function Currencies({ type }) {
  const [OpenEditCurrency, setOpenEditCurrency] = useState(false);
  const [OpenDeleteCurrency, setOpenDeleteCurrency] = useState(false);

  return (
    <div className={`${type === "Currencies" ? "block" : "hidden"} mt-10`}>
      <EditCurrenceies open={OpenEditCurrency} setOpen={setOpenEditCurrency} />
      <DeleteCurrencies
        open={OpenDeleteCurrency}
        setOpen={setOpenDeleteCurrency}
      />
      <div className="">
        <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
          <input
            name=" CurrenciesName"
            placeholder={t("Currencies name")}
            type="text"
            className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
          />
        </div>
        <div className="w-full flex justify-end mt-5">
          <div className="col-start-3 col-end-4 bg-[#0D2135]   flex items-center justify-center px-10 w-fit py-2 rounded-xl cursor-pointer ">
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Add To the Table")}
            </p>
          </div>
        </div>
        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-4 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-8 w-[90%]">
              {t("Currencies name")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>

          <tr className="border-b-[1px] w-full">
            <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-8 ">
              Currencies name1
            </td>
            <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
              <div className="flex space-x-2 ">
                <TiEdit
                  className="text-2xl  opacity-50 cursor-pointer"
                  onClick={() => setOpenEditCurrency(true)}
                />
                <IoTrashOutline
                  className="text-2xl text-[#F04438] cursor-pointer"
                  onClick={() => setOpenDeleteCurrency(true)}
                />
              </div>
            </td>
          </tr>

          <tr className="border-b-[1px] w-full">
            <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-8 ">
              Currencies name2
            </td>
            <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
              <div className="flex space-x-2 ">
                <TiEdit className="text-2xl  opacity-50 cursor-pointer" />
                <IoTrashOutline className="text-2xl text-[#F04438] cursor-pointer" />
              </div>
            </td>
          </tr>
        </table>
        <div className=" flex justify-end space-x-8 mt-8 col-start-1 col-end-4">
          <div className="bg-transparent border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-16 py-2 rounded-xl cursor-pointer ">
            <p className="text-sm flex items-center justify-center text-black font-Poppins-Regular">
              {t("Cancel")}
            </p>
          </div>
          <div className="bg-[#B7C835] w-fit  flex items-center justify-center px-28 py-3 rounded-xl cursor-pointer ">
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Save")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Currencies;
