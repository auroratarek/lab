import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import DeleteUnit from "./MeasurementUnit/DeleteUnit";
import EditUnit from "./MeasurementUnit/EditUnit";
import { t } from "i18next";
import {
  addAllTestUnit,
  addToTestUnit,
  selectTestUnits,
} from "../../../GlobalData/Basic Plugins/TestUnitSlice";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import axios from "axios";

function MeasurementUnits({ setDataBeforeFilter, type }) {
  const [OpenDeleteUnit, setOpenDeleteUnit] = useState(false);
  const [OpenEditUnit, setOpenEditUnit] = useState(false);
  const [id, SetId] = useState();
  const SelectUnit = useSelector(selectTestUnits);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ready, setReady] = useState(true);
  const GetTestUnits = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .get(`lab-scope/get-TestUnits`)
      .then((response) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        dispatch(addAllTestUnit(response.data));
        setDataBeforeFilter(response.data);
      })
      .catch((err) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        console.log("data");
      });
  };
  useEffect(() => {
    GetTestUnits();
  }, []);

  const Edit = (id) => {
    SetId(id);
    setOpenEditUnit(true);
  };
  const Delete = (id) => {
    SetId(id);
    setOpenDeleteUnit(true);
  };
  const AddToTable = async () => {
    setReady(false);
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .post("lab-scope/create-TestUnit", { test_unit: name })
      .then((response) => {
        setReady(true);

        GetTestUnits();
        setError("");
        setName("");
      })
      .catch((err) => {
        setReady(true);

        setError(err.response.data.error);
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
      });
    // let Data = {
    //   id: SelectUnit.length + 1,
    //   name: document.getElementById("MeasurementUnitName").value,
    // };
    // console.log(Data);
    // dispatch(addToTestUnit(Data));
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  return (
    <div
      className={`${type === "MeasurementUnits" ? "block" : "hidden"} mt-10`}
    >
      <DeleteUnit id={id} open={OpenDeleteUnit} setOpen={setOpenDeleteUnit} />
      <EditUnit id={id} open={OpenEditUnit} setOpen={setOpenEditUnit} />
      <div className="">
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
            <input
              id="MeasurementUnitName"
              placeholder={t("Test unit name")}
              onChange={handleChangeName}
              value={name}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
            />
          </div>
          <span id="" className=" text-sm text-red-600 ">
            {error}
          </span>
        </div>
        <div className="w-full flex justify-end mt-5">
          <button
            disabled={!ready}
            className={`col-start-3 col-end-4 ${
              ready ? "bg-[#0D2135] " : "bg-gray-500"
            }   flex items-center justify-center px-10 w-fit py-2 rounded-xl `}
            onClick={() => AddToTable()}
          >
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Add To the Table")}
            </p>
          </button>
        </div>
        <div
          id="Loader"
          className="hidden   justify-center items-center mt-5 w-full text-center mx-auto"
        >
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-4 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5 w-[90%]">
              {t("Test unit")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>
          {SelectUnit
            ? SelectUnit.map((Unit) => (
                <tr className="border-b-[1px] w-full">
                  <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-5 ">
                    {Unit.unit}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
                    <div className="flex space-x-2 ">
                      <TiEdit
                        className="text-2xl  opacity-50 cursor-pointer"
                        onClick={() => Edit(Unit.id)}
                      />
                      <IoTrashOutline
                        className="text-2xl text-[#F04438] cursor-pointer"
                        onClick={() => Delete(Unit.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            : "Loading"}
        </table>
      </div>
    </div>
  );
}

export default MeasurementUnits;
