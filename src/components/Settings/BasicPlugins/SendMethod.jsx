import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";

import DeleteCompanies from "./Companies/DeleteCompanies";
import EditCompanies from "./Companies/EditCompanies";
import { useTranslation } from "react-i18next";
import DeleteSendMethod from "./SendMethod/DeleteSendMethod";
import EditSendMethod from "./SendMethod/EditSendMethod";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllSendMethod,
  addToSendMethod,
  selectSendMethods,
} from "../../../GlobalData/Basic Plugins/SendMethodSlice";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function SendMethod({ type }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const SendMethodsSelector = useSelector(selectSendMethods);
  const [id, SetId] = useState();
  const [OpenDeleteSendMethod, setOpenDeleteSendMethod] = useState(false);
  const [OpenEditSendMethod, setOpenEditSendMethod] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ready, setReady] = useState(true);

  const Edit = (id) => {
    SetId(id);
    setOpenEditSendMethod(true);
  };
  const GetSendMethods = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .get(`lab-scope/sendMethods`)
      .then((response) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        dispatch(addAllSendMethod(response.data));
      })
      .catch((err) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        console.log("data");
      });
  };
  useEffect(() => {
    GetSendMethods();
  }, []);

  const Delete = (id) => {
    SetId(id);
    setOpenDeleteSendMethod(true);
  };

  const AddToTable = async () => {
    setReady(false);
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .post("lab-scope/create-sendMethod", { name: name })
      .then((response) => {
        GetSendMethods();
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
    //   id: SendMethodsSelector.length + 1,
    //   method: document.getElementById("SendMethod").value,
    // };

    // dispatch(addToSendMethod(Data));
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className={`${type === "SendMethod" ? "block" : "hidden"} mt-10`}>
      <DeleteSendMethod
        id={id}
        open={OpenDeleteSendMethod}
        setOpen={setOpenDeleteSendMethod}
      />
      <EditSendMethod
        id={id}
        open={OpenEditSendMethod}
        setOpen={setOpenEditSendMethod}
      />
      <div className="">
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
            <input
              id="SendMethod"
              placeholder={t("Send Method")}
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
            type={"button"}
            disabled={!ready}
            className={`col-start-3 col-end-4 ${
              ready ? "bg-[#0D2135]" : "bg-gray-600"
            }    flex items-center justify-center px-10 w-fit py-2 rounded-xl`}
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
              {t("Send Method")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>
          {SendMethodsSelector
            ? SendMethodsSelector.map((Method) => (
                <tr className="border-b-[1px] w-full">
                  <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-5 ">
                    {Method.name}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
                    <div className="flex space-x-2 ">
                      <TiEdit
                        className="text-2xl  opacity-50 cursor-pointer"
                        onClick={() => Edit(Method.id)}
                      />
                      <IoTrashOutline
                        className="text-2xl text-[#F04438] cursor-pointer"
                        onClick={() => Delete(Method.id)}
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

export default SendMethod;
