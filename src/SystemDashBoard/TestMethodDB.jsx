import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { VscListFlat } from "react-icons/vsc";
import SideBarSystemDB from "../components/SystemDashBoard/SideBarSystemDB";
import { TiEdit } from "react-icons/ti";
import HeaderSystemDB from "../components/SystemDashBoard/HeaderSystemDB";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import EditTestMethod from "../components/SystemDashBoard/TestMethod/EditTestMethod";
import {
  addAllTestMethod,
  addToTestMethod,
  selectTestMethods,
} from "../GlobalData/SystemDashBoard/TestMethodSlice";
import DeleteTestMethod from "../components/SystemDashBoard/TestMethod/DeleteTestMethod";
import { Oval } from "react-loader-spinner";

function TestMethodDB() {
  const [id, setId] = useState(0);
  const [OpenEditTestMethod, setOpenEditTestMethod] = useState(false);
  const [OpenDeleteTestMethod, setOpenDeleteTestMethod] = useState(false);
  const dispatch = useDispatch();
  const TestMethodSelector = useSelector(selectTestMethods);
  const [error, setError] = useState("");

  const GetTestMethods = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios.get(`/admin-scope/get-TestMethods`).then((response) => {
      dispatch(addAllTestMethod(response.data));
      document.getElementById("Loader").classList.add("hidden");
      document.getElementById("Loader").classList.remove("flex");
    });
  };

  useEffect(() => {
    GetTestMethods();
  }, []);

  const Edit = (id) => {
    setId(id);
    setOpenEditTestMethod(true);
  };

  const remove = (id) => {
    setId(id);

    setOpenDeleteTestMethod(true);
  };

  const AddToTable = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    let formdata = new FormData();
    formdata.append("test_method", document.getElementById("TestMethod").value);
    await axios
      .post(`/admin-scope/create-TestMethod`, formdata)
      .then((response) => {
        GetTestMethods();
        setError("");
        document.getElementById("TestMethod").value = "";
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
      })
      .catch((error) => {
        setError(error.response.data.test_method[0]);
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
      });
  };
  return (
    <div className="w-full h-full pr-5 p-5">
      <EditTestMethod
        open={OpenEditTestMethod}
        setOpen={setOpenEditTestMethod}
        id={id}
      />
      <DeleteTestMethod
        open={OpenDeleteTestMethod}
        setOpen={setOpenDeleteTestMethod}
        id={id}
      />
      <div className="w-full flex ">
        <HeaderSystemDB />
      </div>
      <div className="flex ">
        <SideBarSystemDB page="TestMethod" />
        <div className="w-full h-full lg:ml-8 mt-10 pb-48">
          {/* Pangration */}
          <div className={`  mt-10 mb-10`}>
            <div className="flex w-full justify-between space-x-10 col-start-1 col-end-3">
              <div className="w-full">
                <div className="border-[#E4E7EC] w-[50%] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4  relative border-[1px] rounded-xl ">
                  <input
                    id="TestMethod"
                    placeholder="Test Method"
                    type="text"
                    className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                  />
                </div>
                <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                  {error}
                </span>
              </div>
              <div
                onClick={() => AddToTable()}
                className=" bg-[#0D2135] w-[30%] h-fit lg:w-[20%]  flex items-center justify-center px-5 lg:px-10  py-2 rounded-xl cursor-pointer "
              >
                <p className="text-sm flex items-center text-center justify-center text-white font-Poppins-Medium">
                  Add to table
                </p>
              </div>
            </div>

            <div
              id="Loader"
              className="hidden  justify-center items-center mt-5 w-full text-center m-auto"
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
            <div className="h-full max-h-[20rem] mt-5 overflow-y-scroll scrollbar-hide">
              <table className="w-full h-full    bg-white  rounded-2xl col-start-1 col-end-3 ">
                <tr className="border-b-[1px] sticky top-0 bg-white z-[2] w-full">
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 pl-8 w-[85%]">
                    Test Method
                  </td>
                  <td className="text-sm text-[#98A2B3]  font-Poppins-Regular py-1 w-[15%]">
                    Action
                  </td>
                </tr>
                {TestMethodSelector
                  ? TestMethodSelector.map((test) => (
                      <tr className="border-b-[1px] w-full">
                        <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 pl-8 ">
                          {test.test_method}
                        </td>
                        <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 ">
                          <div className="flex space-x-2 ">
                            <TiEdit
                              id={test.id}
                              className="text-2xl  opacity-50 cursor-pointer"
                              onClick={() => Edit(test.id)}
                            />
                            <IoTrashOutline
                              id={test.id}
                              className="text-2xl text-[#F04438] cursor-pointer"
                              onClick={() => remove(test.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  : "Loading"}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestMethodDB;
