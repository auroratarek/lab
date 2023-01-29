/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LabNameContainer from "./AddLab/LabNameContainer";
import { t } from "i18next";
import axios from "axios";
import { addAllLab } from "../../GlobalData/LabSlice";
import { useDispatch } from "react-redux";
import { es } from "date-fns/locale";

export default function AddLab({ SetDataBeforeFilter, page, open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [Method, SetMethod] = useState("WithSystem");
  const [formData, setFormData] = useState({
    lab_name: "",
    phone: "",
    address: "",
  });

  const [searchData, setSearchData] = useState({
    lab_name: "",
    phone: "",
    address: "",
  });
  const [ready, setReady] = useState(true);

  const [code, setCode] = useState("");
  const [NameError, setNameError] = useState("a");
  const [AddressError, setAddressError] = useState("a");
  const [PhoneError, setPhoneError] = useState("a");
  const [CodeError, setCodeError] = useState("a");
  const [notFound, setnotFound] = useState("");
  const WithSystem = (e) => {
    SetMethod("WithSystem");
  };

  const WithoutSystem = (e) => {
    SetMethod("WithOutSystem");
  };

  function close() {
    setnotFound("");
    setFormData({
      lab_name: "",
      phone: "",
      address: "",
    });
    setSearchData({
      lab_name: "",
      phone: "",
      address: "",
    });
    setCode("");
    setNameError("a");
    setAddressError("a");
    setPhoneError("a");
    setCodeError("a");
    setOpen(false);
  }

  const handleChangeName = (e) => {
    setFormData({
      ...formData,
      lab_name: e.target.value,
    });
  };

  const handleChangeAddress = (e) => {
    setFormData({
      ...formData,
      address: e.target.value,
    });
  };

  const handleChangePhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        phone: e.target.value,
      });
    }
  };
  const dispatch = useDispatch();
  const getLabs = async (page) => {
    await axios.get(`lab-scope/labs?${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllLab(response.data));
      SetDataBeforeFilter(response.data);
    });
  };

  const Save = async () => {
    if (Method === "WithOutSystem") {
      setReady(false);
      await axios
        .post("lab-scope/lab-store", {
          lab_name: formData.lab_name,
          phone: formData.phone,
          address: formData.address,
        })
        .then((response) => {
          setFormData({
            lab_name: "",
            phone: "",
            address: "",
          });
          setReady(true);

          getLabs(page);
          close();
          setNameError("a");
          setAddressError("a");
          setPhoneError("a");
        })
        .catch((err) => {
          console.log(err);
          setReady(true);
          if (err.response.data.errors.lab_name) {
            setNameError(err.response.data.errors.lab_name[0]);
          } else {
            setNameError("a");
          }
          if (err.response.data.errors.address) {
            setAddressError(err.response.data.errors.address[0]);
          } else {
            setAddressError("a");
          }
          if (err.response.data.errors.phone) {
            setPhoneError(err.response.data.errors.phone[0]);
          } else {
            setPhoneError("a");
          }
          // setError(err.response.data.errors.address);
        });
    } else if (Method === "WithSystem") {
      setReady(false);
      await axios
        .post("lab-scope/lab-store", {
          lab_name: searchData.lab_name,
          phone: searchData.phone,
          address: searchData.address,
        })
        .then((response) => {
          setSearchData({
            lab_name: "",
            phone: "",
            address: "",
          });
          setReady(true);

          setCode("");
          setCodeError("a");
          getLabs(page);
          close();
        })
        .catch((err) => {
          console.log(err);
          setReady(true);

          setCodeError(err.response.data.errors.lab_name[0]);
          // setError(err.response.data.errors.address);
        });
    }
  };

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };
  const GetLab = async () => {
    await axios
      .post("lab-scope/lab-search", {
        code: code,
      })
      .then((response) => {
        console.log(response.data);
        console.log(Object.keys(response.data).length);
        if (Object.keys(response.data).length === 0) {
          setnotFound("Not Found");
        }
        if (Object.keys(response.data).length > 0) {
          setnotFound("");
        }
        setSearchData({
          lab_name: response.data.lab_name,
          phone: response.data.phone,
          address: response.data.address,
        });
      })
      .catch((err) => {
        console.log(err);

        // setError(err.response.data.errors.address);
      });
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
                        {t("Add Lab")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className="flex space-x-5">
                        <div
                          className={`${
                            Method === "WithSystem"
                              ? "bg-[#0D2135] "
                              : "bg-transparent"
                          } flex border-[1px] p-2 rounded-xl w-full py-3  justify-center cursor-pointer `}
                          onClick={() => WithSystem()}
                        >
                          <p
                            className={`${
                              Method === "WithSystem"
                                ? "text-white "
                                : "text-[#98A2B3]"
                            }  text-sm font-Poppins-Medium  `}
                          >
                            {t("With system")}
                          </p>
                        </div>

                        <div
                          className={`${
                            Method === "WithOutSystem"
                              ? "bg-[#0D2135] "
                              : "bg-transparent"
                          } flex border-[1px] p-2 rounded-xl w-full py-3  justify-center cursor-pointer `}
                          onClick={() => WithoutSystem()}
                        >
                          <p
                            className={`${
                              Method === "WithOutSystem"
                                ? "text-white "
                                : "text-[#98A2B3]"
                            }  text-sm font-Poppins-Medium  `}
                          >
                            {t("Without system")}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`${
                          Method === "WithSystem" ? "block" : "hidden"
                        } space-y-5 flex-col `}
                      >
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex justify-between  items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="Code"
                              onChange={handleChangeCode}
                              value={code}
                              placeholder={t("Code")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <BsSearch
                              onClick={GetLab}
                              className="text-xl cursor-pointer"
                            />
                          </div>

                          <span
                            className={`${
                              notFound === "" ? "hidden" : ""
                            } text-sm text-red-600`}
                          >
                            {notFound}
                          </span>
                        </div>
                        <LabNameContainer
                          lab_name={searchData.lab_name}
                          phone={searchData.phone}
                          address={searchData.address}
                        />
                        <span
                          className={`${
                            CodeError === "a" ? "invisible" : ""
                          } text-sm text-red-600`}
                        >
                          {CodeError}
                        </span>
                      </div>

                      <div
                        className={`${
                          Method === "WithOutSystem" ? "block" : "hidden"
                        } space-y-2 flex-col `}
                      >
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="LabName"
                              value={formData.lab_name}
                              onChange={handleChangeName}
                              placeholder={t("Lab name")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span
                            className={`${
                              NameError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {NameError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="Address"
                              value={formData.address}
                              onChange={handleChangeAddress}
                              placeholder={t("Address")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span
                            className={`${
                              AddressError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {AddressError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="PhoneNumber"
                              value={formData.phone}
                              onChange={handleChangePhone}
                              placeholder={t("Phone number")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                            />
                          </div>
                          <span
                            className={`${
                              PhoneError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {PhoneError}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                    <button
                      onClick={Save}
                      type="button"
                      disabled={!ready}
                      className={`${
                        ready ? "bg-[#B7C835]" : "bg-gray-600"
                      } flex flex-grow font-medium text-sm py-3  justify-center rounded-xl text-white`}
                    >
                      {t("Add Lab")}
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
