/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectDBLabs } from "../../../GlobalData/SystemDashBoard/LabSDBSlice";

export default function ShowLabSystemDB({ open, setOpen, id }) {
  const cancelButtonRef = useRef(null);
  const LabSelector = useSelector(selectDBLabs);
  const [selected, Setselected] = useState({});
  useEffect(() => {
    Setselected(
      LabSelector.data
        ? LabSelector.data[
            LabSelector.data.findIndex((tupeItem) => tupeItem.id === id)
          ]
        : ""
    );
  }, [id]);
  function close() {
    setOpen(false);
  }

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
                        Show Lab
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className={` space-y-5 flex-col `}>
                        <img
                          src={`https://aurora-team.com/labs-obada/${selected?.src}`}
                          className="w-40 h-40 rounded-full mx-auto"
                        />
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="LabName"
                            placeholder={selected?.lab_name}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                        </div>
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="OwnerName"
                            placeholder={selected?.name}
                            type="tel"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="email"
                            placeholder={selected?.email}
                            type="email"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="PhoneNumber"
                            placeholder={selected?.phone}
                            type="tel"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>

                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="Address"
                            placeholder={selected?.address}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>
                      </div>
                    </div>
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
