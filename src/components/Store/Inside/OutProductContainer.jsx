/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import { outProduct } from "../../../api/StoreData";
import { getProducts } from "../../../api/StoreData";
import axios from "axios";
import { set } from "date-fns";
import swal from "sweetalert";

export default function OutProductContainer({
  SetDataForFilterOutside,
  SetDataBeforeFilterOutside,
  pageInside,
  pageOutside,
  setProducts,
  selectedProductId,
  setOutProducts,
  open,
  setOpen,
}) {
  const [ready, setReady] = useState(true);
  const cancelButtonRef = useRef(null);
  const getOutProducts = async (page) => {
    await axios
      .get(`lab-scope/store-outside?page=${page}`)
      .then((res) => {
        setOutProducts(res.data);
        SetDataForFilterOutside(res.data);
        SetDataBeforeFilterOutside(res.data);
      })
      .catch((err) => {
        // setError(err.response.data);
      });
  };
  function close() {
    setError("");
    setQuantity([]);
    setOpen(false);
  }

  const [quantity, setQuantity] = useState([]);
  const [error, setError] = useState("");
  const submit = async () => {
    setReady(false);
    const data = {};
    data["quantity"] = quantity;

    await axios
      .post(`lab-scope/quantity-update/${selectedProductId}`, data)
      .then((response) => {
        // set(response.data);
        setReady(true);
        swal("Great!", `Well Done`, "success");
        setQuantity([]);

        getProducts(setProducts, pageInside);
        getOutProducts(pageOutside);
        setError("");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setReady(true);

        setError(err.response.data);
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
                      <p className="  justify-center font-Poppins-SemiBold flex flex-grow text-2xl ml-10">
                        {t("Out Product")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className="flex space-x-5">
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="Quantity"
                              placeholder={t("Quantity")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                          </div>
                          <span className="text-sm text-red-600">{error}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-5">
                    <button
                      onClick={() => submit()}
                      type="button"
                      disabled={!ready}
                      className={`${
                        ready ? "bg-[#B7C835]" : "bg-gray-600"
                      } flex flex-grow py-2  justify-center rounded-xl text-white`}
                    >
                      {t("Save")}
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
