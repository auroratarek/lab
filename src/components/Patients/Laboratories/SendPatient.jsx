/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function SendPatient({ id, open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [Method, SetMethod] = useState("SWS");
  const [getAllAcount, setGetAllAcount] = useState("");
  const [getAllAnalysis, setGetAllAnalysis] = useState("");
  const [type, setType] = useState("recived_id");

  const [formData, setFormData] = useState({
    // patient_id: id,
    shipping_cost: "",
    total_amount: "",
  });
  const sendWithTheSystem = (e) => {
    if (e.target.checked) {
      if (type == "recived_id") setFormData();
      // setFormData({
      //   ...formData,
      //   send_id: type,
      //   recived_id: -1,
      //   patient_id: id,
      //   patieon_analys_id: patientId,
      // });
      else {
        setFormData();
        // setFormData({
        //   ...formData,
        //   send_id: type,
        //   lab_id: -1,
        //   patient_id: id,
        //   patieon_analys_id: patientId,
        // });
      }
      setType("recived_id");
      getAccounts();
      document
        .getElementById("radio-1-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      document.getElementById("radio-1-text").classList.add("text-[#B7C835]");

      document
        .getElementById("radio-2-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      SetMethod("SWS");
    }
  };

  const sendOutTheSystem = (e) => {
    if (e.target.checked) {
      setType("lab_id");
      axios
        .get(`lab-scope/labs`)
        .then((res) => {
          // console.log(res.data, "hi");
          setGetAllAcount(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      document
        .getElementById("radio-1-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      document
        .getElementById("radio-2-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      document.getElementById("radio-2-text").classList.add("text-[#B7C835]");
      SetMethod("SOS");
    }
  };

  function close() {
    setFormData();
    setOpen(false);
  }
  const getAccounts = () => {
    axios
      .get(`lab-scope/allAccounts`)
      .then((res) => {
        // console.log(res.data, "hi");

        setGetAllAcount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAnalysis = (id) => {
    axios
      .get(`lab-scope/patientAnalysis?id=${id}`)
      .then((res) => {
        // console.log(res.data, "hi");
        setGetAllAnalysis(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // SetMethod("SWS");
    getAccounts();
    getAnalysis(id);
  }, [id]);
  const shippingCost = (e) => {
    setFormData({
      ...formData,
      patient_id: id,
      // patieon_analys_id: patientId,
      shipping_cost: parseInt(e.target.value),
    });
  };
  const recivedID = (e) => {
    // setFormData({
    //   ...formData,
    //   recived_id: parseInt(e.target.value),
    // });

    if (type == "recived_id")
      setFormData({
        ...formData,
        patient_id: id,
        // patieon_analys_id: patientId,
        send_id: type,
        recived_id: parseInt(e.target.value),
      });
    else {
      setFormData({
        ...formData,
        patient_id: id,
        // patieon_analys_id: patientId,
        send_id: type,
        lab_id: parseInt(e.target.value),
      });
    }
  };
  const analyzID = (e) => {
    // setFormData({
    //   ...formData,
    //   recived_id: parseInt(e.target.value),
    // });

    if (type == "recived_id")
      setFormData({
        ...formData,
        patient_id: id,
        patieon_analys_id: parseInt(e.target.value),
        send_id: type,
      });
    else {
      setFormData({
        ...formData,
        patient_id: id,
        patieon_analys_id: parseInt(e.target.value),
        send_id: type,
      });
    }
  };
  const totalAmount = (e) => {
    setFormData({
      ...formData,
      patient_id: id,
      // patieon_analys_id: patientId,
      total_amount: parseInt(e.target.value),
    });
  };
  const handleSendData = (e) => {
    axios
      .post(`lab-scope/send-petient`, formData)
      .then((res) => {
        close();
      })
      .catch((err) => {
        console.log(err);
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
                        Send patient
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className="flex space-x-5">
                        <div class="flex border-[1px] p-2 rounded-xl w-full py-3  justify-center  ">
                          <div class="items-center flex ml-2 text-sm space-x-3">
                            <label
                              id="radio-1-text"
                              for="radio-1"
                              class={`font-Poppins-Medium text-xs ${
                                Method === "SWS"
                                  ? "text-[#B7C835]"
                                  : "text-[#101828]"
                              }  `}
                            >
                              <div>Send with system</div>
                            </label>

                            <div class="flex items-center h-5">
                              <input
                                checked={`${Method === "SWS" ? true : ""}`}
                                id="radio-1"
                                name="radio"
                                type="radio"
                                value="Lorem1"
                                class="w-[16.2px] h-[16.2px] outline-none appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835] "
                                onChange={(e) => sendWithTheSystem(e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="flex border-[1px] p-2 rounded-xl w-full py-3  justify-center ">
                          <div class="items-center flex ml-2 text-sm space-x-3">
                            <label
                              id="radio-2-text"
                              for="radio-2"
                              class={`font-Poppins-Medium text-xs ${
                                Method === "SOS"
                                  ? "text-[#B7C835]"
                                  : "text-[#101828]"
                              }  `}
                            >
                              <div>Send out system</div>
                            </label>
                            <div class="flex items-center h-5">
                              <input
                                checked={`${Method === "SOS" ? true : ""}`}
                                id="radio-2"
                                name="radio"
                                type="radio"
                                value="Lorem1"
                                class="w-[16.2px] h-[16.2px] outline-none appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835] "
                                onChange={(e) => sendOutTheSystem(e)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`space-y-5 flex-col `}>
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            onChange={shippingCost}
                            name="ShippingCost"
                            placeholder="Shipping cost"
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                        </div>
                        <div className="w-full pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5">
                          <select
                            onChange={recivedID}
                            name="ExternalLaboratory"
                            className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-4 cursor-pointer"
                          >
                            <option
                              value=""
                              selected
                              disabled
                              hidden
                              className=""
                            >
                              External laboratory
                            </option>
                            {getAllAcount &&
                              getAllAcount.map((item) => (
                                <option value={item.id} className="">
                                  {item.name || item.lab_name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="w-full pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5">
                          <select
                            onChange={analyzID}
                            name="AnalysisType"
                            className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-4 cursor-pointer"
                          >
                            <option
                              value=""
                              selected
                              disabled
                              hidden
                              className=""
                            >
                              Analysis type
                            </option>
                            {getAllAnalysis &&
                              getAllAnalysis.map((item) => (
                                <option value={item.id} className="">
                                  {/* section_name */}

                                  {item.section_name || item.analys_name}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            onChange={totalAmount}
                            name="TotalAmountRequired"
                            placeholder="Total amount required"
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                    <button
                      onClick={handleSendData}
                      type="button"
                      className="flex flex-grow py-3 text-sm font-Poppins-Medium  bg-[#B7C835] justify-center rounded-xl text-white"
                    >
                      Save
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
