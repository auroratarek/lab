import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import DeleteUnitStore from "./UnitStore/DeleteUnitStore";
import EditUnitStore from "./UnitStore/EditUnitStore";
import { useDispatch, useSelector } from "react-redux";
import {
  addToUnitStore,
  selectUnitStores,
} from "../../../GlobalData/Basic Plugins/UnitStoreSlice";
import { useTranslation } from "react-i18next";

function UnitsStore({ type }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const UnitStoreSelector = useSelector(selectUnitStores);
  const [id, SetId] = useState(0);
  const [OpenDeleteUnitStore, setOpenDeleteUnitStore] = useState(false);
  const [OpenEditUnitStore, setOpenEditUnitStore] = useState(false);

  const ADDToTheTable = () => {
    // let Data = {
    //   id: UnitStoreSelector.length + 1,
    //   name: document.getElementById("UnitsStoreName").value,
    // };
    // dispatch(addToUnitStore(Data));
  };

  const Edit = (id) => {
    // SetId(id);
    // setOpenEditUnitStore(true);
  };

  const Delete = (id) => {
    // SetId(id);
    // setOpenDeleteUnitStore(true);
  };
  return (
    <div className={`${type === "UnitsStore" ? "block" : "hidden"} mt-10`}>
      <DeleteUnitStore
        id={id}
        open={OpenDeleteUnitStore}
        setOpen={setOpenDeleteUnitStore}
      />
      <EditUnitStore
        id={id}
        open={OpenEditUnitStore}
        setOpen={setOpenEditUnitStore}
      />
      <div className="">
        <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
          <input
            id="UnitsStoreName"
            placeholder={t("Units store name")}
            type="text"
            className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
          />
        </div>
        <div className="w-full flex justify-end mt-5">
          <div
            className="col-start-3 col-end-4 bg-[#0D2135]   flex items-center justify-center px-10 w-fit py-2 rounded-xl cursor-pointer "
            onClick={() => ADDToTheTable()}
          >
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Add To the Table")}
            </p>
          </div>
        </div>
        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-4 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5 w-[90%]">
              {t("Units store")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>
          {UnitStoreSelector
            ? UnitStoreSelector.map((Store) => (
                <tr className="border-b-[1px] w-full">
                  <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-5 ">
                    {Store.name}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
                    <div className="flex space-x-2 ">
                      <TiEdit
                        className="text-2xl  opacity-50 cursor-pointer"
                        onClick={() => Edit(Store.id)}
                      />
                      <IoTrashOutline
                        className="text-2xl text-[#F04438] cursor-pointer"
                        onClick={() => Delete(Store.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            : "Loading"}
          <tr className="border-b-[1px] w-full">
            <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-5 ">
              Units store name2
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

export default UnitsStore;
