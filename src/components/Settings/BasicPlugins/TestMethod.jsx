import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import DeleteTestMethod from "./TestMethod/DeleteTestMethod";
import EditTestMethod from "./TestMethod/EditTestMethod";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllTestMethod,
  addToTestMethod,
  selectTestMethods,
} from "../../../GlobalData/Basic Plugins/TestMethodSlice";
import { Oval } from "react-loader-spinner";
import axios from "axios";

function TestMethod({ type }) {
  const [OpenDeleteTestMethod, setOpenDeleteTestMethod] = useState(false);
  const [OpenEditTestMethod, setOpenEditTestMethod] = useState(false);
  const dispatch = useDispatch();
  const TestMethodSelector = useSelector(selectTestMethods);
  const [id, SetId] = useState(0);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ready, setReady] = useState(true);
  const GetTestMethods = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .get(`lab-scope/get-TestMethods`)
      .then((response) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        dispatch(addAllTestMethod(response.data));
      })
      .catch((err) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        console.log("data");
      });
  };
  useEffect(() => {
    GetTestMethods();
  }, []);

  const ADDToTheTable = async () => {
    setReady(false);
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .post("lab-scope/create-TestMethod", { test_method: name })
      .then((response) => {
        GetTestMethods();
        setReady(true);

        setError("");
        setName("");
      })
      .catch((err) => {
        setReady(true);

        setError(err.response.data.test_method[0]);
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
      });
  };

  const Edit = (id) => {
    SetId(id);
    setOpenEditTestMethod(true);
  };

  const Delete = (id) => {
    SetId(id);
    setOpenDeleteTestMethod(true);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className={`${type === "TestMethod" ? "block" : "hidden"} mt-10`}>
      <DeleteTestMethod
        id={id}
        open={OpenDeleteTestMethod}
        setOpen={setOpenDeleteTestMethod}
      />
      <EditTestMethod
        id={id}
        open={OpenEditTestMethod}
        setOpen={setOpenEditTestMethod}
      />
      <div className="">
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
            <input
              id="TestMethodName"
              placeholder={t("Test method")}
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
            type={"button"}
            className={`${
              ready ? "bg-[#0D2135] " : "bg-gray-600"
            } col-start-3 col-end-4   flex items-center justify-center px-10 w-fit py-2 rounded-xl `}
            onClick={() => ADDToTheTable()}
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
              {t("Test method")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>
          {TestMethodSelector
            ? TestMethodSelector.map((Method) => (
                <tr className="border-b-[1px] w-full">
                  <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-5 ">
                    {Method.test_method}
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

export default TestMethod;
