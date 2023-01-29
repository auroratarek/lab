import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllSpecialization,
  addToSpecialization,
  selectSpecializations,
} from "../../../GlobalData/Basic Plugins/SpecializationSlice";
import EditSpecialization from "./Specialization/EditSpecialization";
import DeleteSpecialization from "./Specialization/DeleteSpecialization";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function Specialization({ type }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const SpecializationsSelector = useSelector(selectSpecializations);
  const [id, SetId] = useState();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ready, setReady] = useState(true);
  const [OpenDeleteSpecialization, setOpenDeleteSpecialization] =
    useState(false);
  const [OpenEditSpecialization, setOpenEditSpecialization] = useState(false);

  const Edit = (id) => {
    SetId(id);
    setOpenEditSpecialization(true);
  };
  useEffect(() => {
    GetSpecializations();
  }, []);
  const Delete = (id) => {
    SetId(id);
    setOpenDeleteSpecialization(true);
  };
  const GetSpecializations = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");

    await axios
      .get(`lab-scope/specializations`)
      .then((response) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        dispatch(addAllSpecialization(response.data));
      })
      .catch((err) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        console.log("data");
      });
  };
  const AddToTable = async () => {
    setReady(false);
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");

    await axios
      .post("lab-scope/specialization-store", { name: name })
      .then((response) => {
        GetSpecializations();
        setReady(true);

        setError("");
        setName("");
      })
      .catch((err) => {
        setReady(true);

        setError(err.response.data.message);

        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
      });
    // let Data = {
    //   id: SpecializationsSelector.length + 1,
    //   name: document.getElementById("Specialization").value,
    // };
    // if (!Data.name) {
    //   document.getElementById("Message").classList.remove("invisible");
    // } else {
    //   document.getElementById("Message").classList.add("invisible");
    //   dispatch(addToSpecialization(Data));
    //   document.getElementById("Specialization").value = "";
    // }
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className={`${type === "Specialization" ? "block" : "hidden"} mt-10`}>
      <DeleteSpecialization
        id={id}
        open={OpenDeleteSpecialization}
        setOpen={setOpenDeleteSpecialization}
      />
      <EditSpecialization
        id={id}
        open={OpenEditSpecialization}
        setOpen={setOpenEditSpecialization}
      />
      <div className="">
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
            <input
              id="Specialization"
              placeholder={t("Specialization")}
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
            type="button"
            disabled={!ready}
            className={`col-start-3 col-end-4 ${
              ready ? "bg-[#0D2135] " : "bg-gray-600"
            }  flex items-center justify-center px-10 w-fit py-2 rounded-xl `}
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
              {t("Specialization")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>
          {SpecializationsSelector
            ? SpecializationsSelector.map((title) => (
                <tr className="border-b-[1px] w-full">
                  <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-5 ">
                    {title.name}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
                    <div className="flex space-x-2 ">
                      <TiEdit
                        className="text-2xl  opacity-50 cursor-pointer"
                        onClick={() => Edit(title.id)}
                      />
                      <IoTrashOutline
                        className="text-2xl text-[#F04438] cursor-pointer"
                        onClick={() => Delete(title.id)}
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

export default Specialization;
