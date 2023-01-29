import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { VscListFlat } from "react-icons/vsc";
import SideBarSystemDB from "./components/SystemDashBoard/SideBarSystemDB";
import { TiEdit } from "react-icons/ti";
import HeaderSystemDB from "./components/SystemDashBoard/HeaderSystemDB";
import axios from "axios";
import EditTupe from "./components/SystemDashBoard/Tupe/EditTupe";
import DeleteTupe from "./components/SystemDashBoard/Tupe/DeleteTupe";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllTupe,
  addToTupe,
  selectTubes,
} from "./GlobalData/SystemDashBoard/TupeSlice";
import { Oval } from "react-loader-spinner";

function SystemDashBoard() {
  const [id, setId] = useState(0);
  const [OpenEditTupe, setOpenEditTupe] = useState(false);
  const [OpenDeleteTupe, setOpenDeleteTupe] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const TupeSelector = useSelector(selectTubes);
  const [error, setError] = useState("");

  const [editedName, setEditedName] = useState("");



  useEffect(() => {
    GetTupes();
  }, []);

  const Edit = (id) => {
    setId(id);
    setOpenEditTupe(true);
  };

  const remove = (id) => {
    setId(id);

    setOpenDeleteTupe(true);
  };
  const GetTupes = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");

    await axios
      .get(`admin-scope/tupes`)
      .then((response) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");

        dispatch(addAllTupe(response.data.data));
      })
      .catch((err) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");

        console.log("data");
      });
  };

  const AddToTable = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");

    let tupe = [];
    tupe[0] = document.getElementById("Color").value;
    let formdata = new FormData();
    formdata.append("tupe", tupe[0]);
    await axios
      .post("admin-scope/typeOftupe", formdata)
      .then((response) => {
        GetTupes();
        document.getElementById("Color").value = "";
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);

        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
      });
  };

  useEffect(() => {
    // async () => {
    GetTupes();
    // };
  }, []);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className="w-full h-full pr-5 p-5">
      <EditTupe open={OpenEditTupe} setOpen={setOpenEditTupe} id={id} />
      <DeleteTupe open={OpenDeleteTupe} setOpen={setOpenDeleteTupe} id={id} />
      <div className="w-full flex ">
        <HeaderSystemDB />
      </div>
      <div className="flex ">
        <SideBarSystemDB page="Colors" />
        <div className="w-full h-full  lg:ml-8 mt-10 pb-48">
          {/* Pangration */}
          <div className={`  mt-10 mb-10`}>
            <div className="flex w-full justify-between space-x-10 col-start-1 col-end-3">
              <div className="w-full">
                <div className="border-[#E4E7EC] w-[50%] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4  relative border-[1px] rounded-xl ">
                  <input
                    onChange={handleChangeName}
                    id="Color"
                    placeholder="Tube"
                    type="text"
                    className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                  />
                </div>
                <span id="Color_error" className=" text-sm text-red-600 ">
                  {error}
                </span>
              </div>
              <div
                onClick={() => AddToTable()}
                className=" bg-[#0D2135] w-[30%] lg:w-[20%] h-fit  flex items-center justify-center px-5 lg:px-10  py-2 rounded-xl cursor-pointer "
              >
                <p className="text-sm flex items-center text-center justify-center text-white font-Poppins-Medium">
                  Add to table
                </p>
              </div>
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
            <div className="h-full max-h-[20rem] mt-5 overflow-y-scroll scrollbar-hide">
              <table className="w-full h-full    bg-white  rounded-2xl col-start-1 col-end-3 ">
                <tr className="border-b-[1px] sticky top-0 bg-white z-[2] w-full">
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 pl-8 w-[85%]">
                    Tube
                  </td>
                  <td className="text-sm text-[#98A2B3]  font-Poppins-Regular py-1 w-[15%]">
                    Action
                  </td>
                </tr>

                {TupeSelector
                  ? TupeSelector.map((tupe) => (
                      <tr className="border-b-[1px] w-full">
                        <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 pl-8 ">
                          {tupe.tupe}
                        </td>
                        <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 ">
                          <div className="flex space-x-2 ">
                            <TiEdit
                              id={tupe.id}
                              className="text-2xl  opacity-50 cursor-pointer"
                              onClick={() => Edit(tupe.id)}
                            />
                            <IoTrashOutline
                              id={tupe.id}
                              className="text-2xl text-[#F04438] cursor-pointer"
                              onClick={() => remove(tupe.id)}
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

export default SystemDashBoard;
