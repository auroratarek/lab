/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllDBLab,
  addToDBLab,
  selectDBLabs,
} from "../../../GlobalData/SystemDashBoard/LabSDBSlice";

export default function AddLabSystemDB({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [Image, SetImage] = useState();
  const [ImageStore, SetImageStore] = useState();
  const LabSelector = useSelector(selectDBLabs);
  const [error, setError] = useState({
    address: "",
    email: "",
    lab_name: "",
    name: "",
    password: "",
    phone: "",
    src: "",
  });

  const getLaps = async (page) => {
    await axios.get(`admin-scope/accounts?page=${page}`).then((response) => {
      console.log(response);
      dispatch(addAllDBLab(response.data));
    });
  };
  const dispatch = useDispatch();
  console.log(LabSelector);
  function close() {
    setOpen(false);
  }
  const AddLab = async () => {
    let formData = new FormData();
    formData.append("email", document.getElementById("email").value);
    formData.append("name", document.getElementById("OwnerName").value);
    formData.append("phone", document.getElementById("PhoneNumber").value);
    formData.append("lab_name", document.getElementById("LabName").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("address", document.getElementById("Address").value);
    formData.append("src", ImageStore);

    await axios
      .post(`/admin-scope/account`, formData)
      .then((response) => {
        setOpen(false);

        let Data = {
          id: LabSelector.data.length + 1,
          name: document.getElementById("OwnerName").value,
          lab_name: document.getElementById("LabName").value,
          phone: document.getElementById("PhoneNumber").value,
          email: document.getElementById("email").value,
          address: document.getElementById("Address").value,
          src: Image,
        };
        dispatch(getLaps(1));

        setError({
          address: "",
          email: "",
          lab_name: "",
          name: "",
          password: "",
          phone: "",
          src: "",
        });
      })
      .catch((err) => {
        setError({
          address: err.response.data.errors.address[0],
          email: err.response.data.errors.email[0],
          lab_name: err.response.data.errors.lab_name[0],
          name: err.response.data.errors.name[0],
          password: err.response.data.errors.password[0],
          phone: err.response.data.errors.phone[0],
          src: err.response.data.errors.src[0],
        });
      });
  };
  const filebrowser = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };
  const getImage = (e) => {
    let type = e.target.files[0].type;
    let files = e.target.files[0];
    let ext = type.substring(type.indexOf("/") + 1);
    if (type.substring(0, type.indexOf("/")) === "image") {
      SetImage(window.URL.createObjectURL(new Blob(e.target.files)));
      SetImageStore(e.target.files[0]);
      //   if (!document.getElementById('ImageMessage').classList.contains("hidden")) {
      //     document.getElementById('ImageMessage').classList.add("hidden");
      //   }

      // } else {
      //   document.getElementById('ImageMessage').classList.remove("hidden");
      //   document.getElementById('ImageMessage').textContent = "الرجاء الانتباه على اختيار صورة فقط";
      //   SetImage(null);
    }
  };
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          initialFocus={cancelButtonRef}
          onClose={() => close()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto ">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative px-10 pb-8 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:max-w-xl sm:w-full ">
                  <div className="bg-white ">
                    <div className="w-full flex  h-full items-center mt-5">
                      <p className="  justify-center font-Poppins-SemiBold flex flex-grow text-lg ml-10">
                        Add Lab
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className={` space-y-2 flex-col `}>
                        <div>
                          <div
                            className={` ${
                              Image == null
                                ? "w-fit border-dashed border-2"
                                : "w-40 h-40"
                            }  flex items-center flex-col  m-auto rounded-full  py-12 px-5 bg-cover bg-no-repeat bg-center`}
                            style={{ backgroundImage: `url(${Image})` }}
                          >
                            <input
                              id="fileInput"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => getImage(e)}
                            />
                            <CiImageOn
                              className={`text-2xl mb-2 ${
                                Image == null ? "block" : "hidden"
                              }`}
                            />
                            <h1
                              className={`flex flex-col items-center text-[#101828] font-Poppins-Regular text-xs ${
                                Image == null ? "flex" : "hidden"
                              }`}
                            >
                              Drop your here, or{" "}
                              <span
                                className="text-[#B7C835] mt-1 underline underline-[#B7C835] cursor-pointer"
                                onClick={(e) => filebrowser(e)}
                              >
                                select click to browse
                              </span>
                            </h1>
                          </div>
                          <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                            {error.src}
                          </span>
                        </div>
                        <div>
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              id="LabName"
                              placeholder="Lab name"
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                          </div>
                          <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                            {error.lab_name}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              id="OwnerName"
                              placeholder="Owner name"
                              type="tel"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                            {error.name}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              id="email"
                              placeholder="email"
                              type="email"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                            {error.email}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              id="password"
                              placeholder="password"
                              type="password"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                            {error.password}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              id="PhoneNumber"
                              placeholder="Phone number"
                              type="tel"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                            {error.phone}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              id="Address"
                              placeholder="Address"
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
                            {error.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                    <button
                      type="button"
                      className="flex flex-grow font-medium text-sm py-3 bg-[#B7C835] justify-center rounded-xl text-white"
                      onClick={() => AddLab()}
                    >
                      Add Lab
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
